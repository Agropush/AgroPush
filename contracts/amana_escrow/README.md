# amana_escrow

## Test and helper notes

- Contract tests now use `register_stellar_asset_contract_v2` throughout the escrow crate.
- Lifecycle coverage includes:
  - valid state progression across created, funded, delivered, disputed, completed, and cancelled paths
  - rejected invalid transitions
  - balance-conservation checks across cancellation, delivery release, and dispute resolution

## Running tests

```bash
cargo test
```
