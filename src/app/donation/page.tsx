"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  const form = useForm<DonationForm>({
    resolver: zodResolver(donationForm),
    defaultValues: {
      amount: 60,
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      message: "",
    },
  });

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

  const createSubscription: PayPalButtonsComponentProps["createSubscription"] =
    (data, actions) => {
      return actions.subscription.create({
        plan_id: "P-0NR55682A35058432M6JFIHA",
      });
    };

  async function onApprove(data: any, actions: any): Promise<void> {
    console.log(data);
    // Perform any asynchronous operations here
    // For example, you might want to call an API or update the UI
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        vault: true,
        intent: "subscription",
      }}
    >
      <div className="flex flex-col w-full min-h-screen items-center pt-28">
        <div className="flex flex-col h-full w-full md:w-3/5 lg:w-4/5">
          <div className="flex h-full w-full gap-10">
            <div className="flex flex-col w-3/5 h-auto gap-5">
              <h2 className="font-semibold text-4xl">
                Help us protect the planet, donate today
              </h2>
              <p className="text-xl">
                Your donation will support our mission to plant trees and create
                a greener future.
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
                      ? "Enter amount"
                      : customAmount.toString()
                  }
                  className="mt-5"
                  value={customAmount === 0 ? "" : customAmount.toString()}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                />
              )}
              {/* <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col w-full h-auto gap-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="resize-none" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Donate</Button>
                </form>
              </Form> */}
              <PayPalButtons
                className="z-10 w-full m-0 mt-4"
                style={{
                  layout: "horizontal",
                  color: "blue",
                  label: "pay",
                  tagline: false,
                }}
                message={{
                  amount: customAmount || donationAmount,
                  align: "center",
                  color: "black",
                  position: "top",
                }}
                createSubscription={createSubscription}
                onApprove={onApprove}
              />
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
    </PayPalScriptProvider>
  );
}
