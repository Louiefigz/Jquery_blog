
function indexListeners(){




  $.getJSON(path).done(function(response){
    showPosts(response.posts)
  });

  $('#new-post-form').click(function(){
    debugger;
  })


}




var showPosts = function(posts) {
  var dom = "";
  posts.forEach(function(post) {
    dom += (showPost(post));
  });
  $("#showPosts").html(dom);
}

var showPost = function(post) {
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var post =
  '<button id="post-listener" class="listed-post-'+post.id+'" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
   post.name +

  '</button>'+'<br>';

  return post;
}



//
// ' <li id="listed-tag" data-name=" ' + post.name+ ' " data-tag-id=" ' + post.id + ' ">' +
//    post.name +
//   '<button class="delete_class" data-tag-id=" '+ post.id + ' ">Remove</button>' +
// '</li>';
