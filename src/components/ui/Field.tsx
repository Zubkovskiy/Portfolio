import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { AlertCircle } from 'lucide-react';
import { cx } from '@/lib/utils';
import styles from './Field.module.css';

type BaseProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

function FieldShell({
  label,
  hint,
  error,
  className,
  controlId,
  hintId,
  errorId,
  required,
  children,
}: BaseProps & {
  controlId: string;
  hintId?: string;
  errorId?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cx(styles.field, className)}>
      <label className={styles.label} htmlFor={controlId}>
        {label}
        {required ? <span className={styles.required}> *</span> : null}
      </label>

      {children}

      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          <AlertCircle className={styles.errorMark} size={13} aria-hidden="true" />
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export type InputProps = BaseProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export function Input({ label, hint, error, className, id, required, ...rest }: InputProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      className={className}
      controlId={controlId}
      hintId={hintId}
      errorId={errorId}
      required={required}
    >
      <input
        id={controlId}
        className={styles.control}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId ?? hintId}
        {...rest}
      />
    </FieldShell>
  );
}

export type TextareaProps = BaseProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  required,
  rows = 5,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      className={className}
      controlId={controlId}
      hintId={hintId}
      errorId={errorId}
      required={required}
    >
      <textarea
        id={controlId}
        rows={rows}
        className={styles.control}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId ?? hintId}
        {...rest}
      />
    </FieldShell>
  );
}
