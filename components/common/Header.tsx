"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useAppQuery } from "@/hooks/useAppQuery";
import { Skeleton } from "../ui/skeleton";

interface UserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

const Header = () => {
  const router = useRouter();
  const { data, isLoading } = useAppQuery<UserResponse>({
    url: "/users/2",
    queryKey: ["user"],
  });

  const user = data?.data;

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Auth App</span>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 hidden md:block" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                <AvatarImage src={user.avatar} alt={user.first_name} />
                <AvatarFallback>{user.first_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:block">
                {user.first_name} {user.last_name}
              </span>
            </div>
          ) : null}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
