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

    def gists
      AssociationLoader.for(::User, :gists).load(object).then do |results|
        results = results.select(&:listed?) unless context[:current_user] == object
        results = results.sort_by(&:created_at).reverse
        results
      end
    end
  end
end
