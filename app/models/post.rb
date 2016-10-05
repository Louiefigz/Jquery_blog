class Post < ApplicationRecord
  belongs_to :user
  has_many :post_tags
  has_many :tags, :through => :post_tags
  has_many :comments

  validates_presence_of :name, :content

  # before_save :author_id

  # accepts_nested_attributes_for :tag_ids

def tag
  Tag.new
end


def tag_attributes=(attributes)
  if attributes['name'] != ''
    tag = self.tags.find_by(name: attributes["name"].strip)
    if tag.nil?
      self.tags.build(attributes)
    end
  end
  tag

end

# def author_id
#   binding.pry
#
# end


end
