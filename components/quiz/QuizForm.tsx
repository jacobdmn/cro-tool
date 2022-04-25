import { useState, useEffect } from 'react'
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
  answers,
}) => {
  const [state, setState] = useState('')
  useEffect(() => {
    setState('')
  }, [questionIndex])
  return (
    <div className={styles.formContainer}>
      <span className={styles.formNumber}>{index}</span>
      <p className={styles.formText}>{option}</p>
      <div className="flex items-center gap-6">
        <div className="grid place-content-center">
          <label htmlFor={`yes${index}`} className={styles.radio_label}>
            YES
          </label>
          <input
            id={`yes${index}`}
            name={`radio_btn_${index}`}
            type="radio"
            value={answers['answer' + index + questionIndex]}
            onChange={(e) => {
              setAnswers({
                ...answers,
                ['answer' + index + questionIndex]: 'yes',
              })
              setState('yes')
            }}
            checked={state === 'yes'}
          />
        </div>
        <div className="grid place-content-center">
          <label htmlFor={`no${index}`} className={styles.radio_label}>
            NO
          </label>
          <input
            id={`no${index}`}
            name={`radio_btn_${index}`}
            type="radio"
            value={answers['answer' + index + questionIndex]}
            onChange={(e) => {
              setAnswers({
                ...answers,
                ['answer' + index + questionIndex]: 'no',
              })
              setState('no')
            }}
            checked={state === 'no'}
          />
        </div>
      </div>
    </div>
  )
}
export default QuizForm
