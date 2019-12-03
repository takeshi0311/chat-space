class Group < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many  :messages
  has_many  :users,  through:  :group_users
  has_many  :group_users
end
