import React from 'react'
type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface ButtonProps {
  className?: string
  text: string
  type?: ButtonType
  disabled?: boolean
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  className,
  text,
  type,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded bg-btn_color py-2 px-8 disabled:bg-btn_color/30 ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
export default Button
