"use client";



import { useRouter } from "next/navigation";

interface RedirectButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean, 
    route: string,   
};


export const RedirectButton = ({
    children,
    mode = "redirect",
    asChild,
    route
}: RedirectButtonProps) => {
    const router = useRouter();
    
    const onClick = () => {
        console.log("login button clicked")
        router.push(route)
    }

    if(mode === "modal") {
        return (
            <span>
                fzr depois
            </span>
        )
    }


return (
    <span onClick={onClick} className="cursor-pointer p-2" >
        {children}
    </span>
);
};
