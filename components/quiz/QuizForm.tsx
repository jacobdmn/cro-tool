import { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio'

import { Setter } from '../../types/Setter'

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'

import { Button } from '@mui/material'

const useStyles:any = makeStyles({
  container: {
    width: '100%',
  },
  questionWrapper: {
    width: '100%',
    position: 'relative',
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0px 0px 8px 8px rgba(0,0,0,0.04)',
    padding: '30px 15px',
    borderRadius: '10px',
  },
  questionBody: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  formControl: {
    width: '100%',
    display: 'flex !important',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formLabel: {
    display: 'inline-flex',
    textAlign: 'start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  index: {
    width: '15px !important',
    height: '15px !important',
    padding: '15px',
    border: '1px solid #CD1C6C',
    borderRadius: '50%',
    textAlign: 'center',
    marginInlineEnd: '30px',
    lineHeight: '1em !important',
    display: 'grid',
    placeContent: 'center',
  },
  labelText: {
    display: 'inline-block',
    width: 'fit-content',
    textAlign: 'left',
    color: '#333',
    fontSize: '1.1rem',
    lineHeight: '1.8',
  },
  radioGroup: {
    display: 'flex !important',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: 'fit-content',
  },
  controlWrapper: {
    display: 'inline-block',
    marginInlineStart: '15px',
  },
  label: {
    display: 'block',
    width: 'fit-content',
    margin: '0',
    paddingInlineStart: '.5em',
    color: '#333',
  },
  radio: {
    // color: '#CD1C6C !important',
  },
  exampleWrapper: {
    marginTop: '20px',
  },
  addIcon: {
    transform: 'none !important',
  },
  example: {
    position: 'relative',
    margin: 'auto',
    display: 'flex !important',
    justifyContent: 'space-around',
    textAlign: 'center',
    boxShadow: '0px 0px 8px 8px rgba(0,0,0,0.04)',
    padding: '10px 15px',
    borderRadius: '10px',
  },
  accordionWrapper: {
    display: 'flex',
    margin: 'auto',
    width: '91%',
  },
  accordion: {
    boxShadow: 'none !important',
  },
  questionIcon: {
    color: '#32CCA7',
    fontSize: '16px !important',
  },
  accordionText: {
    textAlign: 'start',
    color: '#CD1C6C',
    fontSize: '16px',
    fontWeight: 'bold !important',
    lineHeight: '3em !important',
  },
  exampleImg: {
    width: '100%',
  },
})

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
    let questionWithAnswer = { ...answers[questionIndex - 1] }
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

  const classes = useStyles()

  console.log(checkedState)
  return (
    <div className={classes.container}>
      <div className={classes.questionWrapper}>
        <div className={classes.questionBody}>
          <FormControl className={classes.formControl}>
            <FormLabel className={classes.formLabel}>
              <span className={classes.index}>{index}</span>
              <p className={classes.labelText} style={{fontWeight:"400"}}>{option}</p>
            </FormLabel>
            <RadioGroup className={classes.radioGroup}>
              <div className={classes.controlWrapper}>
                <p className={classes.label}>Yes</p>
                <Radio
                  className={classes.radio}
                  // control={<Radio />}
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
              <div className={classes.controlWrapper}>
                <p className={classes.label}>No</p>
                <Radio
                  className={classes.radio}
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
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  )
}
export default QuizForm
