/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAuth } from "@/hook/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GuestLayout from "./layoutGuest";
import PrivatedLayout from "./layoutPrivated";

const publicURI = ["/login", "/register"];

export default function LayoutDispatcher({ children, }: { children: React.ReactNode }) {

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && publicURI.includes(pathname)) {
      router.push("/")
    } else if (!user && !loading) {
      if(publicURI.includes(pathname)){
        router.push(pathname)
      }else{
        router.push("/login")
      }
    }
  }, [user, loading]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading ||
    (user && publicURI.includes(pathname)) ||
    (!user && !loading && !publicURI.includes(pathname))
  ) return null;

  if (user) {
    return <PrivatedLayout>{children}</PrivatedLayout>
  } else {
    return <GuestLayout>{children}</GuestLayout>
  }
}
