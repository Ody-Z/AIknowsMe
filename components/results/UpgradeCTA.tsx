import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

interface UpgradeCTAProps {
  brandName: string;
  scanId: string;
}

export function UpgradeCTA({ brandName }: UpgradeCTAProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="py-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">
              Track {brandName} weekly
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              See how your AI visibility changes over time with automated weekly
              scans, trend charts, and email alerts.
            </p>
          </div>
          <Link
            href="/#waitlist"
            className={buttonVariants({ className: "shrink-0" })}
          >
            Join Waitlist
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
