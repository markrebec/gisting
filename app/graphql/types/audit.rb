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

    def audited_changes
      object.auditable_type.constantize.new(object.audited_changes)
    end
  end
end
