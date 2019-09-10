class Blob < ApplicationRecord
  validates :gist, :filename, :body, presence: true

  belongs_to :gist
  has_one :user, through: :gist

  audited associated_with: :gist
end
