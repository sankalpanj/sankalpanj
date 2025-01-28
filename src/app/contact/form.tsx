"use client";
import { OverlayLoader } from "@/_components/overlay-loader";
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
  message: z.string(),
});

function ContactForm() {
  const { mutateAsync: addContact, isPending: isAddingContact } =
    trpc.addContact.useMutation();
  const formInstance = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addContact({
      payload: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        message: values.message ?? "",
        createdAt: new Date().toISOString(),
      },
    });
    formInstance.reset();
  }

  return (
    <div className="flex flex-col mx-auto max-w-lg h-auto gap-10 p-5 border rounded-md my-20 bg-white relative">
      <OverlayLoader loading={isAddingContact} message="Please wait..." />
      <h3 className="text-2xl mx-auto">
        Leave us a message {isAddingContact && "Please wait..."}
      </h3>
      <FormProvider {...formInstance}>
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
                  <Input placeholder="Enter first name" {...field} />
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
          </div>
          <FormField
            control={formInstance.control}
            name="message"
            render={({ field }) => (
              <RenderFormItem label="Message">
                <Textarea
                  placeholder="Your messsage"
                  {...field}
                  className="resize-none"
                />
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
