class Gist < ApplicationRecord
  validates :user, presence: true
  validates_associated :blobs

  belongs_to :user
  has_many :blobs, dependent: :destroy
  accepts_nested_attributes_for :blobs, allow_destroy: true

  enum privacy: {
    hidden: 0,
    unlisted: 50,
    listed: 100
  }

  scope :hidden, -> { where(privacy: :hidden) }
  scope :unlisted, -> { where(privacy: :unlisted) }
  scope :listed, -> { where(privacy: :listed) }
end
