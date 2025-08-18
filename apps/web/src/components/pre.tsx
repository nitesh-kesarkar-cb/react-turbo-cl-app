import type { HTMLAttributes, ReactNode } from "react";

type AppPreProps = Readonly<{
  children: ReactNode;
}> &
  HTMLAttributes<HTMLPreElement>;

function AppPre({ children, ...props }: AppPreProps) {
  return <pre {...props}>{children}</pre>;
}

export default AppPre;
