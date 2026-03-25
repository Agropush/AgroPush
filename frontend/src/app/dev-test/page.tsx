
import { Icon } from "@/components/ui/Icon";
import { StepIndicator } from "@/components/ui/StepIndicator";

const STEPS = [
  { label: "Create Trade", description: "3-step flow" },
  { label: "Verification", description: "4-step flow" },
  { label: "Withdraw", description: "Almost done" },
  { label: "Summary", description: "Final step" },
];

const SAMPLE_ICONS = [
  "shield",
  "check-circle",
  "alert-triangle",
  "truck",
  "file-text",
  "lock",
  "unlock",
  "user",
  "star",
  "arrow-right",
  "clock",
  "x-circle",
];

export default function IconDevPage() {
  return (
    <div className="min-h-screen bg-primary p-10">
      <h1 className="text-2xl font-bold text-gold mb-2">Icon Component</h1>
      <p className="text-text-secondary text-sm mb-8">
        Sizes: xs=12px · sm=16px · md=20px · lg=24px
      </p>

      {/* Size showcase */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold tracking-widest text-text-muted mb-4 uppercase">
          Sizes
        </h2>
        <div className="flex items-end gap-6">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Icon name="shield" size={s} className="text-gold" />
              <span className="text-xs text-text-muted">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Step Indicator showase */}
      <section className="mb-20">
        <h2 className="text-xs font-semibold tracking-widest text-text-muted mb-8 uppercase">
          Step Indicator (Multi-step flow)
        </h2>
        <div className="space-y-16">
          <div className="bg-bg-card p-8 rounded-xl border border-border-default">
            <p className="text-xs text-text-muted mb-6">Current Step: 0 (Initial)</p>
            <StepIndicator steps={STEPS} currentStep={0} />
          </div>

          <div className="bg-bg-card p-8 rounded-xl border border-border-default">
            <p className="text-xs text-text-muted mb-6">Current Step: 1 (In Progress)</p>
            <StepIndicator steps={STEPS} currentStep={1} />
          </div>

          <div className="bg-bg-card p-8 rounded-xl border border-border-default">
            <p className="text-xs text-text-muted mb-6">Completed Steps: [0, 1], Current Step: 2</p>
            <StepIndicator steps={STEPS} currentStep={2} completedSteps={[0, 1]} />
          </div>

          <div className="bg-bg-card p-8 rounded-xl border border-border-default">
            <p className="text-xs text-text-muted mb-6">All Completed (Step 3 reached)</p>
            <StepIndicator steps={STEPS} currentStep={3} completedSteps={[0, 1, 2]} />
          </div>
        </div>
      </section>

      {/* Color inheritance */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold tracking-widest text-text-muted mb-4 uppercase">
          Color via className
        </h2>
        <div className="flex items-center gap-5">
          <Icon name="check-circle" size="md" className="text-emerald" />
          <Icon name="alert-triangle" size="md" className="text-status-warning" />
          <Icon name="x-circle" size="md" className="text-status-danger" />
          <Icon name="lock" size="md" className="text-gold" />
          <Icon name="user" size="md" />
          {/* ↑ no className → falls back to text-text-secondary */}
        </div>
      </section>

      {/* Aria-label (accessible icon-only button) */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold tracking-widest text-text-muted mb-4 uppercase">
          Accessible icon-only button
        </h2>
        <button
          className="w-9 h-9 rounded-lg bg-elevated border border-border-default flex items-center justify-center hover:border-border-hover transition-all"
          aria-label="Open notifications"
        >
          <Icon name="bell" size="sm" aria-label="Open notifications" />
        </button>
      </section>

      {/* All sample icons */}
      <section>
        <h2 className="text-xs font-semibold tracking-widest text-text-muted mb-4 uppercase">
          Sample icons (sm)
        </h2>
        <div className="flex flex-wrap gap-4">
          {SAMPLE_ICONS.map((n) => (
            <div
              key={n}
              className="flex flex-col items-center gap-2 bg-card border border-border-default rounded-lg p-3"
            >
              <Icon name={n} size="sm" className="text-text-primary" />
              <span className="text-xs text-text-muted font-mono">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
