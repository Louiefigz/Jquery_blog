

if (path.split('/')[path.split('/').length-1] != NaN){
  $.getJSON(path).done(function(response){
    showComments(response.post);
  });
}


var showComments = function(post){
  var dom ="";
  post.comments.forEach(function(comment){
    dom+= (showComment(comment));
  });
  $('#showComments').html(dom);
}

var showComment = function(comment){
  var comment_td =
    '<table>'+
    '<tr>'+
    '<td class="post-listener" data-name=" ' + comment.content + ' " data-post-id=" ' + comment.id +' ">'+
     comment.content +'</td>' + '<tr>' +
     '<td>' + 'Author:  ' + comment.author_name +'</td>' +
     '</tr>';
    comment_td += '</tr>' + '</table>' + '<br>';
  return comment_td;
}


var showPosts = function(posts) {
  var dom = "";
  posts.forEach(function(post) {
    dom += (showPost(post, post.current_user_id));
  });
  $("#showPosts").html(dom);
}

var showPost = function(post, current_user_id) {
  // debugger;
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var post_td =
  '<table>'+
  '<tr>'+
  '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
   post.name +'</td>'+
  //  console.log(post.id);
  '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " + " "+' </td>';

  if (post.user_id == post.current_user_id) {
    post_td +=
      '<td>'+  '<a href="/posts/'+post.id+'/edit " >' + " Edit" +' </td>'+
      '<td>'+  '<a data-method="delete" href="/posts/'+post.id+' " >' + " Destroy" +'</td>';
  }

  post_td += '</tr>' + '</table>' + '<br>';

  return post_td;
}
