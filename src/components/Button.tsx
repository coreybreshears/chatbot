import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Button({
  children,
  ...attributes
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      {...attributes}
    >
      {children}
    </button>
  );
}
