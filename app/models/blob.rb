class Blob < ApplicationRecord
  validates :gist, presence: true

  belongs_to :gist
  has_one :user, through: :gist

  audited associated_with: :gist
end
