import type { HTMLAttributes, ReactNode } from "react";

type AppPProps = Readonly<{
  children: ReactNode;
}> &
  HTMLAttributes<HTMLParagraphElement>;

function AppP({ children, ...props }: AppPProps) {
  return <p {...props}>{children}</p>;
}

export default AppP;
