import { GraphQLClient } from 'graphql-request'
const endpoint = 'https://assets.yuhu.tech/query'

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
