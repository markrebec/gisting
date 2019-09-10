module Types
  class Blob < BaseObject
    description "A file blob"
    field :id, ID, null: false
    field :filename, String, null: true
    field :body, String, null: true
    field :gist, Types::Gist, null: false
    field :created_at, String, null: true
    field :updated_at, String, null: true
    field :audits, [Types::Audit], null: false
    field :audit_count, Integer, null: false

    def audit_count
      object.audits.count
    end

    def created_at
      object.created_at.iso8601
    end

    def updated_at
      object.updated_at.iso8601
    end
  end
end
