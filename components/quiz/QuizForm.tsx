import React from 'react'
import * as yup from 'yup'

const styles = {
  formContainer:
    'bg-white rounded-lg shadow-lg shadow-black/10 w-full flex items-center py-5 px-12 text-black justify-between',
  formNumber:
    'w-8 h-8 grid place-content-center rounded-full border border-btn_color text-rc_green text-lg p-2',
  formText: 'font-medium w-[60%] flex-none mb-0',
  radio_label: 'text-xs text-gray-500',
}
interface QuizFormProps {
  option: string
  index: number
  questionIndex: number
  answers: any
  setAnswers: React.Dispatch<React.SetStateAction<any>>
}
const QuizForm: React.FC<QuizFormProps> = ({
  option,
  index,
  questionIndex,
  setAnswers,
}) => {
  const onChangeValue = (event: any) => {
    console.log(event.target.value)
  }
  return (
    <div className={styles.formContainer}>
      <span className={styles.formNumber}>{index + 1}</span>
      <p className={styles.formText}>{option}</p>
      <div className="flex items-center gap-6" onChange={onChangeValue}>
        <div className="grid place-content-center">
          <label htmlFor="yes" className={styles.radio_label}>
            YES
          </label>
          <input
            id={`yes${index}`}
            name={`radio_btn_${index}`}
            type="radio"
            value={`yes_${questionIndex}_${index + 1}`}
            required
          />
        </div>
        <div className="grid place-content-center">
          <label htmlFor="no" className={styles.radio_label}>
            NO
          </label>
          <input
            id={`no${index}`}
            name={`radio_btn_${index}`}
            type="radio"
            value={`no_${questionIndex}_${index + 1}`}
            required
          />
        </div>
      </div>
    </div>
  )
}
export default QuizForm
