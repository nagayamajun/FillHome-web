import { Routing } from "@/hooks/routing";
import Image from "next/image";
import Link from "next/link";

export const AdminHeading = (): JSX.Element => (
  <h1 className="font-bold text-xl">
    <Link href={Routing.adminRentalHouses.buildRoute().path}>
      <Image
        src='/FiillHome.png'
        height={160}
        width={160}
        alt="ロゴ"
      />
    </Link>
  </h1>
)