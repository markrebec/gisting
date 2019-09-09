module Types
  class GistType < BaseObject
    description "A gist"
    field :id, ID, null: false
    field :privacy, String, null: false
    field :description, String, null: true
    field :blobs, [Types::BlobType], null: true
    field :user, Types::UserType, null: false
    field :created_at, String, null: true
    field :updated_at, String, null: true

    def description
      object.description || object.blobs.first.try(:filename)
    end
  end
end
