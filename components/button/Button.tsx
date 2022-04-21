import React from 'react'

interface ButtonProps {
  className: string
  text: string
}

const Button: React.FC<ButtonProps> = ({ className, text }) => {
  return (
    <button className={`rounded bg-btn_color py-2 px-4 ${className}`}>
      {text}
    </button>
  )
}
export default Button
