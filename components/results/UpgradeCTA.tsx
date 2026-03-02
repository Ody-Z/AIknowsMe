"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp, Loader2, CheckCircle2 } from "lucide-react";

interface UpgradeCTAProps {
  brandName: string;
  scanId: string;
}

export function UpgradeCTA({ brandName, scanId }: UpgradeCTAProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/mlgwvyer", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      setStatus("submitted");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "submitted") {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
          <h3 className="font-semibold text-lg">You&apos;re on the list!</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            We&apos;ll notify you when weekly tracking is available for{" "}
            <span className="font-medium text-foreground">{brandName}</span>.
          </p>
        </CardContent>
      </Card>
    );
  }

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
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <input type="hidden" name="_subject" value="AIknowsMe Waitlist Signup" />
          <input type="hidden" name="brand_name" value={brandName} />
          <input type="hidden" name="scan_id" value={scanId} />
          <input type="hidden" name="form_type" value="waitlist" />

          <div className="flex-1">
            <label htmlFor="waitlist-email" className="sr-only">
              Email
            </label>
            <Input
              id="waitlist-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <Button type="submit" className="shrink-0" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>

        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
