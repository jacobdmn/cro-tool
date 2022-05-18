import { gql, request } from 'graphql-request'
import { GRAPHCMS_CONTENT_API } from '../env'

export const getQuizDetails = async (slug: string) => {
  const query = gql`
    query getQuizDetails($slug: String!) {
      quiz(where: { quizId: $slug }) {
        id
        title
        quizId
        questions {
          questionTitle
          options
          exampleText
          exampleImage {
            url
          }
        }
      }
    }
  `
  const result = await request(GRAPHCMS_CONTENT_API, query, { slug })
  return result.quiz
}

export const getQuizzes = async () => {
  const query = gql`
    query MyQuery {
      quizzes {
        quizId
      }
    }
  `
  const result = await request(GRAPHCMS_CONTENT_API, query)
  return result.quizzes
}

export const submitAnswer = async (object: any) => {
  const result = await fetch('/api/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })

  return result.json()
}
