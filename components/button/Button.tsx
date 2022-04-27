import React from 'react'
import Button   from '@mui/material/Button'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

interface ButtonProps {
  className?: string
  text: string
  type?: ButtonType
  disabled?: boolean
  onClick?: () => void
}

const CroButton: React.FC<ButtonProps> = ({
  className,
  text,
  type,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      type={type}
      className={`rounded bg-btn_color py-2 px-8 hover:bg-btn_color shadow-none hover:shadow-none disabled:bg-btn_color/30 disabled:text-white ${className}`}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}
export default CroButton
