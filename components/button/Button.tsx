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
      sx={{
        backgroundColor: '#CD1C6C !important',
        boxShadow: 'none !important',
        height: '2.8em',
        // '.Mui-disabled': { opacity: 0.2, backgroundColor :"pink"},
      }}
      variant="contained"
      onClick={onClick}
      type={type}
      className={`rounded bg-btn_color py-2 px-8 shadow-none hover:bg-btn_color hover:shadow-none disabled:text-white disabled:opacity-50 ${className}`}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}
export default CroButton
