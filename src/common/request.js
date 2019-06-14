import { GraphQLClient } from 'graphql-request'
const endpoint = 'http://47.244.97.208:8080/query'

let gql = async (param, variables) => {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {},
    mode: 'cors'
  })
  let data = await graphQLClient
    .request(param, variables)
    .then(res => {
      return res
    })
    .catch(err => {
      return err.response
    })
  return data
}

export { gql }
