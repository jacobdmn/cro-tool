import { useRef } from 'react'
import { useRouter } from 'next/router'
import ResultPage from '../../components/result/ResultPage'
import Loader from './../../components/Loader'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

import { getResult, getAllAnswers } from './../../services/result'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'

interface AnswersResultPageProps {}

const AnswersResultPage: React.FC<AnswersResultPageProps> = ({
  result,
}: any) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }
  const componentRef: any = useRef()

  const answersArr = JSON.parse(result[0].answers)
  return (
    <div className="bg-quizpage_bg" ref={componentRef}>
      <Head>
        <title>CRO Result</title>
      </Head>
      <Header showResult={true} title={result[0].title} />
      <ResultPage
        answers={answersArr}
        score={result[0].score}
        title={result[0].title}
        reff={componentRef}
      />
      <Footer showResult={true} />
    </div>
  )
}
export default AnswersResultPage

// Fetch guide at build time
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const result = await getResult(params.slug)
  return {
    props: { result },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const answers: any = (await getAllAnswers()) || []
  return {
    paths: answers.map((answer: any) => ({
      params: {
        slug: answer.slug,
      },
    })),
    fallback: true,
  }
}
