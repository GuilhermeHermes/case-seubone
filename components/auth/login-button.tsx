"use client";



import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean, 
    route: string,   
};


export const LoginButton = ({
    children,
    mode = "redirect",
    asChild,
    route
}: LoginButtonProps) => {
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
