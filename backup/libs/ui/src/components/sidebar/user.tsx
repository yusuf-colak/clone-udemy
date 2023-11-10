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

const User = ({ navbarToggle, controlText }: any) => {
  const auth: any = useAuth();
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Card className={cn(navbarToggle ? 'w-[210px]' : 'w-full ')}>
              <CardHeader className="flex flex-row items-center p-2">
                <CardTitle>
                  <Avatar>
                    <AvatarImage />
                    <AvatarFallback>{auth?.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </CardTitle>
                <motion.div animate={controlText}>
                  <CardDescription className="ml-3 text-lg text-black">
                    {auth?.user.name}
                  </CardDescription>
                  <CardDescription className="ml-3">
                    @{auth?.user.roles[0].role.name}
                  </CardDescription>
                </motion.div>
              </CardHeader>
            </Card>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
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
      </div>
    </>
  );
};

export default User;
