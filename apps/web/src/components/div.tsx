import type { HTMLAttributes, ReactNode } from "react";

type AppDivProps = Readonly<{
  children: ReactNode;
}> &
  HTMLAttributes<HTMLDivElement>;

function AppDiv({ children, ...props }: AppDivProps) {
  return <div {...props}>{children}</div>;
}

export default AppDiv;
