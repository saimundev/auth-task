import React from "react";
import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const UserLoading = () => {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-2xl bg-white/60 backdrop-blur-xl dark:bg-gray-900/60">
        <div className="h-32 bg-gray-200 animate-pulse"></div>
        <CardHeader className="relative pb-0">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <Skeleton className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-900" />
          </div>
        </CardHeader>
        <div className="mt-16 pb-12 text-center space-y-2 flex flex-col items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </Card>
    </div>
  );
};

export default UserLoading;
