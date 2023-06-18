'use client';

import Header from "@/components/Header";
import { useAuth } from "@/hook/useAuth";

export default function PrivatedLayout({ children, }: { children: React.ReactNode }){

  const {user} = useAuth();

  return (
    <>
      <Header/>
      {children}
    </>
  )
}
