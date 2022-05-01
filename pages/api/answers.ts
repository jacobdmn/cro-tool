import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.REACT_APP_GRAPHCMS_CONTENT_API as string
const graphcmsToken = process.env.REACT_APP_GRAPHCMS_PUBLIC_TOKEN as string

export default async function quizAnswers(req:any, res:any) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  })

  const query = gql`
    mutation createAnswer($answers: Json, $email: String!, $slug: String!) {
      createAnswer(data: { answers: $answers, email: $email, slug: $slug }) {
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
