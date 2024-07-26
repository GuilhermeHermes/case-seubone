import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Import the Image component from the correct package

const font = Poppins({
    subsets: ["latin"],
    weight: "600",
});

interface HeaderProps {
    label: string;
    title: string;
    BaseOrDark: string;
};

export const Header = ({
    title,
    label,
    BaseOrDark,
}: HeaderProps) => {
    return (
       <div className="w-full flex flex-col gap-y-4 items-center justify-center">
       <h1 className={cn("text-3xl font-semibold text-center", font.className   )}>
        {(BaseOrDark === 'dark') ? <Image src= '/assets/LOGO-2.png' alt="Logo" width={200} height={150} />: <Image src= '/assets/LOGO.png' alt="Logo" width={200} height={150} /> }
       {title}
        </h1>
        <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}