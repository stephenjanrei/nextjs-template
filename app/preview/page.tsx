import Link from "next/link";

export default function PreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 pb-24 pt-16 sm:pb-32 sm:pt-24">
      <section className="flex flex-col gap-6 text-center">
        <span className="typ-eyebrow">Marketing Typography</span>
        <h1 className="typ-display">Build momentum with confident copy.</h1>
        <p className="typ-lead">
          These primitives layer cleanly on top of Tailwind utilities so you can
          move fast without rewriting the same text styles for every marketing
          page.
        </p>
      </section>

      <section className="space-y-10">
        <div className="space-y-4">
          <span className="typ-eyebrow">Hero</span>
          <h1 className="typ-display text-left">
            Launch campaigns that feel like your brand.
          </h1>
          <p className="typ-lead text-left">
            Display pairs best with generous spacing, bold imagery, and clear
            calls to action.
          </p>
        </div>

        <div className="space-y-4">
          <span className="typ-eyebrow">Section Headings</span>
          <h2 className="typ-headline text-left">
            You&apos;re ready for the next release.
          </h2>
          <p className="typ-paragraph text-left">
            Headline keeps momentum going for section intros and summary cards.
            Pair it with succinct supporting copy or a two-column layout.
          </p>
        </div>

        <div className="space-y-3">
          <span className="typ-eyebrow">Supporting Copy</span>
          <h3 className="typ-subheadline text-left">
            Detail your value with clarity and rhythm.
          </h3>
          <p className="typ-paragraph text-left">
            Subheadline bridges the gap between a section header and paragraph
            copy, giving you room to emphasize the key takeaway.
          </p>
          <p className="typ-muted text-left">
            Use Muted for captions, fine print, and testimonial attributions.
          </p>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="typ-muted uppercase tracking-[0.2em]">
          Components ready for production
        </p>
        <Link
          href="/"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
        >
          Back to Home
        </Link>
      </footer>
    </main>
  );
}
