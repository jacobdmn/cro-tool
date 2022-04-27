import { useState, useEffect } from 'react'
import QuizForm from './QuizForm'
import Button from '../button/Button'
import ProgressCircle from '../progress circle/ProgressCircle'
import { Setter } from '../../types/Setter'
import Example from '../Example'

interface QuizProps {
  questionsLength: number
  answers: any[]
  setAnswers: Setter<any[]>
  questionIndex: number
  setQuestionIndex: Setter<number>
  setShowResult: Setter<boolean>
  eachPageQuestions: {
    questionTitle: string
    options: string[]
    example?: { title: string; content: string }
  }
}

const Quiz: React.FC<QuizProps> = ({
  eachPageQuestions,
  setShowResult,
  setQuestionIndex,
  questionsLength,
  questionIndex,
  setAnswers,
  answers,
}) => {
  const [isDisabled, setIsDisabled] = useState(true) // state for Next Button (active or disabled)
  const [options, setOptions] = useState<{ isChecked: boolean }[]>([]) //this state is for options of each question (needed for input validation)

  const optionsCheckedStatus = options.map((option: any) => option.isChecked) //getting input isChecked values

  //for initializing options state
  useEffect(() => {
    setOptions(
      eachPageQuestions.options.map((option: string, index: number) => ({
        isChecked: false,
      }))
    )
  }, [eachPageQuestions])

  // for disabling next button
  useEffect(() => {
    if (optionsCheckedStatus.includes(false)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [options])

  const handleNextBtn = () => {
    if (optionsCheckedStatus.includes(false)) {
      return ''
    } else if (questionIndex >= questionsLength) {
      setShowResult(true)
    } else {
      setQuestionIndex((prevIndex: any) => (prevIndex += 1))
    }
  }
  return (
    <div className="relative flex flex-col items-center justify-center pb-20">
      <ProgressCircle
        className="absolute -top-24 bg-quizpage_bg p-2 "
        percent={Math.floor((100 * questionIndex) / questionsLength)}
      />
      <div className="flex w-[70%] flex-col items-center justify-center gap-4 py-16">
        <span></span>
        {eachPageQuestions.options.map((option: string, index: number) => (
          <QuizForm
            key={index}
            option={option}
            index={index + 1}
            answers={answers}
            setAnswers={setAnswers}
            questionIndex={questionIndex}
            options={options}
            setOptions={setOptions}
          />
        ))}
        {eachPageQuestions.example && (
          <Example title={eachPageQuestions.example.title} content={eachPageQuestions.example.content} isResult={false} type="no" />
        )}
        <Button
          className="mt-8"
          type="submit"
          text={
            !(questionIndex >= questionsLength)
              ? `${questionIndex + '/' + questionsLength} - Next`
              : 'Submit'
          }
          onClick={handleNextBtn}
          disabled={isDisabled ? true : false}
        />
      </div>
    </div>
  )
}
export default Quiz
