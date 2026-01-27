import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, type = 'text', ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label htmlFor={id} className="pl-1 text-sm">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={clsx(
            'border-input bg-background rounded-none border',
            'h-12 w-full px-4 text-sm transition-all outline-none',
            'placeholder:text-muted-foreground placeholder:transition-opacity',
            'focus:ring-primary focus:ring-1 focus:placeholder:opacity-0',
            error ? 'border-error' : 'border-input',
            className,
          )}
          {...props}
        />
        {error && <span className="text-error pl-1 text-sm font-medium">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
