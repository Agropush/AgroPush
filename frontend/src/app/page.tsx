import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl text-center space-y-12">
        {/* Logo and Brand */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-lg bg-gold-muted border border-gold/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gold tracking-tight">Amana</h1>
          <p className="text-xl text-text-secondary">
            Secure Agricultural Escrow on Blockchain
          </p>
        </div>

        {/* Value Proposition */}
        <div className="space-y-6">
          <p className="text-lg text-text-secondary leading-relaxed">
            Trade with confidence. Amana enables secure peer-to-peer agricultural commodity settlement 
            with blockchain-backed escrow, real-time evidence submission, and mediator-led dispute resolution.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-bg-card border border-border-default rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-gold-muted text-gold flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Real-Time Settlement</h3>
              <p className="text-sm text-text-secondary">
                Execute and settle trades instantly with blockchain verification.
              </p>
            </div>

            <div className="bg-bg-card border border-border-default rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-gold-muted text-gold flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Verified Evidence</h3>
              <p className="text-sm text-text-secondary">
                Submit and verify evidence directly on-chain for complete transparency.
              </p>
            </div>

            <div className="bg-bg-card border border-border-default rounded-lg p-6">
              <div className="w-10 h-10 rounded-lg bg-gold-muted text-gold flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Dispute Resolution</h3>
              <p className="text-sm text-text-secondary">
                Trusted mediators ensure fair resolution of any trade disputes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gold text-text-inverse font-semibold rounded-lg hover:bg-gold-hover transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/trades"
            className="px-8 py-3 border border-border-default text-text-primary font-semibold rounded-lg hover:bg-bg-card transition-colors"
          >
            View Trades
          </Link>
        </div>

        {/* Footer Info */}
        <div className="pt-8 border-t border-border-default text-sm text-text-muted">
          <p>
            Built on Stellar • Powered by Soroban Smart Contracts • Secured by IPFS
          </p>
        </div>
      </div>
    </div>
  );
}