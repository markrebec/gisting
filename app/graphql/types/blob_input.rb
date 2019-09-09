module Types
  class BlobInput < BaseInputObject
    argument :id, ID, required: false
    argument :filename, String, required: false
    argument :body, String, required: true
  end
end
