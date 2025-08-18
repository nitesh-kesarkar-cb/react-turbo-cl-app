import type { ButtonHTMLAttributes, ReactNode } from "react";

type AppButtonProps = Readonly<{
  children: ReactNode;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

function AppButton({ children, ...props }: AppButtonProps) {
  return <button {...props}>{children}</button>;
}

export default AppButton;
