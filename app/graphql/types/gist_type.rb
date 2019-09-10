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

    field :blob, Types::BlobType, null: true do
      argument :id, ID, required: true
    end

    def blob(id:)
      object.blobs.find(id)
    end

    def description
      object.description || object.blobs.first.try(:filename)
    end
  end
end
