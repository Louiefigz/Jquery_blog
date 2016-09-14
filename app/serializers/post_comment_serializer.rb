class PostCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_id, :author_name

  def author_name
    binding.pry
  end
end
