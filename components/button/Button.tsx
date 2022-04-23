import React from 'react'

interface ButtonProps {
  className?: string
  text: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ className, text, onClick }) => {
  return (
    <button onClick={onClick} className={`rounded bg-btn_color py-2 px-8 ${className}`}>
      {text}
    </button>
  )
}
export default Button
