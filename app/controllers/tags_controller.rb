class TagsController < ApplicationController
  def index

    if params[:post_id].present?
    @post = Post.find(params[:post_id])
    @tags = @post.tags
  else
    @tags = Tag.all
  end
  end

  def create
    @tag = Tag.new(tag_params)
  end

  def new
    @tag = Tag.new
  end

  def show
    @tag = Tag.find(params[:id])
  end

  def edit
  end


  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
