module Types
  class UserType < BaseObject
    description "A user"

    # TODO in the real world, we'd put a little more effort into only
    # exposing things like email when a user is authenticated as themselves
    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: false
    field :gists, [Types::GistType], null: true
  end
end
