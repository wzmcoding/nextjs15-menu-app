"use client";

import { ReactNode, useState } from "react";
import { Collapsible } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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

      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Content>content</Collapsible.Content>
      </Collapsible.Root>
      {children}
    </div>
  );
};

export { DashboardLayout };
