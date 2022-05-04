import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ProgressCircle from '../components/progress circle/ProgressCircle'
import Footer from '../components/footer/Footer'
import ResultPage from '../components/result/ResultPage'
import Quiz from '../components/quiz/Quiz'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import { QuizType } from '../types/QuizType'
import Loader from '../components/Loader'
import { getQuizDetails, getQuizzes } from './../services/quiz'

import rc_logo from '../assets/images/rc_logo.png'
import CroData from '../utils/croData'

const styles = {
  quizpage_header:
    'quizpage_header pb-20 pt-8 flex flex-col gap-10 items-center justify-center h-96',
  header_title: ' text-center text-3xl font-semibold text-white mb-0',
}

const QuizPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  quiz,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }
  const questionsLength = quiz?.questions.length

  const [questionIndex, setQuestionIndex] = useState<number>(1)
  const [eachPageQuestions, setEachPageQuestions] = useState<any>({
    questionTitle: quiz.questions[0].questionTitle,
    options: quiz.questions[0].options,
  })
  const [showResult, setShowResult] = useState<boolean>(false)
  const [answers, setAnswers] = useState<
    { options: { answer: string; option: string }[]; questionTitle: string }[]
  >([])

  useEffect(() => {
    setAnswers(
      quiz.questions.map((question: any, index: number) => ({
        questionTitle: question.questionTitle,
        options: question.options.map((option: any) => ({
          option: option,
          answer: '',
        })),
      }))
    )
  }, [])

  //for setting each page question
  useEffect(() => {
    const singlePageData = quiz?.questions.filter(
      (data: any, index: any) => index + 1 === questionIndex
    )
    const [desData] = singlePageData //destructuring
    setEachPageQuestions(desData)
  }, [questionIndex])

  const calculateScore = () => {
    const justUserAnswers = answers.flatMap((answer) => {
      return answer.options.map((optionAnswer) => optionAnswer.answer)
    })
    const correctAnswers = justUserAnswers.filter((answer) => answer === 'yes')
    const result = (100 * correctAnswers.length) / justUserAnswers.length
    return result
  }

  return (
    <div className="min-h-screen bg-quizpage_bg text-white">
      <header className={styles.quizpage_header}>
        <Image height={50} width={172} src={rc_logo} className="object-cover" />
        <h1 className={styles.header_title}>
          {showResult
            ? 'Your ' + quiz?.title + ' Audit Results '
            : 'Audit your ' + quiz?.title}
        </h1>
      </header>
      {showResult ? (
        <div className="relative flex flex-col items-center justify-center pb-20">
          <ProgressCircle
            className="absolute -top-24 bg-quizpage_bg p-2 text-black"
            percent={Math.floor(calculateScore())}
            score={calculateScore()}
          />
          <div className="mx-auto py-10">
            <ResultPage score={calculateScore()} answers={answers} />
          </div>
        </div>
      ) : (
        <Quiz
          questionsLength={questionsLength}
          answers={answers}
          setAnswers={setAnswers}
          questionIndex={questionIndex}
          setQuestionIndex={setQuestionIndex}
          setShowResult={setShowResult}
          eachPageQuestions={eachPageQuestions}
        />
      )}
      <Footer showResult={showResult} />
    </div>
  )
}
export default QuizPage

// Fetch guide at build time
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const quiz = await getQuizDetails(params.slug)
  return {
    props: { quiz },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const quizzes: any = (await getQuizzes()) || []
  return {
    paths: quizzes.map((quiz: any) => ({
      params: {
        slug: quiz.quizId,
      },
    })),
    fallback: true,
  }
}
