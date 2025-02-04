"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MemberAndChildren } from "@/lib/zod-types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import tz from "dayjs/";
import { useForm } from "react-hook-form";
import { z } from "zod";

dayjs.extend(tz);

interface Props {
  profileDetails: MemberAndChildren;
}

const statusOptions = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
} as const;

const formSchema = z.object({
  membershipStartDate: z.string().datetime(),
  membershipEndDate: z.string().datetime(),
  amount: z.number(),
  status: z.enum(Object.keys(statusOptions) as [string, ...string[]]),
  paymentDate: z.string().datetime(),
});

type FormSchema = z.infer<typeof formSchema>;

function MembershipSetting({ profileDetails }: Props) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      membershipStartDate:
        dayjs(profileDetails.membershipStartDate).format("MM-DD-YYYY") || "N/A",
      membershipEndDate: profileDetails.membershipEndDate || "N/A",
      amount: profileDetails.amount / 100,
      status:
        statusOptions[profileDetails.status as keyof typeof statusOptions] ||
        "N/A",
      paymentDate: profileDetails.paymentDate || "N/A",
    },
  });

  async function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <Card className="w-full h-full bg-transparent my-5">
      <CardHeader>
        <CardTitle>Membership Details</CardTitle>
        <CardDescription>Manage your membership details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-4 gap-4"
          >
            <FormField
              control={form.control}
              name="membershipStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membershipEndDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership End Date</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (in dollars)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Date</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
          <div className="flex justify-end">
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export { MembershipSetting };
