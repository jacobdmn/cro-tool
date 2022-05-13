import { gql, request } from 'graphql-request'

const GraphCMS_API = process.env.REACT_APP_GRAPHCMS_CONTENT_API as string

export const getResult = async (slug: string) => {
  const query = gql`
    query getResult($slug: String!) {
      answers(where: { slug: $slug }, stage: DRAFT) {
        id
        answers
        score
        title
      }
    }
  `
  const result = await request(GraphCMS_API, query, { slug })
  return result.answers
}

export const getAllAnswers = async () => {
  const query = gql`
    query MyQuery {
      answers(stage: DRAFT) {
        slug
      }
    }
  `
  const result = await request(GraphCMS_API, query)
  return result.answers
}
