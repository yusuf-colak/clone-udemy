'use client'

import {Crown} from "iconsax-react";
import {useAuth} from "../../../../../apps/website/hooks/useAuth";
import {Avatar, AvatarFallback} from "@/libs/ui/components/ui/avatar";
import React from "react";
import {cn} from "@/libs/ui/utils";

interface Props {
    className?: string;
}

export default function Greeting({className}: Props) {
    const auth: any = useAuth();
    const best = true;

    return (
        <div className={
            cn(
                "pb-4 mb-4 flex items-center space-x-4",
                className
            )
        }>
            <div className={`relative rounded-full h-10  ${best ? 'ring-2 ring-offset-2 ring-[#FFD700]' : ''}`}>
                <Avatar>
                    <AvatarFallback>{auth?.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {
                    best && (
                        <Crown size="24"
                               color="#FFD700"
                               variant="Bold"
                               className="absolute z-10 top-[-9px] right-[-8px] rotate-[25deg]"/>
                    )
                }
            </div>

            <div className="flex flex-col">
                <h1 className="text-2xl text-gray-700">
                    <span className="font-bold">Welcome Back, </span>
                    <span>{auth?.user.name} 👋</span>
                </h1>
                <span
                    className="text-sm text-gray-400">
                    {auth?.user.roles[0].role.name}
                    {
                        auth?.user.roles[0].role.name !== "Superadmin" && (
                            ' @' + auth?.user?.tenant.name
                        )
                    }
                </span>
            </div>
        </div>
    );
}
