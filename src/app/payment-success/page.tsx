"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState("loading");
  const [customerEmail, setCustomerEmail] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    async function fetchSessionStatus() {
      const response = await fetch("/api/check-payment-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      const { session, error } = await response.json();

      if (error) {
        setStatus("failed");
        console.error(error);
        return;
      }

      setStatus(session.status);
      setCustomerEmail(session.customer_email);
    }
    if (sessionId) {
      fetchSessionStatus();
    }
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Failed to process subscription. Please try again.</div>
      </div>
    );
  }

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <div className="flex flex-col items-center min-h-screen pt-28">
        <h1>Subscription Successful!</h1>
        <p>
          Thank you for your subscription. A confirmation email has been sent to{" "}
          {customerEmail}.
        </p>
      </div>
    </React.Suspense>
  );
}
