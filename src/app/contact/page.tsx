import { ContactForm } from "./form";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-center bg-[#ffffff00]">
      <div className="flex flex-col w-full my-20 justify-center items-center bg-[#f3f3f3]">
        <h2 className="pt-14">Want us to reach you?</h2>
        <ContactForm />
      </div>
    </main>
  );
}
