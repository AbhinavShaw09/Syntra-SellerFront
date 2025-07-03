import React from "react";
import { AuthProvider } from "@/providers/AuthProvider";

interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <AuthProvider>{children}</AuthProvider>
    </React.Fragment>
  );
};

export default AppProviders;
