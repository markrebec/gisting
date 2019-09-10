class ReactController < ApplicationController
  layout 'react'

  def root; end

  def user
    @user = User.find_by(username: params[:owner])
  end

  def gist
    @user = User.find_by(username: params[:owner])
    @gist = @user.gists.find(params[:id])
  end

  def blob
    @user = User.find_by(username: params[:owner])
    @gist = @user.gists.find(params[:gist_id])
    @blob = @gist.blobs.find(params[:id])
  end
end
