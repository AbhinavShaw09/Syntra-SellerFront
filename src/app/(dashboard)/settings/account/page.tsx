"use client";

import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import useAccountDetails from "@/hooks/settings/useAccountDetails";
import AccountDetailSection from "@/components/settings/account/AccountDetailSection";

const Account = () => {
  const { user, logout } = useAuth();
  const { accountDetails } = useAccountDetails();
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Account Details
      </h1>
      <AccountDetailSection
        user={user}
        logout={logout}
        accountDetails={accountDetails}
      />
    </div>
  );
};

export default Account;
