"use client";

import { Navbar } from "@/ui/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div
        className={` text-foreground bg-background relative flex flex-col h-screen`}
      >
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16  border-2 flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
