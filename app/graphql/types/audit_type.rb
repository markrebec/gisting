module Types
  class AuditType < BaseObject
    description "An audit for an object"
    field :auditable, Types::AuditableUnion, null: false
    field :associated, Types::AuditableUnion, null: false
    field :user, Types::UserType, null: true
    field :action, String, null: false
    field :version, Integer, null: false
    field :comment, String, null: true
    field :audited_changes, Types::AuditableUnion, null: false

    def audited_changes
      object.auditable_type.constantize.new(object.audited_changes)
    end
  end
end
