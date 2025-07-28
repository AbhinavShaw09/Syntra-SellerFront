"use client";
import React from "react";
import Link from "next/link";
import { User } from "@/types/common/user";

interface AccountDetailSectionProps {
  user: User | null;
  logout: () => void;
  accountDetails: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
}

const AccountDetailSection = ({
  user,
  logout,
  accountDetails,
}: AccountDetailSectionProps) => {
  return (
    <div>
      {user ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="text-xs text-gray-500 mb-1">Username</p>
              <p className="text-base text-foreground">
                {accountDetails?.username}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-base text-foreground">
                {accountDetails?.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">First Name</p>
              <p className="text-base text-foreground">
                {accountDetails?.first_name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Last Name</p>
              <p className="text-base text-foreground">
                {accountDetails?.last_name}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={logout}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 text-sm rounded-xl transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Login Required</h3>
          <p className="text-muted-foreground">
            Please{" "}
            <Link href="/auth/login" className="text-blue-600 underline">
              login
            </Link>{" "}
            to view and manage your account details.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountDetailSection;
