module Types
  class MutationType < Types::BaseObject

    field :gist, Types::GistType, null: false do
      description "Create a new gist"
      argument :description, String, required: false
      argument :privacy, String, required: false, default_value: :hidden
      argument :blobs, [Types::BlobInput], required: true
    end

    def gist(blobs:, **args)
      result = CreateGist.call(user: context[:current_user], blobs: blobs.map(&:to_h), **args)
      return result.gist if result.success?
      raise GraphQL::ExecutionError.new("Failed to create gist", extensions: result.gist.errors)
    end

  end
end
