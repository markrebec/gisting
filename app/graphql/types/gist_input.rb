module Types
  class GistInput < BaseInputObject
    argument :description, String, required: false
    argument :privacy, String, required: false, default_value: :hidden
    argument :blobs, [Types::BlobInput], required: true
  end
end
