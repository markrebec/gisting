class UpdateGist
  include Interactor

  def call
    context.gist ||= Gist.find(context.gist_id)
    context.gist.update!(
      description: context.description || context.gist.description,
      privacy: context.privacy || context.gist.privacy,
      blobs_attributes: context.blobs || []
    )
  rescue => e
    context.fail!(message: e.message)
  end
end
