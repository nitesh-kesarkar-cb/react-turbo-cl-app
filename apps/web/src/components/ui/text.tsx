import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
      success: "text-green-600 dark:text-green-500",
      warning: "text-yellow-600 dark:text-yellow-500",
    },
    leading: {
      snug: "leading-5",
      normal: "leading-6",
      relaxed: "leading-7",
    },
  },
  // Defaults match your repeated <p class="text-sm text-muted-foreground">
  defaultVariants: {
    size: "sm",
    tone: "muted",
    leading: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  /** Render a different element (e.g., span/div) while keeping styles */
  asChild?: boolean;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, tone, leading, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, tone, leading }), className)}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";
