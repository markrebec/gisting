FactoryBot.define do
  factory :blob do
    gist
    filename { Faker::File.file_name }
    body { Faker::Lorem.paragraphs.join("\n") }
  end
end
