module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :gists, [Types::Gist], null: false do
      description "List all public gists"
      argument :offset, Integer, required: false, default_value: 0
      argument :limit, Integer, required: false, default_value: 25, prepare: ->(limit, ctx) { [limit, 100].min }
    end

    def gists(offset:, limit:)
      ::Gist.listed.offset(offset).limit(limit)
    end

    field :gist, Types::Gist, null: false do
      description "Find a gist by ID"
      argument :id, ID, required: true
    end

    def gist(id:)
      ::Gist.find(id)
    end

    field :me, Types::User, null: true do
      description "Return the authenticated user"
    end

    def me
      context[:current_user]
    end
  end
end
