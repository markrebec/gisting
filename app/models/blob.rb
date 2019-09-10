class Blob < ApplicationRecord
  validates :gist, :filename, :body, presence: true

  belongs_to :gist
  has_one :user, through: :gist

  scope :chronological, -> { order('created_at ASC, id ASC') }

  audited associated_with: :gist
end
