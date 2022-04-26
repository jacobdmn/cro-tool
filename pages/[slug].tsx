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

import rc_logo from '../assets/images/rc_logo.png'
import CroData from '../utils/croData'

const styles = {
  quizpage_header: 'quizpage_header pb-20 pt-8 flex flex-col items-center h-72',
  header_title: 'w-[80%] text-center text-2xl font-semibold text-white mb-0',
}

const QuizPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }
  const questionsLength = data[0]?.questions.length

  const [questionIndex, setQuestionIndex] = useState<number>(1)
  const [eachPageQuestions, setEachPageQuestions] = useState<any>({
    questionTitle: data[0].questions[0].questionTitle,
    options: data[0].questions[0].options,
  })
  const [showResult, setShowResult] = useState<boolean>(false)
  const [answers, setAnswers] = useState<
    { options: { answer: string; option: string }[]; questionTitle: string }[]
  >([])

  useEffect(() => {
    setAnswers(
      data[0].questions.map((question: any, index: number) => ({
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
    const singlePageData = data[0]?.questions.filter(
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
        <Image height={30} width={102} src={rc_logo} className="object-cover" />
        <p className="mb-2 mt-6 font-medium">Audit your {data[0]?.title}</p>
        <h1 className={styles.header_title}>
          {showResult
            ? 'Your ' + data[0]?.title + ' Audit Results '
            : eachPageQuestions.questionTitle}
        </h1>
      </header>
      {showResult ? (
        <div className="relative flex flex-col items-center justify-center pb-20">
          <ProgressCircle
            className="absolute -top-24 bg-quizpage_bg p-2"
            percent={Math.floor(calculateScore())}
          />
          <div className="mx-auto py-10">
            <ResultPage
              score={calculateScore()}
              answers={answers}
            />
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
      <Footer />
    </div>
  )
}
export default QuizPage

// Fetch guide at build time
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const data: QuizType[] = CroData.filter(
    (pageData) => params.slug === pageData.id
  )
  return {
    props: { data },
    revalidate: 10,
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: CroData.map((pageData) => ({
      params: {
        slug: pageData.id,
      },
    })),
    fallback: true,
  }
}
