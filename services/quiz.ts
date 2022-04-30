import { gql, request } from 'graphql-request'

const GraphCMS_API = process.env.REACT_APP_GRAPHCMS_CONTENT_API as string

export const getQuizDetails = async (slug: string) => {
  const query = gql`
    query getQuizDetails($slug: String!) {
      quiz(where: { slug: $slug }) {
        id
        title
        quizId
        questions {
            questionTitle
            option
        }
      }
    }
  `
  const result = await request(GraphCMS_API, query, { slug })
  return result.quiz
}
