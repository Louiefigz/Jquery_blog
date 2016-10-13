class PostsController < ApplicationController

    before_action :set_post, only: [:show, :edit, :update, :destroy, :create_comment]
    serialization_scope :view_context

    def index
      @posts= Post.order('id DESC')
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


    def new

      @post = Post.new
      @tag = Tag.new
    end

    def edit
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

      post = Post.find(params[:id])

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
       post = Post.find(params[:id])
       tags = post.tags
      #  binding.pry
       respond_to do |format|
         format.json {render json: tags}
       end


    end

    def destroy
      @post.destroy
      flash[:notice] = "Post successfully Deleted"
      respond_to do |format|
        format.html { redirect_to posts_url }
          format.json do
            render json: flash
          end
        end
    end

    def create_tag
      if params[:name] != ''
        tag = Tag.find_or_create_by(name: params[:name].downcase.strip)
        post = Post.find(params[:id])
          if !post.tags.include?(tag)
            post.tags << tag
            respond_to do |format|
              format.json {render json: post}
              
            end
          end
      else
        render status: 404, plain: 'Must have a name!'
      end
    end

    def create_comment
      comment = Comment.new(comment_params)
      comment.update(author_id: current_user.id, post_id: params[:comment][:post_id].to_i )
          if !@post.comments.include?(comment)
            @post.comments << comment
          end
      comment.save
      render json: comment
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

      def comment_params
        params.require(:comment).permit(:content, :parent_id, :post_id)
      end

end
