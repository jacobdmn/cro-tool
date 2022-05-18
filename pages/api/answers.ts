import { GraphQLClient, gql } from 'graphql-request'
import { GRAPHCMS_PUBLIC_TOKEN, GRAPHCMS_CONTENT_API } from '../../env'

export default async function quizAnswers(req: any, res: any) {
  const graphQLClient = new GraphQLClient(GRAPHCMS_CONTENT_API, {
    headers: {
      authorization: `Bearer ${GRAPHCMS_PUBLIC_TOKEN}`,
    },
  })

  const query = gql`
    mutation createAnswer(
      $answers: Json
      $email: String!
      $slug: String!
      $score: Float!
      $title: String!
    ) {
      createAnswer(
        data: {
          answers: $answers
          email: $email
          slug: $slug
          score: $score
          title: $title
        }
      ) {
        id
      }
    }
  `
  try {
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
