import { useState } from 'react'
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
  header_title: 'w-[30rem] text-center text-2xl font-semibold text-white mb-0',
}

interface QuizPageProps {}

const QuizPage: React.FC<QuizPageProps> = ({}) => {
  const router = useRouter()
  // filtering data for each page
  const data = CroData.filter((pageData) => router.query.slug === pageData.id)
  const length = data[0]?.questions.length

  const [questionIndex, setQuestionIndex] = useState<number>(1)

  const handleNextBtn = () => {
    if (questionIndex >= length) {
      setQuestionIndex(length)
    } else {
      setQuestionIndex((prevIndex) => (prevIndex += 1))
    }
  }

  console.log(length)
  console.log(questionIndex)

  return (
    <div className="min-h-screen bg-quizpage_bg text-white">
      <header className={styles.quizpage_header}>
        <Image height={30} width={102} src={rc_logo} className="object-cover" />
        <p className="mb-2 mt-6 font-medium">Audit your landing page</p>
        <h1 className={styles.header_title}>
          Is your page structured to address the following 7 key elements?
        </h1>
      </header>
      <div className="relative flex flex-col items-center justify-center pb-20">
        <ProgressCircle percent={50} />
        <div className="flex w-[70%] flex-col items-center justify-center gap-4 py-10">
          <QuizForm />
          <QuizForm />
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
