module Types
  class Gist < BaseObject
    description "A gist"
    field :id, ID, null: false
    field :privacy, String, null: false
    field :title, String, null: false
    field :description, String, null: true
    field :owner, Types::User, null: false
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
      blobs.then { |results| results.first.try(:filename) || object.description }
    end

    def owner
      RecordLoader.for(::User).load(object.user_id)
    end

    def is_owner
      object.user_id == context[:current_user].try(:id)
    end

    def audit_count
      audits.then { |results| results.length }
    end

    def audits
      Promise.all([
        AssociationLoader.for(::Gist, :audits).load(object),
        AssociationLoader.for(::Gist, :associated_audits).load(object),
      ]).then do |results|
        results.reduce(&:+)
      end
    end

    def blob_count
      AssociationLoader.for(::Gist, :blobs).load(object).then { |results| results.length }
    end

    def blob(id:)
      RecordLoader.for(::Blob, where: {gist_id: object.id}).load(id)
    end

    def blobs(offset: nil, limit: nil)
      AssociationLoader.for(::Gist, :blobs).load(object).then do |results|
        results = results.sort { |a,b| a.created_at == b.created_at ? a.id <=> b.id : a.created_at <=> b.created_at }
        if limit
          offset ||= 0
          results = results.slice(offset, limit)
        end
        results
      end
    end

    def created_at
      object.created_at.iso8601
    end

    def updated_at
      object.updated_at.iso8601
    end
  end
end
