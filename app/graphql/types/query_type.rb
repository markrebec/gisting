module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :gists, [Types::GistType], null: false,
      description: "List all public gists"

    def gists
      Gist.listed
    end

    field :me, Types::UserType, null: true do
      description "Return the authenticated user"
    end

    def me
      context[:current_user]
    end
  end
end
