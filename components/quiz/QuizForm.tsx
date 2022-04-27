import { useState, useEffect } from 'react'
import Radio from "@mui/material/Radio";

import { Setter } from '../../types/Setter'

const styles = {
  formContainer:
    ' rounded-lg shadow-lg bg-white shadow-black/10 w-full flex items-center py-7 px-8 text-black justify-between',
  formNumber:
    'w-8 h-8 grid place-content-center rounded-full border border-btn_color text-rc_green text-lg p-2',
  formText: 'font-semibold w-[70%] flex-none mb-0',
  radio_label: 'text-xs text-gray-500 mb-1 text-center',
  // radioBtn: 'w-5 h-5 cursor-pointer ',
}

interface QuizFormProps {
  option: string
  index: number
  questionIndex: number
  answers: any
  setAnswers: Setter<any>
  options: any
  setOptions: Setter<{ isChecked: boolean }[]>
}
const QuizForm: React.FC<QuizFormProps> = ({
  option,
  index,
  questionIndex,
  options,
  setOptions,
  setAnswers,
  answers,
}) => {
  const [checkedState, setCheckedState] = useState('')

  useEffect(() => {
    setCheckedState('')
  }, [questionIndex])

  const handleOnChange = (inputType: string) => {
    setCheckedState(inputType)

    // logic for asnwers array
    // 1. Make a shallow copy of the options
    let questionsWithAnswers = [...answers]
    // 2. Make a shallow copy of the item to mutate
    let questionWithAnswer = { ...answers[questionIndex-1] }
    // 3. Replace the property
    questionWithAnswer.options[index - 1].answer = inputType
    // 4. Put it back into our array. N.B. we are mutating the array here, but that's why we made a copy first
    questionsWithAnswers[questionIndex - 1] = questionWithAnswer
    // 5. Set the state to our new copy
    setAnswers(questionsWithAnswers)

    // logic for validation
    // 1. Make a shallow copy of the options
    let items = [...options]
    // 2. Make a shallow copy of the item to mutate
    let item = { ...options[index - 1] }
    // 3. Replace the property
    item.isChecked = true
    // 4. Put it back into our array. N.B. we are mutating the array here, but that's why we made a copy first
    items[index - 1] = item
    // 5. Set the state to our new copy
    setOptions(items)
  }

  console.log(checkedState)
  return (
    <div className={styles.formContainer}>
      <span className={styles.formNumber}>{index}</span>
      <p className={styles.formText}>{option}</p>
      <div className="flex items-center gap-2">
        <div className="grid place-content-center">
          <p className={styles.radio_label}>YES</p>
          <Radio
            id={`yes${index}`}
            name={`radio_btn_${index}`}
            value={answers['answer' + index + questionIndex]}
            // onChange={() => handleOnChange('yes')}
            onClick={() => handleOnChange('yes')}
            checked={checkedState === 'yes'}
            sx={{
              color: '#32CCA7',
              '&.Mui-checked': {
                color: '#32CCA7',
              },
            }}
          />
        </div>
        <div className="grid place-content-center">
          <p className={styles.radio_label}>NO</p>
          <Radio
            id={`no${index}`}
            name={`radio_btn_${index}`}
            value={answers['answer' + index + questionIndex]}
            // onChange={() => handleOnChange('no')}
            onClick={() => handleOnChange('no')}
            checked={checkedState === 'no'}
            sx={{
              color: '#CD1C6C',
              '&.Mui-checked': {
                color: '#CD1C6C',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default QuizForm
