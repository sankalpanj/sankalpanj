"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/client";
import { childSchema, MemberAndChildren } from "@/lib/zod-types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  userProfile: MemberAndChildren;
}

interface RenderBasicDetailsProps {
  userProfile: MemberAndChildren;
}

interface RenderSpouseAndChildrenDetailsProps {
  userProfile: MemberAndChildren;
}

const basicDetailsForm = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  dateOfBirth: z.string().default(""),
  telephone: z.string(),
  anniversary: z.string().default(""),
  state: z.string().default(""),
  city: z.string().default(""),
  zip: z.string().default(""),
  address: z.string().default(""),
  email: z.string(),
});

const spouseForm = z
  .object({
    spouseName: z.string().default(""),
    email: z
      .string()
      .min(1, "Enter email")
      .email({ message: "Invalid email" })
      .default(""),
    dateOfBirth: z.string().default(""),
    telephone: z.string().default(""),
  })
  .refine(({ telephone }) => telephone && telephone.length === 10, {
    message: "Invalid telephone number",
    path: ["telephone"],
  });

const childrenFormSchema = z.object({
  children: z.array(childSchema),
});

type SpouseForm = z.infer<typeof spouseForm>;
type BasicDetailsForm = z.infer<typeof basicDetailsForm>;
type ChildrenForm = z.infer<typeof childrenFormSchema>;

function RenderBasicDetails({ userProfile }: RenderBasicDetailsProps) {
  const {
    name,
    anniversary,
    dateOfBirth,
    telephone,
    state,
    city,
    zip,
    address,
  } = userProfile;
  const form = useForm<BasicDetailsForm>({
    resolver: zodResolver(basicDetailsForm),
    defaultValues: {
      name,
      anniversary: anniversary ?? "",
      dateOfBirth,
      telephone,
      state,
      city,
      zip,
      address,
      email: userProfile.email,
    },
  });
  return (
    <div className="flex flex-col w-full h-full ml-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => {})}>
          <div className="grid grid-cols-3 gap-3 w-full h-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your phone number"
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
                      <Input placeholder="Enter your dob" {...field} />
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
                    <FormLabel>Anniversary date</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button>Save</Button>
        </form>
      </Form>
    </div>
  );
}

function RenderSpouseAndChildrenDetails({
  userProfile,
}: RenderSpouseAndChildrenDetailsProps) {
  const { mutateAsync: addChild } = trpc.addChild.useMutation();
  const { mutateAsync: updateSpouse } = trpc.updateSpouse.useMutation();

  const form = useForm<SpouseForm>({
    resolver: zodResolver(spouseForm),
    defaultValues: {
      dateOfBirth: userProfile.spouseDateOfBirth ?? "",
      email: userProfile.spouseEmail ?? "",
      spouseName: userProfile.spouseName ?? "",
      telephone: userProfile.spouseTelephone ?? "",
    },
  });

  const childrenForm = useForm<ChildrenForm>({
    resolver: zodResolver(childrenFormSchema),
    defaultValues: {
      children: userProfile.children ?? [],
    },
  });

  const { fields, append } = useFieldArray({
    name: "children",
    control: childrenForm.control,
  });

  async function handleSaveSpouse(values: SpouseForm) {
    const result = await updateSpouse({
      memberId: userProfile.id,
      spouseName: values.spouseName,
      spouseEmail: values.email,
      spouseTelephone: values.telephone,
      spouseDateOfBirth: values.dateOfBirth,
    });

    if (result.code === "SUCCESS") {
      toast.success("Spouse details updated successfully");
    } else {
      toast.error("Failed to update spouse details");
    }
  }

  async function handleSaveChildren(values: ChildrenForm) {
    const records: ChildrenForm["children"] = values.children.map((child) => ({
      ...child,
      id: crypto.randomUUID(),
      memberId: userProfile.id,
    }));
    const result = await addChild(records);

    if (result.code === "SUCCESS") {
      toast.success("Children added successfully");
    } else {
      toast.error("Failed to add children");
    }
  }

  return (
    <div className="flex flex-col grow w-full gap-8">
      <fieldset className="border border-solid border-gray-300 p-3 rounded-md w-full h-auto">
        <legend className="text-sm px-3">Spouse details</legend>
        <Form {...form}>
          <form
            className="w-full h-full px-5"
            onSubmit={form.handleSubmit(handleSaveSpouse)}
          >
            <div className="grid grid-cols-3 gap-3 w-full h-full">
              <FormField
                control={form.control}
                name="spouseName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
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
                        <Input placeholder="Enter email" {...field} />
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
                        <Input placeholder="Enter dob" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Telephone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter telephone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex w-full justify-end mt-3">
              <Button size={"sm"} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </fieldset>
      <fieldset className="border border-solid border-gray-300 p-3 rounded-md w-full h-auto">
        <legend className="text-sm px-3">Children details</legend>
        <Form {...childrenForm}>
          <form
            className="w-full h-full px-5"
            onSubmit={childrenForm.handleSubmit(handleSaveChildren)}
          >
            {fields.length === 0 ? (
              <div className="flex flex-col w-full h-full mx-auto items-center justify-center">
                <p className="text-sm text-gray-600">
                  No children added yet. Click on the button below to add a
                  child.
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-full h-full gap-5">
                {fields.map((_, index) => {
                  return (
                    <div
                      className="grid grid-cols-3 gap-y-5 gap-x-3 w-full h-full"
                      key={index}
                    >
                      <FormField
                        control={childrenForm.control}
                        name={`children.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter child's name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={childrenForm.control}
                        name={`children.${index}.age`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter child's age"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={childrenForm.control}
                        name={`children.${index}.dateOfBirth`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter child's date of birth"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col w-full h-full mx-auto items-center justify-center mt-3">
              <Button
                size={"sm"}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  append({
                    id: "",
                    name: "",
                    dateOfBirth: "",
                    memberId: "",
                    age: "",
                  });
                }}
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Child
              </Button>
              <Button size={"sm"} className="mt-3 ml-auto" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </fieldset>
    </div>
  );
}

function UserProfileSettings({ userProfile }: Props) {
  const [content, setContent] = useState<"basic" | "spouse-children">("basic");
  const { user, isLoaded, isSignedIn } = useUser();

  if (!user || !isLoaded || !isSignedIn) return null;

  const role = user.unsafeMetadata.role as string;

  return (
    <div className="flex h-full w-full p-8">
      <div className="flex flex-col h-full w-auto gap-3 items-start">
        <Button
          size={"lg"}
          variant={"link"}
          style={{
            color: content === "basic" ? "#1D72FE" : "inherit",
            textDecoration: content === "basic" ? "underline" : "none",
          }}
          onClick={() => setContent("basic")}
        >
          <p className="text-sm font-semibold">Basic</p>
        </Button>
        <Button
          size={"lg"}
          variant={"link"}
          onClick={() => setContent("spouse-children")}
          style={{
            color: content === "spouse-children" ? "#1D72FE" : "inherit",
            textDecoration:
              content === "spouse-children" ? "underline" : "none",
          }}
        >
          <p className="text-sm font-semibold">Spouse & Children</p>
        </Button>
      </div>
      <Separator className="mx-4" orientation="vertical" />
      {content === "basic" && <RenderBasicDetails userProfile={userProfile} />}
      {content === "spouse-children" && (
        <RenderSpouseAndChildrenDetails userProfile={userProfile} />
      )}
    </div>
  );
}

export { UserProfileSettings };
