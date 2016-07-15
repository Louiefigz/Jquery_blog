class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content
  has_many :tags, serializer:PostTagSerializer
  has_one :user


end
