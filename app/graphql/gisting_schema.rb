require 'graphql/batch'
require 'record_loader'
require 'association_loader'

class GistingSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  use(GraphQL::Batch)
end
