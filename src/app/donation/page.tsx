"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

const donationForm = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  address: z.string().min(10, { message: "Please enter a complete address" }),
  city: z
    .string()
    .min(3, { message: "City name must be at least 3 characters" }),
  zip: z.string().min(5, { message: "ZIP code must be at least 5 characters" }),
  country: z
    .string()
    .min(3, { message: "Country name must be at least 3 characters" }),
  amount: z.number().min(60, { message: "Minimum donation amount is $60" }),
  message: z.string().optional(),
});

type DonationForm = z.infer<typeof donationForm>;

export default function Home() {
  const [donationAmount, setDonationAmount] = useState(60);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);
  const {
    mutateAsync: generateOneTimeDonationSessionUrl,
    data: oneTimeDonationSessionUrl,
    isPending: isOneTimeDonationSessionUrlPending,
  } = trpc.generateOneTimeDonationSessionUrl.useMutation();

  async function onSubmit(data: DonationForm) {
    console.log(data);
  }

  function handleDonationAmount(amount: number) {
    setDonationAmount(amount);
    setShowCustomAmount(false);
  }

  function handleCustomAmount() {
    setDonationAmount(0);
    setShowCustomAmount(true);
  }

  async function handleDonate() {
    const { code, data } = await generateOneTimeDonationSessionUrl({
      amount: showCustomAmount ? customAmount : donationAmount,
    });
    if (code === "SUCCESS" && data) {
      window.location.href = data;
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center pt-28">
      <div className="flex flex-col h-full w-full md:w-3/5 lg:w-4/5">
        <div className="flex h-full w-full gap-10">
          <div className="flex flex-col w-3/5 h-auto gap-5">
            <h2 className="font-semibold text-4xl">
              Help us protect the planet, donate today
            </h2>
            <p className="text-xl">
              Your donation will support our mission to plant trees and create a
              greener future.
            </p>
            <Image
              src="/images/donationA.jpeg"
              alt="Donation"
              width={500}
              height={500}
              className="w-full object-contain rounded-md mt-5"
            />
          </div>
          <div className="flex flex-col grow h-auto gap-5">
            <h2 className="font-semibold text-3xl">Donation amount</h2>
            <div className="flex w-full h-auto gap-5">
              <div
                className={`flex w-auto h-auto border rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:text-white hover:shadow-sm ${
                  donationAmount === 60 ? "bg-teal-700 text-white" : ""
                }`}
                onClick={() => {
                  handleDonationAmount(60);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">$60</p>
                </div>
              </div>
              <div
                className={`flex w-auto h-auto border rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:text-white hover:shadow-sm ${
                  donationAmount === 80 ? "bg-teal-700 text-white" : ""
                }`}
                onClick={() => {
                  handleDonationAmount(80);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">$80</p>
                </div>
              </div>
              <div
                className={`flex w-auto h-auto border rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:text-white hover:shadow-sm ${
                  donationAmount === 100 ? "bg-teal-700 text-white" : ""
                }`}
                onClick={() => {
                  handleDonationAmount(100);
                }}
              >
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">$100</p>
                </div>
              </div>
              <div
                className={`flex w-auto h-auto border rounded-md p-2 cursor-pointer hover:bg-teal-700 hover:text-white hover:shadow-sm ${
                  showCustomAmount ? "bg-teal-700 text-white" : ""
                }`}
                onClick={() => handleCustomAmount()}
              >
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">Custom</p>
                </div>
              </div>
            </div>
            {showCustomAmount && (
              <Input
                placeholder={
                  customAmount === 0
                    ? "Enter amount (in USD)"
                    : customAmount.toString()
                }
                className="mt-5"
                value={customAmount === 0 ? "" : customAmount.toString()}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
              />
            )}
            <Button
              onClick={handleDonate}
              className="mt-5 w-full"
              variant="default"
              loading={isOneTimeDonationSessionUrlPending}
            >
              Donate
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full h-auto py-36 items-center">
          <h2 className="font-semibold text-3xl">Why donate to us?</h2>
          <div className="flex w-full grow gap-10 py-14">
            <div className="flex flex-col grow h-auto gap-5 justify-center">
              <h2 className="font-semibold text-2xl">Our mission</h2>
              <p className="text-xl">
                Our mission is to serve the community and protect our
                environment. We are a passionate group of individuals who
                believe in the power of collective action. Our initiatives are
                designed to promote biodiversity, reduce plastic usage, and
                create a better world for all.
              </p>
            </div>
            <Image
              src="/images/teamA.jpg"
              alt="Donation"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
