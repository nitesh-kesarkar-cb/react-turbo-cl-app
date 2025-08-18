import type { HTMLAttributes, ReactNode } from "react";

type AppH2Props = Readonly<{
  children: ReactNode;
}> &
  HTMLAttributes<HTMLHeadingElement>;

function AppH2({ children, ...props }: AppH2Props) {
  return <h2 {...props}>{children}</h2>;
}

export default AppH2;
