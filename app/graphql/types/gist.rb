module Types
  class Gist < BaseObject
    description "A gist"
    field :id, ID, null: false
    field :privacy, String, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :user, Types::User, null: false
    field :created_at, String, null: true
    field :updated_at, String, null: true
    field :is_owner, Boolean, null: false
    field :audits, [Types::Audit], null: false
    field :audit_count, Integer, null: false
    field :blob_count, Integer, null: false

    field :blob, Types::Blob, null: true do
      argument :id, ID, required: true
    end

    field :blobs, [Types::Blob], null: true do
      argument :offset, Integer, required: false
      argument :limit, Integer, required: false
    end

    def title
      object.blobs.chronological.first.try(:filename) || object.description
    end

    def is_owner
      object.user == context[:current_user]
    end

    def audit_count
      object.own_and_associated_audits.count
    end

    def audits
      object.own_and_associated_audits
    end

    def blob_count
      object.blobs.count
    end

    def blob(id:)
      object.blobs.find(id)
    end

    def blobs(offset: nil, limit: nil)
      scope = object.blobs.chronological
      scope = scope.offset(offset) if offset
      scope = scope.limit(limit) if limit
      scope
    end

    def created_at
      object.created_at.iso8601
    end

    def updated_at
      object.updated_at.iso8601
    end
  end
end
