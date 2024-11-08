export default async function Home() {

  return (
    <main className="flex flex-col min-h-screen w-full relative">
      <div className="w-full h-3/5 bg-[#4867d6]" />
      <div className="flex absolute -bottom-1/3 border left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-5/6 md:w-4/5 rounded-lg shadow-md bg-[#f2f2f2]">
        <div className="flex flex-col h-full w-full items-center justify-center p-2">
          <h3 className="font-semibold text-[#4867d6]">Meet our members</h3>
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] w-full grow overflow-y-auto px-2 py-10 md:py-20">
            {Array.from({ length: 15 }).map((a, i) => {
              return (
                <div
                  className="flex flex-col w-full h-full border-2 rounded-lg items-center justify-center"
                  key={i}
                >
                  Dummy
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
