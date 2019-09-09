module Types
  class BlobInput < BaseInputObject
    argument :filename, String, required: false
    argument :body, String, required: true
  end
end
