
// Function below checks to see if we are on a shwo page and if so... we are going to display the following information.
// This may not be a great way to return a show page if I plan on building this out to have many other show pages.
// debugger;
if ( path.includes("/posts") && path.split('/')[path.split('/').length-1] != NaN ){
  $.getJSON(path).done(function(response){
    debugger;
    showComments(response.post);
  });
}


var showComments = function(post){
  var dom ="";
  debugger;
  post.comments.forEach(function(comment){
    dom+= (showComment(comment));
  });
  $('#showComments').html(dom);
}

var showComment = function(comment){
  // debugger;

  var comment_td =

    '<table>'+
    '<tr>'+
    '<td class="post-listener" data-name=" ' + comment.content + ' " data-post-id=" ' + comment.id +' ">'+
     comment.content +'</td>' + '<tr>' +
     '<td>' + 'Author:  ' + comment.author_name +'</td>' +
     '</tr>'+
     '<td>' +
     '<form id="createCommentReplyForm">'+
       '<input type="text" placeholder="Comment Reply" id="new-reply">' +
       '<input type="hidden" value="'+comment.id+'" id="parent_id">' +
       '<input type="hidden" value="'+comment.post_id+'" id="post_id">' +
       '<input type="submit">' +
     '</form>' +

     '</td>';
    comment_td += '</tr>' + '</table>' + '<br>';
  return comment_td;

}
