import type { HTMLAttributes, ReactNode } from "react";

type AppH3Props = Readonly<{
  children: ReactNode;
}> &
  HTMLAttributes<HTMLHeadingElement>;

function AppH3({ children, ...props }: AppH3Props) {
  return <h3 {...props}>{children}</h3>;
}

export default AppH3;
