class CreateBlob
  include Interactor

  def call
    context.gist ||= Gist.find(context.gist_id)
    context.blob = Blob.new(
      gist: context.gist,
      filename: context.filename,
      body: context.body
    )
    context.blob.save!
  rescue => e
    context.fail!(message: e.message)
  end
end
