import React from 'react'
type ButtonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
  className?: string
  text: string
  type?:ButtonType
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ className, text,type, onClick }) => {
  return (
    <button onClick={onClick} type={type} className={`rounded bg-btn_color py-2 px-8 ${className}`}>
      {text}
    </button>
  )
}
export default Button
