class Gist < ApplicationRecord
  validates :user, presence: true

  belongs_to :user
  has_many :blobs

  enum privacy: {
    hidden: 0,
    unlisted: 50,
    listed: 100
  }
end
