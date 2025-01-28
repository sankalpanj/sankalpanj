import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Events() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Alert variant={"default"} className="w-full max-w-2xl">
        <AlertTitle>Coming Soon!</AlertTitle>
        <AlertDescription>
          This page is currently under construction. Check back soon for event
          management features.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export { Events };
