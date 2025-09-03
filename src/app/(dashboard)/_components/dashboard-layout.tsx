"use client";

import { ReactNode, useState } from "react";
import { Collapsible } from "radix-ui";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>

      <Collapsible.Root
        className="fixed top-0 left-0 z-20 h-dvh"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-center">
              <h1 className="mr-2 font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2" />
            <div className="mt-4">
              <p>Route 1</p>
              <p>Route 2</p>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "ml-64" : "ml-0"}`}
      >
        {children}
      </main>
    </div>
  );
};

export { DashboardLayout };
