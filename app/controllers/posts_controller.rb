class PostsController < ApplicationController

    before_action :set_post, only: [:show, :edit, :update, :destroy]
    serialization_scope :view_context

    # GET /posts
    # GET /posts.json
    def index

      @posts = Post.all

      respond_to do |f|
        f.html { render :index }
        f.json { render json: @posts }
      end
    end


    def show

      @comment = Comment.new
      respond_to do |f|
        f.html { render :show }
        f.json { render json: @post }
      end
    end

    # GET /posts/new
    def new

      @post = Post.new
      @tag = Tag.new
    end

    def edit
      # binding.pry
      redirect_to root_path if @post.user.id != current_user.id
      @tag= @post.tags.build
    end


    def create
      @post = Post.new(post_params)

      respond_to do |format|
        if @post.save
          @post.update(user_id: current_user.id)
          if params[:post][:tag] != ""
            tag = Tag.find_or_create_by(name: params[:post][:tag].downcase.strip)
            @post.tags << tag
          end
          format.html { redirect_to :back, notice: 'Post was successfully created.' }
          format.json { render action: 'show', status: :created, location: @post }
        else
          # flash[:message] = @post.errors.full_messages[0]
          format.html { render action: 'new' }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end


    def update
      respond_to do |format|
        # tag = Tag.find_or_create_by(name: params[:post][:new_tag][:tag][:name])

        if @post.update(post_params)
          format.html { redirect_to @post, notice: 'Post was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: 'edit' }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /posts/1
    # DELETE /posts/1.json

    def delete_tag

       posttag = PostTag.find_by(tag_id: params[:tag_id].to_i, post_id: params[:id].to_i)
       posttag.destroy
    end

    def destroy
      @post.destroy
      respond_to do |format|
        format.html { redirect_to posts_url }
        format.json { head :no_content }
      end
    end

    def create_tag

      if params[:name] != ''
        tag = Tag.find_or_create_by(name: params[:name].downcase.strip)
        post = Post.find(params[:id])
        if !post.tags.include?(tag)
          post.tags << tag
          render json: post
        end
      else
        render status: 404, plain: 'Must have a name!'
      end
    end

    def create_comment

      post = Post.find(params[:id])
      post.comments.find_or_create_by(content: params[:comment].strip, author_id: current_user.id)
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def post_params
        params.require(:post).permit(:name, :content ,:tag_ids => [], tag_attributes: [:name])
      end

      def tag_params
        params.permit(:name, :id)
      end

end
