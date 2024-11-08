import Link from "next/link";

function Footer() {
  return (
    <footer className="h-auto w-full bg-[#091b27] py-10 px-2 md:py-28 md:px-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 md:gap-x-5 md:px-[60px] md:pt-[40px] pb-0">
        <div className="flex flex-col h-full w-full max-w-md gap-2 md:gap-5">
          <h3 className="text-white font-semibold">Our Mission</h3>
          <p className="text-[#918e8e] break-words text-[15px]">
            We are dedicated to serving the community and protecting our
            environment. Through collective action, we promote biodiversity,
            reduce plastic usage, and work towards a better world for all.
          </p>
        </div>
        <div className="flex flex-col h-full w-auto gap-2 md:gap-5">
          <h3 className="text-white font-semibold">Quick Links</h3>
          <Link href={"/donation"} className="text-[#918e8e] text-[15px]">
            Donate
          </Link>
          <Link href={"/members"} className="text-[#918e8e] text-[15px]">
            Members
          </Link>
          <Link href={""} className="text-[#918e8e] text-[15px]">
            Volunteers
          </Link>
          <Link href={"/events"} className="text-[#918e8e] text-[15px]">
            Events
          </Link>
          <Link href={""} className="text-[#918e8e] text-[15px]">
            Contact us
          </Link>
        </div>
        <div className="flex flex-col h-full w-full gap-5">
          <h3 className="text-white font-semibold">Contact Us</h3>
          <div className="flex w-full items-start gap-3">
            <div className="flex h-8 w-8 p-2 bg-inherit border rounded-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-navigation"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div className="flex flex-col grow w-auto md:gap-2">
              <p className="text-teal-300">Head Office</p>
              <p className="text-[#918e8e] text-[15px]">
                Lorem ipsum dolor, sit amet consectetur.
              </p>
            </div>
          </div>
          <div className="flex w-full items-start gap-3">
            <div className="flex h-8 w-8 p-2 bg-inherit border rounded-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone-call"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                <path d="M14.05 6A5 5 0 0 1 18 10" />
              </svg>
            </div>
            <div className="flex flex-col grow w-auto md:gap-2">
              <p className="text-teal-300">Phone</p>
              <p className="text-[#918e8e] text-[15px]">
                Lorem ipsum dolor, sit amet consectetur.
              </p>
            </div>
          </div>
          <div className="flex w-full items-start gap-3">
            <div className="flex h-8 w-8 p-2 bg-inherit border rounded-full items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-at-sign"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            </div>
            <div className="flex flex-col grow w-auto md:gap-2">
              <p className="text-teal-300">Email</p>
              <p className="text-[#918e8e] text-[15px]">
                Lorem ipsum dolor, sit amet consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
