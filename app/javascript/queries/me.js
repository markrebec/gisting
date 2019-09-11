import { gql } from 'apollo-boost'

export default gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`
