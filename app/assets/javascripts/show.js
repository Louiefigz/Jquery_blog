
// Function below checks to see if we are on a shwo page and if so... we are going to display the following information.
// This may not be a great way to return a show page if I plan on building this out to have many other show pages.


if (path.split('/').slice(-1) == "edit"){
  var path = path.split('/').slice(0, -1).join('/')
}

if ( path.includes("/posts") && path.split('/')[path.split('/').length-1] !== "" ){
  $.getJSON(path).done(function(response){
    showPagePost(response.post);
      if (response.post.user.id !== response.post.current_user_id){
        $('.editPage').hide();
      }
    $('.editNameForm').find("input[type='text']").attr("value", response.post.name);
    $('#edit-content').val(response.post.content);
  });
}

// POST CONTENT
var showPagePost= function(post){
  $('#post-name').html(post.name);
  $('#post-content').html(post.content);
  $('#post-user').html(post.author_name);
  showComments(post);
}

  //DELETE POST
function deleteButton(path){
  var deletehtml = '<a  data-method="delete" href=" '+ path+ '" class="myButton">' + 'Delete Post' + '</a>' + '<br>' + '<br>';
  return deletehtml;
}


//COMMENTS
var showComments = function(post){
  var dom ="";
  post.comments.forEach(function(comment){
    if(comment.parent_id == null){
      dom+= (showComment(comment));
    }
  });
  $('#showComments').html(dom);
}

var showComment = function(comment){
  var d = new Date(comment.created_at);
  var comment_td =
    '<div>' +
      '<div class="media">'+
          '<a class="pull-left" href="#">'+
              '<img class="media-object" src="http://placehold.it/64x64" alt="">' +
          '</a>' +

      '<div class="media-body" >' +
          '<h4 class="media-heading" data-name=" ' + comment.content + ' " data-post-id=" ' + comment.id +' ">' + "Start Bootstrap" +
              '<small>' + d + '</small>' +
          '</h4>' +
          comment.content
      '</div>' +
    '</div>';

       comment_td += showReplies(comment.replies);
       comment_td +=
       '<br>' +
         '<table>' +
             '<tr>' +
               '<td>' +
                 '<form id="createCommentReplyForm">'+
                   '<input type="text" placeholder="Comment Reply" class="new-reply" data-commentId="' + comment.id + '"  required>' +
                   '<input type="hidden" value="'+comment.id+'" id="parent_id">' +
                   '<input type="hidden" value="'+comment.post_id+'" id="post_id">' +
                   '<input type="submit">' +
                 '</form>' +
               '</td>' +
             '</tr>' +
           '</table>' +
          '</div>' + '<br>';

  return comment_td;
}

function showReplies(comments){
  var replyComment="";
  comments.forEach(function(reply){
    replyComment+= showReply(reply);
  });
  return replyComment;
}

function showReply(reply){
  var d = new Date(reply.created_at);
  var replyComment =

    '<div class="media">'+
        '<a class="pull-left" href="#">' +
            '<img class="media-object" src="http://placehold.it/64x64" alt="">' +
        '</a>' +
        '<div class="media-body">' +
            '<h4 class="media-heading">' + "Nested Start Bootstrap" +
                '<small>' + d + '</small>' +
            '</h4>' + reply.content +
        '</div>' +
    '</div>' ;
return replyComment;
}
