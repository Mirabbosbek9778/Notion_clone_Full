"use client";

import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/shared/modeToggle";
import { Button } from "@/components/ui/button";
import UseScrolled from "@/hooks/usescrolled";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const scrolled = UseScrolled();
  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-2">
        <Button size={"sm"} variant={"ghost"}>
          Log In
        </Button>
        <Button size={"sm"}>Get Notion Free</Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
