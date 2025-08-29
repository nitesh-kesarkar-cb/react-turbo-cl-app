import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("scroll-m-20 tracking-tight text-balance", {
  variants: {
    level: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: { level: "h2" },
});

type Level = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  /** Which tag to render. Defaults to `level`. */
  as?: Level;
}

/** Generic shadcn-style heading */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, level, className, ...props }, ref) => {
    const tag: Level = as ?? level ?? "h2";
    return React.createElement(tag, {
      ref,
      className: cn(headingVariants({ level: tag }), className),
      ...props,
    });
  }
);
Heading.displayName = "Heading";

/** Convenience exports */
export const H1 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => <Heading ref={ref} as="h1" level="h1" {...props} />);
H1.displayName = "H1";

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => <Heading ref={ref} as="h2" level="h2" {...props} />);
H2.displayName = "H2";

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => <Heading ref={ref} as="h3" level="h3" {...props} />);
H3.displayName = "H3";

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => <Heading ref={ref} as="h4" level="h4" {...props} />);
H4.displayName = "H4";

export const H5 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => <Heading ref={ref} as="h5" level="h5" {...props} />);
H5.displayName = "H5";

export const H6 = React.forwardRef<
  HTMLHeadingElement,
  Omit<HeadingProps, "as" | "level">
>((props, ref) => <Heading ref={ref} as="h6" level="h6" {...props} />);
H6.displayName = "H6";
