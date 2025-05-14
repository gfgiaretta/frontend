import React, {
  ComponentProps,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'

interface InputProps extends ComponentProps<'input'> {
  type?: 'text' | 'email' | 'password' | 'number'
  variant?: 'default' | 'outlined'
  placeholder?: string
  helperText?: string
  disabled?: boolean
  className?: string
}

const BaseInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    type = 'text',
    variant = 'default',
    placeholder,
    helperText,
    disabled,
    className,
    ...props
  },
  ref,
) => {
  const baseStyles = `
    font-sfPro
    rounded-md
    w-full
  `

  const variantStyles: Record<NonNullable<InputProps['variant']>, string> = {
    default:
      'bg-grey-2 text-grey-1 border-2 border-grey-2 focus:outline-none focus:border-grey-1',
    outlined:
      'bg-background text-primary border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
  }

  return (
    <div className="w-full max-w-2xl">
      <input
        type={type}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${className} p-2 py-3`}
        {...props}
      />
      {helperText && (
        <span className="text-xs text-red-500 mt-1">{helperText}</span>
      )}
    </div>
  )
}
export const Input = forwardRef(BaseInput)
