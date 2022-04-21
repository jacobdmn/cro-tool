import { useRouter } from 'next/router'
import Image from 'next/image'

import rc_logo from '../assets/images/rc_logo.png'

const styles = {
  quizpage_header:
    'quizpage_header pt-12 pb-28 flex flex-col items-center justify-center',
}

interface QuizPageProps {}

const QuizPage: React.FC<QuizPageProps> = ({}) => {
  const router = useRouter()
  console.log(router)
  return (
    <div className="min-h-screen bg-quizpage_bg text-white">
      <header className={styles.quizpage_header}>
        <Image height={50} width={172} src={rc_logo} className="object-cover" />
        <p className="mb-4 mt-8 font-medium">Audit your landing page</p>
        <h1 className="w-[40rem] text-center text-3xl font-semibold">
          Is your page structured to address the following 7 key elements?
        </h1>
      </header>
    </div>
  )
}
export default QuizPage
