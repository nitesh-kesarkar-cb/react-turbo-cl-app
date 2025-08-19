import type { InputHTMLAttributes } from "react";

type AppInputProps = Readonly<InputHTMLAttributes<HTMLInputElement>>;

function AppInput({ ...props }: AppInputProps) {
  return <input {...props} className="mx-2" />;
}

export default AppInput;
