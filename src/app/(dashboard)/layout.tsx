import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      topbar sidebar
      <button className="m-5 h-10 w-10 bg-blue-500 p-10"></button>
      {children}
    </>
  );
};

export default Layout;
