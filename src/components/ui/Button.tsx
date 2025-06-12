import React, {
  ComponentProps,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react'

interface ButtonProps extends Omit<ComponentProps<'button'>, 'ref'> {
  className?: string
  children: ReactNode
  variant?: 'filled' | 'outlined' | 'negative' | 'post'
  size?: 'sm' | 'md' | 'lg'
}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { onClick, variant = 'filled', size = 'md', children, className },
  ref,
) => {
  const baseStyles = `
    rounded-full
    leading-none
    font-sfPro
    text-center
    flex items-center justify-center
    cursor-pointer
  `

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    filled: 'bg-primary text-background border-2 border-primary',
    outlined: 'bg-background text-primary border-2 border-primary',
    negative: 'bg-grey-1 text-background border-2 border-grey-1',
    post: 'bg-secondary text-background border-2 border-secondary',
  }

  const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-lg',
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  )
}
export const Button = forwardRef(BaseButton)
