module Types
  class Auditable < BaseUnion
    description "Objects which may be audited"
    possible_types Types::Gist, Types::Blob

    def self.resolve_type(object, context)
      case object.class.name
        when 'Gist'
          Types::Gist
        when 'Blob'
          Types::Blob
      end
    end
  end
end
