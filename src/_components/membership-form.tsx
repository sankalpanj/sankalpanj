"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc/client";
import { Children } from "@/lib/zod-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { OverlayLoader } from "./overlay-loader";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

interface FormItemWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  children: React.ReactNode;
}

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  spouseName: z.string().optional().nullable(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().regex(/^\d{4,6}$/, "Invalid ZIP code format"),
  telephoneNo: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Invalid telephone number"),
  spouseTelephoneNo: z.string().optional().nullable(),
  email: z.string().email("Invalid email format"),
  spouseEmail: z.string().email("Invalid email format").optional().nullable(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  spouseDateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .optional()
    .nullable(),
  anniversary: z.string().optional(),
  children: z
    .array(
      z
        .object({
          name: z.string().min(1, "Child's name is required"),
          age: z.preprocess(
            (value) => Number(value),
            z.number().positive("Age must be a positive integer")
          ),
          dateOfBirth: z.string().min(1, "Date of birth is required"),
        })
        .optional()
    )
    .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

function StyledLable({
  label,
  step,
  labelIdx,
}: {
  label: string;
  step: number;
  labelIdx: number;
}) {
  const roundedClass = useMemo(() => {
    if (labelIdx === 0) {
      return "rounded-tr-full rounded-br-full";
    } else if (labelIdx === 1) {
      return "rounded-l-full rounded-r-full ";
    }
    return "rounded-tl-full rounded-bl-full";
  }, [labelIdx]);

  const textPos = useMemo(() => {
    if (labelIdx === 0) {
      return "text-right";
    } else if (labelIdx === 1) {
      return "text-center";
    }
    return "text-left";
  }, [labelIdx]);

  const tagBg = useMemo(() => {
    if (step === labelIdx) {
      return "bg-blue-400";
    }
    return "bg-slate-400";
  }, [step, labelIdx]);

  return (
    <div
      className={`flex w-auto h-4 max-w-48 p-4 ${roundedClass} ${tagBg} items-center`}
    >
      <p className={`font-semibold text-white w-full ${textPos}`}>{label}</p>
    </div>
  );
}

function FormItemWrapper({ children, label }: FormItemWrapperProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}

function MembershipForm({ open, close }: Props) {
  const [formIdx, setFormIdx] = useState(0);
  const { mutateAsync: saveMemberDetails, isPending: savingDetails } =
    trpc.addMember.useMutation();
  const { mutateAsync: saveChildrenDetails, isPending: savingChildrenDetails } =
    trpc.addChildren.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      spouseName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      telephoneNo: "",
      spouseTelephoneNo: "",
      email: "",
      dateOfBirth: "",
      spouseDateOfBirth: null,
      anniversary: "",
      children: [],
      spouseEmail: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  async function handleNavigation(type: "NEXT" | "PREVIOUS") {
    switch (type) {
      case "NEXT":
        try {
          const res = await form.trigger();
          if (res && formIdx < 2) {
            setFormIdx(formIdx + 1);
          } else {
            return;
          }
        } catch (err) {
          return;
        }

        break;
      case "PREVIOUS":
        if (formIdx === 0) {
          return;
        }
        setFormIdx(formIdx - 1);
        break;
      default:
        break;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await saveMemberDetails(
      {
        payload: {
          name: values.name,
          spouseName: values.spouseName || null,
          address: values.address,
          city: values.city,
          state: values.state,
          zip: values.zip,
          telephone: values.telephoneNo,
          email: values.email,
          spouseEmail: values.spouseEmail || null,
          dateOfBirth: values.dateOfBirth,
          spouseDateOfBirth: values.spouseDateOfBirth || null,
          anniversary: values.anniversary || null,
          spouseTelephone: values.spouseTelephoneNo || null,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: "pending",
          membershipStartDate: new Date().toISOString(),
          membershipEndDate: "",
          amount: 0,
          paymentDate: "",
          stripeCustomerId: "", 
          stripeSubscriptionId: "", 
          stripePlanId: "", 
          stripeProductId: "", 
        },
      },
      {
        onSuccess: async (data) => {
          if (data.code === "SUCCESS" && data.memberId && values.children) {
            const children: Children = [];
            values.children.forEach((child) => {
              if (child) {
                children.push({
                  name: child.name,
                  dateOfBirth: child.dateOfBirth,
                  age: "" + child.age,
                  id: crypto.randomUUID(),
                  memberId: data.memberId,
                });
              }
            });
            await saveChildrenDetails(
              {
                payload: [...children],
              },
              {
                onSuccess: (data) => {
                  setFormIdx(0);
                },
                onError: (err) => {
                  console.error("ADD_CHILDREN_ERROR: ", err);
                },
              }
            );
          }
          form.reset();
          close(false);
        },
      }
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        close(open);
      }}
      modal
    >
      <DialogContent className="max-w-4xl min-h-3.5">
        <OverlayLoader
          loading={savingChildrenDetails || savingDetails}
          message="Saving details..."
        />
        <DialogHeader>
          <DialogTitle>Membership Form</DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center justify-between">
          <StyledLable label="Member details" step={formIdx} labelIdx={0} />
          <StyledLable label="Spouse details" step={formIdx} labelIdx={1} />
          <StyledLable label="Children details" step={formIdx} labelIdx={2} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formIdx === 0 && (
              <>
                <div className="flex flex-col h-auto w-full py-10 gap-10">
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Member&apos;s Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>D.O.B</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                required
                                placeholder="In format (MM/DD/YYYY)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="anniversary"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Anniversary Date</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="In format (MM/DD/YYYY)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="telephoneNo"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                                type="number"
                                minLength={1}
                                maxLength={10}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 w-full">
                    <FormField
                      {...form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItemWrapper label="State">
                          <Input {...field} placeholder="Your state" />
                        </FormItemWrapper>
                      )}
                    />
                    <FormField
                      {...form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItemWrapper label="Zip Code">
                          <Input
                            {...field}
                            placeholder="Enter zip code"
                            type="number"
                          />
                        </FormItemWrapper>
                      )}
                    />
                    <FormField
                      {...form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItemWrapper label="City">
                          <Input {...field} placeholder="Your city" />
                        </FormItemWrapper>
                      )}
                    />
                    <div className="col-span-full">
                      <FormField
                        {...form.control}
                        name="address"
                        render={({ field }) => {
                          return (
                            <FormItemWrapper label="Address">
                              <Textarea
                                {...field}
                                placeholder="Your address"
                                className="resize-none"
                                rows={4}
                              />
                            </FormItemWrapper>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {formIdx === 1 && (
              <div className="grid grid-cols-3 gap-5 py-10">
                <FormField
                  name="spouseName"
                  {...form.control}
                  render={({ field }) => {
                    return (
                      <FormItemWrapper label="Spouse Full Name">
                        <Input {...field} placeholder="Enter spouse name" />
                      </FormItemWrapper>
                    );
                  }}
                />
                <FormField
                  name="spouseEmail"
                  {...form.control}
                  render={({ field }) => {
                    return (
                      <FormItemWrapper label="Spouse Email">
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter spouse email"
                        />
                      </FormItemWrapper>
                    );
                  }}
                />
                <FormField
                  name="spouseDateOfBirth"
                  {...form.control}
                  render={({ field }) => {
                    return (
                      <FormItemWrapper label="Spouse D.O.B">
                        <Input
                          {...field}
                          placeholder="In format (MM/DD/YYYY)"
                        />
                      </FormItemWrapper>
                    );
                  }}
                />
                <FormField
                  name="spouseTelephoneNo"
                  {...form.control}
                  render={({ field }) => {
                    return (
                      <FormItemWrapper label="Spouse Phone number">
                        <Input {...field} placeholder="Enter phone number" />
                      </FormItemWrapper>
                    );
                  }}
                />
              </div>
            )}
            {formIdx === 2 && (
              <div className="flex flex-col h-auto w-full gap-3 py-10">
                <div>
                  <Button variant={"default"} type="button">
                    <div className="flex w-auto items-center gap-2">
                      <PlusCircleIcon size={20} />
                      <p
                        className="font-semibold"
                        onClick={() =>
                          append({ age: 0, dateOfBirth: "", name: "" })
                        }
                      >
                        Add Child
                      </p>
                    </div>
                  </Button>
                </div>
                {fields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="child-field grid grid-cols-4 gap-5 items-center"
                    >
                      <div className="flex w-full gap-3 col-span-3">
                        <FormField
                          control={form.control}
                          name={`children.${index}.name`}
                          render={({ field }) => (
                            <FormItemWrapper label="Child Name">
                              <Input
                                {...field}
                                placeholder="Enter child name"
                              />
                            </FormItemWrapper>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`children.${index}.age`}
                          render={({ field }) => (
                            <FormItemWrapper label="Child's age">
                              <Input
                                type="number"
                                {...field}
                                placeholder="Enter age"
                              />
                            </FormItemWrapper>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`children.${index}.dateOfBirth`}
                          render={({ field }) => (
                            <FormItemWrapper label="Child's D.O.B">
                              <Input
                                {...field}
                                placeholder="In format (MM/DD/YYYY)"
                              />
                            </FormItemWrapper>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        size={"icon"}
                        className="mt-auto"
                      >
                        <MinusCircleIcon />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
            <DialogFooter>
              <Button
                variant={"outline"}
                size={"sm"}
                disabled={
                  formIdx === 2 || savingDetails || savingChildrenDetails
                }
                type="button"
                onClick={() => handleNavigation("NEXT")}
              >
                Next
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                disabled={
                  formIdx === 0 || savingDetails || savingChildrenDetails
                }
                type="button"
                onClick={() => handleNavigation("PREVIOUS")}
              >
                Previous
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                type="reset"
                disabled={savingDetails || savingChildrenDetails}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              {formIdx === 2 && (
                <Button variant={"outline"} size={"sm"} type="submit">
                  {savingDetails || savingChildrenDetails
                    ? "Saving..."
                    : "Submit"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { MembershipForm };
