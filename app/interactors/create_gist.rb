class CreateGist
  include Interactor

  def call
    context.gist = Gist.new(
      description: context.description,
      privacy: context.privacy,
      user: context.user,
      blobs_attributes: context.blobs
    )
    context.gist.save!
  rescue => e
    context.fail!(message: e.message)
  end
end
