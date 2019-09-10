module Types
  class AuditableUnion < BaseUnion
    description "Objects which may be audited"
    possible_types Types::GistType, Types::BlobType

    def self.resolve_type(object, context)
      case object.class.name
        when 'Gist'
          Types::GistType
        when 'Blob'
          Types::BlobType
      end
    end
  end
end
