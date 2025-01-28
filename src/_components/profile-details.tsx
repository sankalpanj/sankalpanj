"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberAndChildren } from "@/lib/zod-types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Events } from "./events";
import { MembershipSetting } from "./membership-setting";
import { PaymentHistory } from "./payment-history";
import { UserProfileSettings } from "./profile-settings";

interface Props {
  userProfile: MemberAndChildren;
}

function RenderUserProfileSettings({ userProfile }: Props) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { name } = userProfile;

  if (!user || !isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <div className="flex flex-col grow w-full items-center">
      <Image
        src={user.imageUrl}
        width={150}
        height={150}
        alt="user-image"
        className="rounded-full border shadow-sm"
      />
      <h2 className="mt-5">Welcome {name}</h2>
      <Tabs defaultValue="profile" className="h-full w-full px-5 mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile settings</TabsTrigger>
          <TabsTrigger value="membership">Membership settings</TabsTrigger>
          <TabsTrigger value="events">Manage events</TabsTrigger>
          <TabsTrigger value="payment">Payment history</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="h-full w-full">
          <UserProfileSettings userProfile={userProfile} />
        </TabsContent>
        <TabsContent value="membership">
          <MembershipSetting profileDetails={userProfile} />
        </TabsContent>
        <TabsContent value="payment" className="h-full w-full">
          <PaymentHistory  />
        </TabsContent>
        <TabsContent value="events" className="h-full w-full">
          <Events />
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export { RenderUserProfileSettings };
