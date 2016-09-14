class PostCommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_id, :author_name


end
