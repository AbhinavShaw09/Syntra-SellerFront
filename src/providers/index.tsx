import React from "react";
import { AuthProvider } from "@/providers/AuthProvider";
// import PageLoaderWrapper from "@/components/shared/PageLoaderWrapper";

interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <AuthProvider>
        {/* <PageLoaderWrapper>{children}</PageLoaderWrapper> */}
        {children}
      </AuthProvider>
    </React.Fragment>
  );
};

export default AppProviders;
