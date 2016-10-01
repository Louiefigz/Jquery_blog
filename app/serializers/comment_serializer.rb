class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_id, :author_id, :author_name, :parent_id, :replies, :created_at


  def author_name
    author = User.find(self.author_id)
    author.email
  end





end
