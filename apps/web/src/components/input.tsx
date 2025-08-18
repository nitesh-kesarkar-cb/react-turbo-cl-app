import type { InputHTMLAttributes } from "react";

type AppInputProps = Readonly<InputHTMLAttributes<HTMLInputElement>>;

function AppInput({ ...props }: AppInputProps) {
  return <input {...props} />;
}

export default AppInput;
