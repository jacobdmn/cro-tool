import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import QuizForm from '../components/quiz/QuizForm'
import ProgressCircle from '../components/progress circle/ProgressCircle'
import Button from '../components/button/Button'
import Footer from '../components/footer/Footer'

import rc_logo from '../assets/images/rc_logo.png'
import CroData from '../utils/croData'

const styles = {
  quizpage_header: 'quizpage_header pb-20 pt-8 flex flex-col items-center h-72',
  header_title: 'w-[80%] text-center text-2xl font-semibold text-white mb-0',
}

const QuizPage: React.FC<any> = ({ data }) => {
  const length = data[0]?.questions.length

  const [questionIndex, setQuestionIndex] = useState<number>(1)
  const [eachPageQuestions, setEachPageQuestions] = useState<any>({
    questionTitle: data[0].questions[0].questionTitle,
    options: data[0].questions[0].options,
  })

  useEffect(() => {
    const singlePageData = data[0]?.questions.filter(
      (data: any, index: any) => index + 1 === questionIndex
    )
    const [desData] = singlePageData //destructuring
    setEachPageQuestions(desData)
  }, [questionIndex])

  const handleNextBtn = () => {
    if (questionIndex >= length) {
      setQuestionIndex(length)
    } else {
      setQuestionIndex((prevIndex) => (prevIndex += 1))
    }
  }

  return (
    <div className="min-h-screen bg-quizpage_bg text-white">
      <header className={styles.quizpage_header}>
        <Image height={30} width={102} src={rc_logo} className="object-cover" />
        <p className="mb-2 mt-6 font-medium">Audit your landing page</p>
        <h1 className={styles.header_title}>
          {eachPageQuestions.questionTitle}
        </h1>
      </header>
      <div className="relative flex flex-col items-center justify-center pb-20">
        <ProgressCircle percent={Math.floor((100 * questionIndex) / length)} />
        <div className="flex w-[70%] flex-col items-center justify-center gap-4 py-10">
          {eachPageQuestions.options.map((option: string, index: number) => (
            <QuizForm key={index} option={option} index={index} />
          ))}
        </div>
        <Button
          text={
            !(questionIndex >= length)
              ? `${questionIndex + '/' + length} - Next`
              : 'Submit'
          }
          onClick={handleNextBtn}
        />
      </div>
      <Footer />
    </div>
  )
}
export default QuizPage

// Fetch guide at build time
export async function getStaticProps({ params }: any) {
  const data = CroData.filter((pageData) => params.slug === pageData.id)
  return {
    props: { data },
    revalidate: 10,
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  return {
    paths: CroData.map((pageData) => ({
      params: {
        slug: pageData.id,
      },
    })),
    fallback: true,
  }
}
