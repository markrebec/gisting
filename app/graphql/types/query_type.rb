module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :gists, [Types::GistType], null: false,
      description: "List all public gists"

    def gists
      Gist.listed
    end

    field :user, Types::UserType, null: false do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end
  end
end
