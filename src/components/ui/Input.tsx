import React from 'react';
import { cn } from '../../utils/format';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-mutedGray flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-mutedGray/60 transition-colors focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/10 disabled:bg-neutral-100 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-mutedGray flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-mutedGray">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

