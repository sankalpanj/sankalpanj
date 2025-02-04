"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc/client";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { createElement, Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Box } from "./ui/box";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

const signInFormSchema = z.object({
  email: z.string().min(1, "Enter email"),
  password: z.string().min(1, "Enter password"),
});

const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, "Enter first name"),
    lastName: z.string().min(1, "Enter last name"),
    email: z.string().min(1, "Enter email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .min(1, "Enter password"),
    cpassword: z.string().min(1, "Confirm your password"),
    role: z.enum(["Member", "Volunteer"]).default("Member"),
  })
  .refine(({ cpassword, password }) => password === cpassword, {
    message: "Passwords must match",
    path: ["cpassword"],
  });

const emailVerificationSchema = z
  .object({
    code: z.string(),
  })
  .refine(
    ({ code }) => {
      return code.length === 6;
    },
    {
      path: ["code"],
      message: "Invalid verification code",
    }
  );

type SignInForm = z.infer<typeof signInFormSchema>;
type SignUpForm = z.infer<typeof signUpFormSchema>;
type EmailVerificationForm = z.infer<typeof emailVerificationSchema>;

function AuthForm({ open, close }: Props) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const {
    signIn,
    isLoaded: signInLoaded,
    setActive: setSignInActive,
  } = useSignIn();
  const [form, setForm] = useState<"signin" | "signup" | "email_verification">(
    "signin"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const {
    mutateAsync: addMember,
    isPending: addingMember,
    isError: addMemeberError,
  } = trpc.addMember.useMutation();

  const { mutateAsync: handleSignIn, isPending: signingIn } = useMutation({
    mutationFn: async (values: SignInForm) => {
      const { email, password } = values;
      if (!signInLoaded) return;
      const signInRes = await signIn.create({
        identifier: email,
        password,
      });

      return signInRes;
    },
    onSuccess: async (data) => {
      if (data && signInLoaded) {
        if (data.status === "complete" && data.createdSessionId) {
          await setSignInActive({ session: data.createdSessionId });
          await signIn.reload();
          close(false);
        }
      }
    },
  });

  const { mutateAsync: handleSignUp, isPending: signingUp } = useMutation({
    mutationFn: async (values: SignUpForm) => {
      if (!isLoaded) return;
      const { firstName, lastName, password, email, role } = values;
      const signUpRes = await signUp.create({
        firstName: firstName,
        lastName: lastName,
        password: password,
        emailAddress: email,
        unsafeMetadata: {
          role,
        },
      });
      return signUpRes;
    },
    onSuccess: async (data) => {
      if (data && isLoaded) {
        if (data.createdSessionId) {
          await setActive({ session: data.createdSessionId });
        }

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setForm("email_verification");
      }
    },
  });

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      cpassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "Member",
    },
  });

  const emailVerificationForm = useForm<EmailVerificationForm>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      code: "",
    },
  });

  async function handleEmailVerification(values: EmailVerificationForm) {
    const { code } = values;
    if (!isLoaded) return;
    try {
      const verificationRes = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (verificationRes.status === "complete") {
        const { firstName, lastName, email } = signUpForm.getValues();
        if (verificationRes.createdUserId) {
          await addMember({
            payload: {
              address: "",
              anniversary: "",
              city: "",
              createdAt: new Date().toISOString(),
              dateOfBirth: "",
              email,
              id: verificationRes.createdUserId,
              name: `${firstName} ${lastName}`,
              spouseDateOfBirth: "",
              spouseEmail: "",
              spouseName: "",
              spouseTelephone: "",
              state: "",
              telephone: "",
              zip: "",
              membershipStartDate: "",
              membershipEndDate: "",
              amount: 0,
              status: "pending",
              paymentDate: "",
              stripeCustomerId: "",
              stripeSubscriptionId: "",
              stripePlanId: "",
              stripeProductId: "",
            },
          });
          await signUp.reload();
        }
        close(false);
      }
    } catch (err) {
      console.log("email_verfication_error: ", err);
      emailVerificationForm.setError("code", {
        message: (err as Error).message,
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setForm("signin");
        signInForm.reset();
        signUpForm.reset();
        close(open);
      }}
      modal
    >
      <DialogContent className="w-full max-w-lg min-h-3.5 mx-auto">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
        </DialogHeader>
        {form === "signin" && (
          <Form {...signInForm}>
            <form
              onSubmit={signInForm.handleSubmit(async ({ email, password }) => {
                await handleSignIn({ email, password });
              })}
            >
              <div className="grid grid-cols-1 gap-5 w-full max-w-xl">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex w-full mt-8 justify-between">
                <div className="flex w-full gap-3 items-center">
                  <p className="text-sm font-semibold">
                    Don&apos;t have an account ?
                  </p>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    onClick={() => {
                      setForm("signup");
                    }}
                  >
                    <p className="text-base text-[#1971c2] font-semibold">
                      Sign up
                    </p>
                  </Button>
                </div>
                <Button type="submit">
                  {signingIn ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>
        )}
        {form === "signup" && (
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit((values) =>
                handleSignUp({ ...values })
              )}
            >
              <div className="flex flex-col h-auto w-full gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={signUpForm.control}
                    name="firstName"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="lastName"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormField
                  control={signUpForm.control}
                  name="role"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>User role</FormLabel>
                        <FormControl>
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Member">Member</SelectItem>
                                <SelectItem value="Volunteer">
                                  Volunteer
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={signUpForm.control}
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
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Box className="relative">
                            <Input
                              placeholder="Re-type password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                            />
                            <Box
                              className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                              onClick={() => {
                                setShowPassword(!showPassword);
                              }}
                            >
                              {createElement(
                                showPassword ? EyeIcon : EyeOffIcon,
                                {
                                  className: "h-6 w-6",
                                }
                              )}
                            </Box>
                          </Box>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={signUpForm.control}
                  name="cpassword"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Box className="relative">
                            <Input
                              placeholder="Re-type password"
                              {...field}
                              type={showCPassword ? "text" : "password"}
                            />
                            <Box
                              className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                              onClick={() => {
                                setShowCPassword(!showCPassword);
                              }}
                            >
                              {createElement(
                                showCPassword ? EyeIcon : EyeOffIcon,
                                {
                                  className: "h-6 w-6",
                                }
                              )}
                            </Box>
                          </Box>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex w-full justify-between">
                  <div className="flex w-full gap-3 items-center">
                    <p className="text-sm font-semibold">Have an account ?</p>
                    <Button
                      size={"sm"}
                      variant={"link"}
                      onClick={() => {
                        setForm("signin");
                      }}
                    >
                      <p className="text-base text-[#1971c2] font-semibold">
                        Sign in
                      </p>
                    </Button>
                  </div>
                  <Button className="ml-auto" type="submit">
                    {signingUp ? "Please wait..." : "Sign up"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
        {form === "email_verification" && (
          <Form {...emailVerificationForm}>
            <form
              onSubmit={emailVerificationForm.handleSubmit((value, error) => {
                handleEmailVerification(value);
              })}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                gap: 10,
              }}
            >
              <FormField
                control={emailVerificationForm.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Enter verification code</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          onChange={(value) => {
                            emailVerificationForm.setValue("code", value);
                          }}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit">Verify</Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { AuthForm };
