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
          <div className="flex w-full gap-5 items-center">
            <div className="w-36 object-fill rounded-full border shadow-md overflow-hidden ring-2 ring-gray-300">
              <Image
                src={imageSrc}
                width={150}
                height={100}
                alt={`mem_${name}`}
                className="rounded-full aspect-square object-cover"
              />
            </div>
            <div className="flex flex-col h-full w-full py-2 gap-2">
              <p className="text-xl font-semibold text-zinc-500 max-w-md truncate text-ellipsis">{name}</p>
              <p className="text-sm text-[#696a6b]">{designation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
