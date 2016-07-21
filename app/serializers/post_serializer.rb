class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :user_id
  has_many :tags, serializer:PostTagSerializer
  has_one :user




end
