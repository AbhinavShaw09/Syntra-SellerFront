"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Loader from "./Loader";

export default function PageLoaderWrapper({ children }: { children: React.ReactNode }) {
  const router= useRouter()
  const [showLoader, setShowLoader] = useState(true);
  const {user, loading} = useAuth()

  useEffect(() => {
    if(!loading && !user){
      router.push("/auth/login");
    }
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user, loading,router]);

  if (showLoader) return <Loader />;

  return <>{children}</>;
}
