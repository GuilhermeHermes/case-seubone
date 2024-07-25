import Header from "@/components/header";

import '../../app/globals.css'
import { auth } from "@/auth";

export default async function ProtectedPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="w-full">
      <div>
        <Header role={session?.user.role} name={session?.user.name ?? ''}/>
      </div>
      <div className="flex flex-row justify-center ">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
