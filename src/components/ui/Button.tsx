import React, {
  ComponentProps,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react'

interface ButtonProps extends Omit<ComponentProps<'button'>, 'ref'> {
  children: ReactNode
  variant?: 'filled' | 'outlined' | 'negative' | 'post'
  size?: 'md' | 'lg'
}

const BaseButton: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { onClick, variant = 'filled', size = 'md', children },
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
    md: 'w-[7.75rem] h-[2.5rem] text-[0.875rem]', // 124px x 40px | 14px font
    lg: 'w-[12.4375rem] h-[2.5rem] text-[1rem]', // 199px x 40px | 16px font
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  )
}
export const Button = forwardRef(BaseButton)
