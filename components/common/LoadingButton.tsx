import React from "react";
import LoadingCircleIcon from "@/icons/LoadingCircleIcon";
import { Button } from "../ui/button";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
};

const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-8">
          <LoadingCircleIcon className="mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
