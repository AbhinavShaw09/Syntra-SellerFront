// components/shared/PageLoaderWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export default function PageLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // 2s fake loading

    return () => clearTimeout(timeout);
  }, []);

  if (showLoader) return <Loader />;

  return <>{children}</>;
}
