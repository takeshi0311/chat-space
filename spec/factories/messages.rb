# FactoryBot.define do

#   factory :message do
#     text              {"abe"}
#     image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/takeshi.jpg')) }
#   end

# end

FactoryBot.define do
  factory :message do
    text {Faker::Lorem.sentence}
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/takeshi.jpg')) }
    user
    group
  end
end