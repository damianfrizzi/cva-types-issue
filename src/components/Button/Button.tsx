import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const buttonVariants = cva(
  "button inline-flex items-center gap-2 transition cursor-pointer disabled:cursor-default focus-visible:z-10 font-normal",
  {
    variants: {
      look: {
        primary: "text-red-500",
        secondary: "text-green-500",
      },
      size: {
        default: "",
        big: "",
      },
    },
    compoundVariants: [
      {
        look: ["primary", "secondary"],
        size: "default",
        class: "py-2.5 px-6",
      },
      {
        look: ["primary", "secondary"],
        size: "big",
        class: "py-4 px-9 text-xl",
      },
    ],
    defaultVariants: {
      look: "primary",
      size: "default",
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, size, look, ...rest }, ref) => (
    <button
      ref={ref}
      className={classNames(buttonVariants({ look, size, className }))}
      {...rest}
    >
      {children}
    </button>
  )
);
