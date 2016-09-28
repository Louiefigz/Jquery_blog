class Comment < ApplicationRecord
  belongs_to :post
  # using an alias in order to create replies to comments
  has_many :replies, :foreign_key => "parent_id", :class_name=>:Comment
  # reply alias
  # has_many :replies


end
