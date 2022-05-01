import { gql, request } from 'graphql-request'

const GraphCMS_API = process.env.REACT_APP_GRAPHCMS_CONTENT_API as string

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
        }
      }
    }
  `
  const result = await request(GraphCMS_API, query, { slug })
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
  const result = await request(GraphCMS_API, query)
  return result.quizzes
}

export const submitAnswer = async (object:any) => {
  const result = await fetch('/api/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  })

  return result.json()
}