"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Failed to process subscription. Please try again.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-28">
      <h1>Subscription Successful!</h1>
      <p>
        Thank you for your subscription. A confirmation email has been sent to{" "}
        {customerEmail}.
      </p>
    </div>
  );
}
