import React from "react";
import Header from "@/components/common/Header";
import UserInfo from "@/components/dashboard/UserInfo";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <UserInfo />
    </div>
  );
};

export default DashboardPage;
