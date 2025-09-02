import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      DashboardLayout
      {children}
    </div>
  );
};

export { DashboardLayout };
