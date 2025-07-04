"use client"

import Loader from "@/components/shared/Loader";
import { useRedirect } from "@/hooks/UseRedirect";

export default function Home() {
  const {loading} = useRedirect('/auth/login')

  if(loading){
    return <Loader />;
  }

  return (
    <div>
      Home
    </div>
  );
}
