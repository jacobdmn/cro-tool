import React from 'react'
import { getResult, getAllAnswers } from './../../services/result'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'

interface ResultPageProps {

}

const ResultPage: React.FC<ResultPageProps> = ({result}:any) => {
    const obj = JSON.parse(result[0].answers)
    console.log(obj)
        return (<div>salaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaam</div>);
}
export default ResultPage

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
