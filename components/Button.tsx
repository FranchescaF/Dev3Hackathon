import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'hero' | 'soft' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    
    // Mapeo de Variantes
    const variants = {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border-2 border-input bg-background hover:bg-slate-100 hover:text-slate-900",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
      link: "text-primary underline-offset-4 hover:underline",
      hero: "bg-primary text-primary-foreground shadow-lg hover:-translate-y-0.5 transition-all",
      soft: "bg-primary/10 text-primary hover:bg-primary/20",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    };

    // Mapeo de Tamaños
    const sizes = {
      default: "h-11 px-5 py-2 text-base",
      sm: "h-9 rounded-md px-3 text-sm",
      lg: "h-14 rounded-xl px-8 text-lg",
      xl: "h-16 rounded-2xl px-10 text-xl font-semibold",
      icon: "h-11 w-11",
    };

    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";