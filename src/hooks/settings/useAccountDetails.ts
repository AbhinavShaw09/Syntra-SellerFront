"use client";
import { useEffect, useState } from "react";
import { BakckendEndpoints } from "@/utils/endpoints";
import { showToast } from "@/lib/toast";
import { useAuth } from "@/providers/AuthProvider";

type AccountPageProps = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export default function useAccountDetails(): {
  accountDetails: AccountPageProps | null;
  loading: boolean;
} {
  const [accountDetails, setAccountDetails] = useState<AccountPageProps | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchAccountDetails() {
      setLoading(true);
      fetch(BakckendEndpoints.ACCOUNT.GET_ACCOUNT_DETAILS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAccountDetails(data);
        })
        .catch(() => {
          showToast({
            title: "Account Details fetching failed",
            description: "Error from server",
            type: "error",
            actionLabel: "Retry",
          });
          setAccountDetails(null);
        })
        .finally(() => setLoading(false));
    }

    fetchAccountDetails();
  }, [user]);

  return { accountDetails, loading };
}
