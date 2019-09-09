class ReactController < ApplicationController
  layout 'react'

  def root; end

  def gist
    @gist = Gist.find(params[:id])
  end

  def blob
    @gist = Gist.find(params[:gist_id])
    @blob = @gist.blobs.find(params[:id])
  end
end
