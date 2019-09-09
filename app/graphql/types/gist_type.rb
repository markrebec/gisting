module Types
  class GistType < BaseObject
    description "A gist"
    field :id, ID, null: false
    field :privacy, String, null: false
    field :description, String, null: true
    field :blobs, [Types::BlobType], null: true
    field :created_at, String, null: true
    field :updated_at, String, null: true
  end
end
