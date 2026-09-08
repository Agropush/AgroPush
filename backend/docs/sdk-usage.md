# AgroPush SDK Usage Guide

This guide shows how to build a typed TypeScript client wrapper for the AgroPush
API that can be reused across frontend, mobile, and backend projects.

## Installation

The AgroPush API requires no SDK — use standard `fetch` or any HTTP client. The
following examples use `axios` for convenience, but you can substitute `fetch`
directly.

## Typed API Client

### Base Client

```typescript
// agropush-client.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface AgroPushClientConfig {
  baseUrl: string;
  getToken: () => string | null;
}

export function createAgroPushClient(config: AgroPushClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseUrl,
    timeout: 15_000,
  });

  client.interceptors.request.use((req) => {
    const token = config.getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  client.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] ?? 60;
        console.warn(`Rate limited — retry after ${retryAfter}s`);
      }
      return Promise.reject(error);
    },
  );

  return client;
}
```

### Types

```typescript
// agropush-types.ts
export type TradeStatus =
  | 'PENDING_SIGNATURE'
  | 'PENDING_DEPOSIT'
  | 'FUNDED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export interface Trade {
  id: string;
  buyerAddress: string;
  sellerAddress: string;
  amountUsdc: string;
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
  buyerLossBps?: number;
  sellerLossBps?: number;
  description?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  correlationId: string;
}
```

### Trade Operations

```typescript
// agropush-trades.ts
import type { AxiosInstance } from 'axios';
import type { Trade, PaginatedResponse, TradeStatus } from './agropush-types';

export class TradeService {
  constructor(private client: AxiosInstance) {}

  async create(params: {
    sellerAddress: string;
    amountUsdc: string;
    buyerLossBps?: number;
    sellerLossBps?: number;
    description?: string;
  }): Promise<Trade & { unsignedXdr: string }> {
    const { data } = await this.client.post('/trades', params);
    return data;
  }

  async list(filters?: {
    status?: TradeStatus;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<PaginatedResponse<Trade>> {
    const { data } = await this.client.get('/trades', { params: filters });
    return data;
  }

  async get(tradeId: string): Promise<Trade> {
    const { data } = await this.client.get(`/trades/${tradeId}`);
    return data;
  }

  async deposit(tradeId: string): Promise<{ transactionXdr: string; hash: string }> {
    const { data } = await this.client.post(`/trades/${tradeId}/deposit`);
    return data;
  }

  async confirmDelivery(
    tradeId: string,
    proof?: { proofOfDeliveryUrl?: string; notes?: string },
  ): Promise<Trade> {
    const { data } = await this.client.post(`/trades/${tradeId}/confirm`, proof);
    return data;
  }

  async releaseFunds(
    tradeId: string,
  ): Promise<{ transactionXdr: string; hash: string }> {
    const { data } = await this.client.post(`/trades/${tradeId}/release`);
    return data;
  }

  async dispute(
    tradeId: string,
    reason: string,
    category?: string,
  ): Promise<Trade> {
    const { data } = await this.client.post(`/trades/${tradeId}/dispute`, {
      reason,
      category,
    });
    return data;
  }

  async getAuditTrail(
    tradeId: string,
    filters?: { limit?: number; offset?: number },
  ) {
    const { data } = await this.client.get(`/trades/${tradeId}/history`, {
      params: filters,
    });
    return data;
  }
}
```

### Auth Service

```typescript
// agropush-auth.ts
import type { AxiosInstance } from 'axios';

export class AuthService {
  constructor(private client: AxiosInstance) {}

  async challenge(walletAddress: string): Promise<{ challenge: string }> {
    const { data } = await this.client.post('/auth/challenge', { walletAddress });
    return data;
  }

  async verify(
    walletAddress: string,
    signedChallenge: string,
  ): Promise<{ token: string }> {
    const { data } = await this.client.post('/auth/verify', {
      walletAddress,
      signedChallenge,
    });
    return data;
  }

  async logout(token: string): Promise<void> {
    await this.client.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
```

### Stellar Proxy Service

```typescript
// agropush-stellar.ts
import type { AxiosInstance } from 'axios';

export class StellarService {
  constructor(private client: AxiosInstance) {}

  async getFees(): Promise<{ feeStats: unknown }> {
    const { data } = await this.client.get('/stellar/fees');
    return data;
  }

  async getTxStatus(hash: string) {
    const { data } = await this.client.get(`/stellar/tx?hash=${hash}`);
    return data;
  }

  async getAccountBalance(address: string) {
    const { data } = await this.client.get(`/stellar/account?address=${address}`);
    return data;
  }
}
```

### Putting It All Together

```typescript
// index.ts
import { createAgroPushClient } from './agropush-client';
import { TradeService } from './agropush-trades';
import { AuthService } from './agropush-auth';
import { StellarService } from './agropush-stellar';

export function createAgroPushSDK(config: { baseUrl: string; getToken: () => string | null }) {
  const client = createAgroPushClient(config);

  return {
    trades: new TradeService(client),
    auth: new AuthService(client),
    stellar: new StellarService(client),
  };
}

// Usage
const agropush = createAgroPushSDK({
  baseUrl: 'https://api.agropush.com',
  getToken: () => localStorage.getItem('agropush_jwt'),
});

// Authenticate
const { challenge } = await agropush.auth.challenge('G...');
// (sign challenge with Stellar wallet, then:)
const { token } = await agropush.auth.verify('G...', signedChallenge);

// Create a trade
const trade = await agropush.trades.create({
  sellerAddress: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  amountUsdc: '1000.50',
  buyerLossBps: 5000,
  sellerLossBps: 5000,
  description: '50kg rice bags',
});
console.log('Trade created:', trade.id);

// List funded trades
const { data: fundedTrades } = await agropush.trades.list({
  status: 'FUNDED',
  page: 1,
  limit: 20,
});

// Get Stellar fees
const { feeStats } = await agropush.stellar.getFees();
```

## React Native / Expo Usage

```tsx
import { createAgroPushSDK } from './agropush-sdk';
import * as SecureStore from 'expo-secure-store';

const agropush = createAgroPushSDK({
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000',
  getToken: () => {
    // Retrieve from SecureStore synchronously in effect
    return null; // Override at call site with actual token
  },
});

async function TradeListScreen() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const token = await SecureStore.getItemAsync('agropush_jwt');
    if (token) {
      const client = createAgroPushClient({ baseUrl, getToken: () => token });
      const { data } = await new TradeService(client).list();
      setTrades(data);
    }
  }, []);

  return <FlatList data={trades} renderItem={/* ... */} />;
}
```

## Node.js / Backend Usage

```typescript
import { createAgroPushSDK } from './agropush-sdk';

const agropush = createAgroPushSDK({
  baseUrl: process.env.AGROPUSH_API_URL ?? 'http://localhost:4000',
  getToken: () => process.env.AGROPUSH_API_TOKEN ?? null,
});

// Use in a worker or cron job
async function dailyReconciliation() {
  const { data } = await agropush.trades.list({ status: 'COMPLETED', limit: 100 });
  console.log(`Reconciled ${data.length} completed trades`);
}
```
