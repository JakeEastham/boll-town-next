import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-btfc-gold text-btfc-navy hover:bg-btfc-gold-light active:bg-btfc-gold-dark",
  secondary:
    "bg-btfc-navy text-white hover:bg-btfc-navy-light active:bg-btfc-navy-dark",
  outline:
    "border-2 border-btfc-gold text-btfc-gold hover:bg-btfc-gold hover:text-btfc-navy",
  ghost:
    "text-white hover:bg-white/10 active:bg-white/20",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      loading,
      fullWidth,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-display uppercase tracking-wider rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btfc-gold focus-visible:ring-offset-2 focus-visible:ring-offset-btfc-navy";

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      className
    );

    const content = (
      <>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
