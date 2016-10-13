


// This is set to make this ajax request if there is a number at the end of url.//
// If there is a number after posts, it suggests that it is a show page.//
if ( path.includes("/posts") && path.split('/')[path.split('/').length-1] !== "" ){
  $.getJSON(path).done(function(response){
    showPagePost(response.post);
    jsonTags();
      if (response.post.user.id !== response.post.current_user_id){
        $('.editPage').hide();
      }
      //For the edit form, populating the fields with content.
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

// <div id="comments-container">
//
// <div id="comment1"></div>
//
// </div>
//
// appendToElement(htmlText, element)
//
// for (var i = 0; i < comments.length; i++) {
//   var comment = comments[i];
//   var html_string = "<div id=" + comment.id + ">" + comment.words + "</div>";
//   var element = $("#comments-container");
//
//   appendToElement(html_string, element)
//
//
//   for (var j = 0; j < comment.comments.length; j++) {
//     [i]
//   }
// }
//
// function subtract(n){
//   if (n>0) {
//     return subtract(n-1);
//   }
//
// }
//
// recursive
// - append div to container
// - check if more child comments in current comment
// - if yes, do this again
//
// comment1
// |- comment1.1
//   |-
// |- comment1.2


var showComment = function(comment){
  var d = new Date(comment.created_at);
  var comment_td =
    '<div>' +
      '<div class="media">'+
          '<a class="pull-left" href="#">'+
              '<img class="media-object" src="http://placehold.it/64x64" alt="">' +
          '</a>' +

      '<div class="media-body" >' +
          '<h4 class="media-heading" data-name=" ' + comment.content + ' " data-post-id=" ' + comment.id +' ">' + "Start Bootstrap  " +
              '<small>' + d + '</small>' +
          '</h4>' +
          comment.content
      '</div>' +
    '</div>';
      // comment_td+= showReply(comment);
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


//REPLIES
function showReplies(comments){
  // debugger;
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
            '<h4 class="media-heading">' + "Nested Start Bootstrap  " +
                '<small>' + d + '</small>' +
            '</h4>' + reply.content +
        '</div>' +
    '</div>' ;
return replyComment;
}
