class Blob < ApplicationRecord
  validates :gist, presence: true

  belongs_to :gist
  has_one :user, through: :gist
end
