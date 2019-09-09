class UpdateBlob
  include Interactor

  def call
    context.blob ||= Blob.find(context.blob_id)
    context.blob.update!(
      filename: context.filename || context.blob.filename,
      body: context.body || context.blob.body
    )
  rescue => e
    context.fail!(message: e.message)
  end
end
