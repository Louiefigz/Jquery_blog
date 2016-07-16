class Post < ApplicationRecord
  belongs_to :user
  has_many :post_tags
  has_many :tags, :through => :post_tags

  validates_presence_of :name, :content

  def tag_ids=(attributes)

      attributes[:ids].each do |tag|
        if tag != ""
        collection = Tag.find(tag)
        self.tags << collection
      end
    end


    if attributes[:new_tag][:name].present?
      @tag = Tag.find_or_create_by(name: attributes[:new_tag][:name].downcase.strip)
      self.tags << @tag
    end

    self.tags

  end
end
