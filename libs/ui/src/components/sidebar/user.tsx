import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/libs/ui/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/libs/ui/components/ui/avatar';
import { cn } from '@/libs/ui/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/libs/ui/components/ui/dropdown-menu';
import { LogOut, Settings, User2 } from 'lucide-react';
import { useAuth, logout } from '../../../../../apps/website/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const User = ({ controlText }: any) => {
  const auth: any = useAuth();
  const router = useRouter();
  return (
    <>
      <div className="max-w-min flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full focus:outline-none">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{auth?.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 mb-2 w-full">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  router.push('/panel');
                }}
              >
                <User2 className="mr-2 h-4 w-4" />
                <span className="pl-2">Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <motion.div animate={controlText} className="ml-3 flex flex-col justify-between text-left">
          <p className="text-md text-black leading-none">
            {auth?.user.name}
          </p>
          <p className="text-xs">
            {auth?.user.roles[0].role.name}
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default User;
