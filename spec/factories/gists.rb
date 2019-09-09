FactoryBot.define do
  factory :gist do
    user
    description { Faker::Lorem.sentence }

    trait :hidden do
      privacy { :hidden }
    end

    trait :unlisted do
      privacy { :unlisted }
    end

    trait :listed do
      privacy { :listed }
    end

    factory :hidden_gist,   traits: [:hidden]
    factory :unlisted_gist, traits: [:unlisted]
    factory :listed_gist,   traits: [:listed]
  end
end
