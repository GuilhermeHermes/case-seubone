"use client";
import {Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../ui/card";
import { Header } from "@/components/auth/header-auth";
import { Social } from "@/components/auth/social";
import { BackButton } from "./back-buttont";

interface CardWrapperProps {
    children: React.ReactNode;
    headerTitle: string;
    headerLabel: string;
    backButtonlabel: string;
    backButtonHref: string;
    BaseOrDark?: string;
    showSocial?: boolean;
    width?: string;
};


export const CardWrapper = ({
    children,
    headerTitle,
    headerLabel,
    backButtonlabel,
    backButtonHref,
    BaseOrDark,
    showSocial = false,
    width,
}: CardWrapperProps) => {
    return(
        <Card className={`shadow-md flex flex-col ${width}`} >
            <CardHeader>
                <Header  BaseOrDark={BaseOrDark ?? ''} label={headerLabel} title={headerTitle}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {showSocial && 
            <CardFooter className="font-normal w-full justify-center flex flex-col">
                <Social />
            </CardFooter>}
            <CardFooter className="font-normal w-full justify-center">
                <BackButton label={backButtonlabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}