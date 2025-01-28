import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/lib/constants";
import Image from "next/image";
interface Props {
  member: Member;
}

export default function RenderMemberDetail({
  member: { designation, name, imageSrc },
}: Props) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 ease-linear delay-0 w-full">
      <CardContent className="hover:shadow-lg transition-all duration-300 ease-linear delay-0 p-5">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex w-full h-full gap-5 items-center">
            <Image
              src={imageSrc}
              width={200}
              height={200}
              alt={`mem_${name}`}
              className="rounded-full border object-cover shadow-md p-0 w-[150px] h-[150px]"
            />
            <div className="flex flex-col h-full w-full py-2 gap-2">
              <p className="text-xl font-semibold text-zinc-500">{name}</p>
              <p className="text-sm text-[#696a6b]">{designation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
