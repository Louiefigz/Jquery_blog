class PostSerializer < ActiveModel::Serializer
  attributes :id, :name, :content, :current_user_id
  has_many :tags, serializer:PostTagSerializer
  has_one :user
  delegate :current_user, to: :scope
  has_many :comments, through: PostCommentSerializer


  def current_user_id
    current_user.id
  end

  # def author_name
  #
  #   self.comments.each do |comment|
  #     if comment.author_id.present?
        #
  #     end
  #   end
  # 
  # end


end
