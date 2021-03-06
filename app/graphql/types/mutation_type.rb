module Types
  class MutationType < Types::BaseObject

    field :create_gist, Types::Gist, null: false do
      description "Create a new gist"
      argument :description, String, required: false
      argument :privacy, String, required: false, default_value: :hidden
      argument :blobs, [Types::BlobInput], required: true
    end

    def create_gist(blobs:, **args)
      # TODO in the real world, we'd take a little time to extend graphql and handle auth
      # more gracefully, rather than just inline one-off like in all these mutations
      raise GraphQL::ExecutionError.new("You must be logged in to create a gist") unless context[:current_user].present?

      result = CreateGist.call(user: context[:current_user], blobs: blobs.map(&:to_h), **args)

      return result.gist if result.success?
      raise GraphQL::ExecutionError.new("Failed to create gist", extensions: result.gist.errors)
    end

    field :update_gist, Types::Gist, null: false do
      description "Update an existing gist"
      argument :id, ID, required: true
      argument :description, String, required: false
      argument :privacy, String, required: false
      argument :blobs, [Types::BlobInput], required: false
    end

    def update_gist(id:, blobs: [], **args)
      raise GraphQL::ExecutionError.new("You must be logged in to update a gist") unless context[:current_user].present?
      gist = ::Gist.find(id)
      # TODO should also use access control like pundit or cancan for this sorta stuff
      raise GraphQL::ExecutionError.new("You are not allowed to update this gist") unless context[:current_user] == gist.user

      result = UpdateGist.call(gist: gist, blobs: blobs.map(&:to_h), **args)

      return result.gist if result.success?
      raise GraphQL::ExecutionError.new("Failed to update gist", extensions: result.gist.errors)
    end

    field :delete_gist, Types::Gist, null: false do
      description "Delete a gist"
      argument :id, ID, required: true
    end

    def delete_gist(id:)
      raise GraphQL::ExecutionError.new("You must be logged in to delete a gist") unless context[:current_user].present?
      gist = ::Gist.find(id)
      raise GraphQL::ExecutionError.new("You are not allowed to delete this gist") unless context[:current_user] == gist.user

      gist.destroy
      gist
    end

    field :create_blob, Types::Blob, null: false do
      description "Create a new blob within an existing gist"
      argument :gist_id, ID, required: true
      argument :filename, String, required: false
      argument :body, String, required: true
    end

    def create_blob(gist_id:, **args)
      raise GraphQL::ExecutionError.new("You must be logged in to create a blob") unless context[:current_user].present?
      gist = ::Gist.find(gist_id)
      raise GraphQL::ExecutionError.new("You are not allowed to edit this gist") unless context[:current_user] == gist.user

      result = CreateBlob.call(gist: gist, **args)
      return result.blob if result.success?
      raise GraphQL::ExecutionError.new("Failed to create blob", extensions: result.blob.errors)
    end

    field :update_blob, Types::Blob, null: false do
      description "Update an existing blob"
      argument :id, ID, required: true
      argument :filename, String, required: false
      argument :body, String, required: false
    end

    def update_blob(id:, **args)
      raise GraphQL::ExecutionError.new("You must be logged in to update a blob") unless context[:current_user].present?
      blob = ::Blob.find(id)
      raise GraphQL::ExecutionError.new("You are not allowed to update this blob") unless context[:current_user] == blob.user

      result = UpdateBlob.call(blob: blob, **args)

      return result.blob if result.success?
      raise GraphQL::ExecutionError.new("Failed to update blob", extensions: result.blob.errors)
    end

    field :delete_blob, Types::Blob, null: false do
      description "Delete a blob"
      argument :id, ID, required: true
    end

    def delete_blob(id:)
      raise GraphQL::ExecutionError.new("You must be logged in to delete a blob") unless context[:current_user].present?
      blob = ::Blob.find(id)
      raise GraphQL::ExecutionError.new("You are not allowed to delete this blob") unless context[:current_user] == blob.user

      blob.destroy
      blob
    end

  end
end
