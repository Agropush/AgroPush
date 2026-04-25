import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-hero text-text-primary flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b border-border-default px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold-muted border border-gold/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gold tracking-tight">
            Amana
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/trades"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Trades
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-xl bg-gold-muted border border-gold/30 flex items-center justify-center shadow-glow-gold">
                <svg
                  className="w-10 h-10 text-gold"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold text-text-primary tracking-tight">
                Amana
              </h1>
              <p className="text-xl md:text-2xl text-gold font-semibold">
                Secure Agricultural Escrow on Blockchain
              </p>
            </div>

            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Trade with confidence. Amana enables secure peer-to-peer
              agricultural commodity settlement with blockchain-backed escrow,
              real-time evidence submission, and mediator-led dispute
              resolution.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-bg-card border border-border-default rounded-xl p-6 hover:border-border-hover transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gold-muted text-gold flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 text-lg">
                Real-Time Settlement
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Execute and settle trades instantly with blockchain verification
                and transparent transaction tracking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg-card border border-border-default rounded-xl p-6 hover:border-border-hover transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-muted text-emerald flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 text-lg">
                Verified Evidence
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Submit and verify evidence directly on-chain for complete
                transparency and immutable record-keeping.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg-card border border-border-default rounded-xl p-6 hover:border-border-hover transition-colors">
              <div className="w-12 h-12 rounded-lg bg-teal/15 text-teal flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary mb-2 text-lg">
                Fair Dispute Resolution
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Trusted mediators ensure fair resolution of any trade disputes
                with transparent evidence review.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-gold-cta text-text-inverse font-semibold rounded-lg hover:shadow-glow-gold transition-all duration-200 text-center"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/trades"
              className="px-8 py-4 border border-border-default text-text-primary font-semibold rounded-lg hover:bg-bg-card hover:border-border-hover transition-colors text-center"
            >
              View Trades
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-border-default">
            <p className="text-sm text-text-muted mb-6">
              Built on proven technology
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Stellar Blockchain</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Soroban Smart Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-emerald"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>IPFS Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-default px-6 py-6 text-center text-sm text-text-muted">
        <p>© 2026 Amana. Secure agricultural escrow on blockchain.</p>
      </footer>
    </div>
  );
}
