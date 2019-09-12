require 'graphql/batch'

class GistingSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  use(GraphQL::Batch)
end
