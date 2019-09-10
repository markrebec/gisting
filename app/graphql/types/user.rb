module Types
  class User < BaseObject
    description "A user"

    field :id, ID, null: false
    field :username, String, null: false
    field :email, String, null: true
    field :gists, [Types::Gist], null: true

    def email
      # TODO this is dirty, in the real world we'd be better about real
      # authentication, authorization and scoping
      context[:current_user] == object ? object.email : nil
    end
  end
end
