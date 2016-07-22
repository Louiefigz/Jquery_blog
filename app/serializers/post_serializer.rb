class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :current_user_id
  has_many :tags, serializer:PostTagSerializer
  has_one :user
  delegate :current_user, to: :scope

  def current_user_id
    current_user.id
  end


end
