import React from 'react';
import { cn } from '../../utils/format';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold uppercase tracking-wider text-charcoal/80">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-mutedGray/60 transition-colors focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/10 min-h-[100px] resize-y disabled:bg-neutral-100 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/10',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-mutedGray">{helperText}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;

