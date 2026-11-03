import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-kernel-ivory border border-kernel-border flex items-center justify-center mx-auto text-kernel-gold shadow-sm">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-kernel-gold">
            404 Error • Page Uncharted
          </span>
          <h1 className="text-3xl font-bold text-kernel-charcoal">
            Lost in the Territory
          </h1>
          <p className="text-sm text-kernel-muted leading-relaxed">
            The page or article you are looking for has been relocated or does not exist. Let's return to known waters.
          </p>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <Link href="/" className="btn-gold text-xs px-5 py-2.5">
            Return Home
          </Link>
          <Link href="/explore" className="btn-gold-outline text-xs px-5 py-2.5 inline-flex items-center gap-1.5">
            <span>Explore Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
