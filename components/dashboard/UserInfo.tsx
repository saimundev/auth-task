"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppQuery } from "@/hooks/useAppQuery";
import UserLoading from "./UserLoading";
import { UserResponse } from "../interface/dashboard.interface";

const UserInfo = () => {
  const { data, isLoading, error } = useAppQuery<UserResponse>({
    url: "/users/2",
    queryKey: ["user"],
  });

  const user = data?.data;

  if (isLoading) {
    return <UserLoading />;
  }

  if (error || !user) {
    return (
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <div className="text-red-500">Failed to load user data</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-2xl bg-white/60 backdrop-blur-xl dark:bg-gray-900/60">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <CardHeader className="relative pb-0">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg dark:border-gray-900">
              <AvatarImage src={user.avatar} alt={user.first_name} />
              <AvatarFallback className="text-4xl">
                {user.first_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <div className="mt-16 pb-12 text-center space-y-1">
          <CardTitle className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </Card>
    </main>
  );
};

export default UserInfo;
