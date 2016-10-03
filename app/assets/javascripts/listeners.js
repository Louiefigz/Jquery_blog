$(function(){
  // These selectors are located in the show show page for a post //
  $('#remove-tag').hide();
  $('#create-tag').hide();
  $('#myposts').hide();
  $('#restofposts').hide();
  $('#closepostsIwrote').hide();
  $('#closepostsTheywrote').hide();
  $('#create-comment').hide();
  $('#hideCommentForm').hide();
  // $('#createCommentReplyForm').hide();
  attachListeners();
// This loads the posts for the index page //
  getAllPosts()
  jsonTags()

})




function attachListeners(){

  //////////////  Show Page Listeners ////////////////
  $('#tag-listener').click(function(){
    getAllTags();
    $('#tag-listener').hide();
    $('#remove-tag').show();
    $('#create-tag').show();
  })


  $('#remove-tag').click(function(){
    $('#tags li').remove();
    $('#remove-tag').hide();
    $('#tag-listener').show();
    $('#create-tag').hide();
  })



  $('#create-tag').submit(function(e){
    e.preventDefault();
    $.ajax({
      url: path + "/create_tag",
      method: "POST",
      data: {
        name: $('#new-tag').val()
      }
    }).success(function(data){

      appendTag(data);
    }).error(function(data){
      // debugger;
    });
  });

  $('#showCommentForm').click(function(){
    $('#create-comment').show();
    $('#showCommentForm').hide();
    $('#hideCommentForm').show();
  });

  $('#hideCommentForm').click(function(){
    $('#hideCommentForm').hide();
    $('#showCommentForm').show();
    $('#create-comment').hide();
  });

  //
  // $('#showComments').on('click', '#showCommentReplyForm', function(){
  //   debugger;
  //
  //   console.log('form button clicked');
  // });


  $('.create-comment').submit(function(e){

    $.ajax({
      url: path + "/create_comment",
      method: "POST",
      data:{'comment':{
          'content': $('#new-comment').val(),
          'post_id': parseInt($('#post_id').val())

         }
       }
      }).done(function(){
        $.getJSON(path).done(function(response){
          showComments(response.post);
          $('#new-comment').val('');
          $('#hideCommentForm').hide();
          $('#showCommentForm').show();
          $('#create-comment').hide();
        });
      });
      e.preventDefault();
    });

    $('#showComments').on("submit", '#createCommentReplyForm', function(e){
    
      e.preventDefault();

      $.ajax({
        url: path + '/create_comment',
        method: "POST",
        data:{
          "comment": {
          "content": $(this).find(".new-reply").val(),
          "parent_id": parseInt($(this).find("#parent_id").val()),
          "post_id": parseInt($(this).find("#post_id").val())
          }
        }
      }).done(function(){
        $.getJSON(path).done(function(response){
          showPost(response.post);
        });
      });
    });






///////Index page listeners////////

  $('#postsIWrote').click(function(){
    $('#postsIWrote').hide();
    $('#closepostsIwrote').show();
    $('#myposts').show();
  })

  $('#closepostsIwrote').click(function(){

    $('#closepostsIwrote').hide();
    $('#myposts').hide();
    $('#postsIWrote').show();
  })

  $('#postsTheyWrote').click(function(){
    $('#postsTheyWrote').hide();
    $('#closepostsTheywrote').show();
    $('#restofposts').show();
  })

  $('#closepostsTheywrote').click(function(){
    $('#closepostsTheywrote').hide();
    $('#postsTheyWrote').show();
    $('#restofposts').hide();
  })



  $('#new-post-form').click(function(){
    $('#create-post').show();
    $('#new-post-form').hide();
  })

    $('#create-post').hide();

    $('#create-post').submit(function(e){

      $.ajax({
        url: "/posts",
        method: "POST",
        data: {
          "post":{
            "name": $('#post-name').val(),
            "content": $('#post-content').val(),
            "tag": $('#tag-name').val()
          }
        }
      }).done(function(){
        reloadPost(path);
      });
      e.preventDefault()
    });


    };
