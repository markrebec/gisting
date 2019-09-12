module Types
  class Audit < BaseObject
    description "An audit for an object"
    field :auditable, Types::Auditable, null: false
    field :associated, Types::Auditable, null: false
    field :user, Types::User, null: true
    field :action, String, null: false
    field :version, Integer, null: false
    field :comment, String, null: true
    field :audited_changes, Types::Auditable, null: false
    field :created_at, String, null: true

    def auditable
      return nil unless object.auditable_id.present?
      RecordLoader.for("::#{object.auditable_type}".constantize).load(object.auditable_id)
    end

    def associated
      return nil unless object.associated_id.present?
      RecordLoader.for("::#{object.associated_type}".constantize).load(object.associated_id)
    end

    def audited_changes
      object.auditable_type.constantize.new(object.audited_changes)
    end

    def created_at
      object.created_at.iso8601
    end
  end
end
