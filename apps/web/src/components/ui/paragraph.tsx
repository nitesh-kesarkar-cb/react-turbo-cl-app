import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("leading-7 [&:not(:first-child)]:mt-6", {
  variants: {
    size: {
      sm: "text-sm leading-6",
      base: "text-base leading-7",
      lead: "text-xl leading-8",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    tone: "default",
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  /** Render as a different element (e.g., span/div) while keeping styles */
  asChild?: boolean;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, tone, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        ref={ref}
        className={cn(paragraphVariants({ size, tone }), className)}
        {...props}
      />
    );
  }
);
Paragraph.displayName = "Paragraph";
