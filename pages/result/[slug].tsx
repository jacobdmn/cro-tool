import React from 'react'
import { useRouter } from 'next/router'
import ResultPage from '../../components/result/ResultPage'
import Loader from './../../components/Loader';

import { getResult, getAllAnswers } from './../../services/result'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'

interface AnswersResultPageProps {

}

const AnswersResultPage: React.FC<AnswersResultPageProps> = ({result}:any) => {
   const router = useRouter()
   if (router.isFallback) {
     return <Loader />
   }

    const answersArr = JSON.parse(result[0].answers)
        return <ResultPage answers={answersArr} score={result[0].score} />
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
  const answers: any = await getAllAnswers() || [] 
  return {
    paths: answers.map((answer:any) => ({
      params: {
        slug: answer.slug,
      },
    })),
    fallback: true,
  };
}
