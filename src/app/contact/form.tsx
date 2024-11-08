"use client";
import { Button } from "@/_components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcwIcon } from "lucide-react";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

interface FormFieldProps {
  label: string;
  children: ReactNode;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Can't be more than 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .refine((val) => !val.startsWith("0"), {
      message: "Phone number cannot start with 0",
    }),
  message: z.string(),
});

function ContactForm() {
  const {
    mutateAsync: addContactDetails,
    isPending: isAddingDetails,
    isError: addDetilasError,
  } = trpc.addContactDetails.useMutation();
  const formInstance = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addContactDetails({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      message: values.message ?? "",
    });
    formInstance.reset();
  }

  return (
    <div className="absolute flex flex-col mx-auto max-w-lg bg-slate-200 h-auto gap-10 rounded-md p-5 shadow-md inset-x-0 transform translate-y-[-50%] top-1/2 backdrop-blur-lg border-opacity-50 border-[1px] border-white">
      <h2 className="mx-auto">Let us get back to you,</h2>
      <FormProvider {...formInstance} >
        <form
          onSubmit={formInstance.handleSubmit(onSubmit)}
          onReset={() => {
            formInstance.reset();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={formInstance.control}
              name="firstName"
              render={({ field }) => (
                <RenderFormItem label="First name">
                  <Input placeholder="Enter first name" {...field} className="border-none focus:ring-transparent"/>
                </RenderFormItem>
              )}
            />
            <FormField
              control={formInstance.control}
              name="lastName"
              render={({ field }) => (
                <RenderFormItem label="Last name">
                  <Input placeholder="Enter last name" {...field} />
                </RenderFormItem>
              )}
            />
            <FormField
              control={formInstance.control}
              name="email"
              render={({ field }) => (
                <RenderFormItem label="Email">
                  <Input placeholder="Enter email" {...field} />
                </RenderFormItem>
              )}
            />
            <FormField
              control={formInstance.control}
              name="phone"
              render={({ field }) => (
                <RenderFormItem label="Phone number">
                  <Input placeholder="Enter phone number" {...field} />
                </RenderFormItem>
              )}
            />
          </div>
          <FormField
            control={formInstance.control}
            name="message"
            render={({ field }) => (
              <RenderFormItem label="Message">
                <Textarea placeholder="Your messsage" {...field} />
              </RenderFormItem>
            )}
          />
          <div className="flex w-full justify-end gap-5">
            <Button type="submit" variant={"outline"} size={"sm"}>
              Submit
            </Button>
            <Button type="reset" variant={"outline"} size={"sm"}>
              <RefreshCcwIcon className="w-4 h-4" /> &nbsp; Reset
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function RenderFormItem({ label, children }: FormFieldProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}

export { ContactForm };
