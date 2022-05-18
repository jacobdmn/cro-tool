import { gql, request } from 'graphql-request'

import { GRAPHCMS_CONTENT_API } from '../env'

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
  const result = await request(GRAPHCMS_CONTENT_API, query, { slug })
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
  const result = await request(GRAPHCMS_CONTENT_API, query)
  return result.answers
}
