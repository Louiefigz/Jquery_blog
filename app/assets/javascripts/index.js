
function indexListeners(){

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
      appendPost()
    });
    e.preventDefault();
    console.log("prevent that default ");
  });

  $('#new-post-form').click(function(){
    $('#create-post').show();
    $('#new-post-form').hide();
  })

$('#showPostsBttn').click(function(){
  $('#showPostsBttn').hide()
  getAllPosts();
  $('.post-listener').click(function(){
    debugger;
  })
})

}

function appendPost(){

  $.getJSON("/posts").done(function(response) {
    // showTags(response.post.tags)
    debugger;

    new_post = showPost(response.posts[response.posts.length-1])
    $('#showPosts').append(new_post)
    $('#create-post input[type=text]').val('');
    $('#create-post textarea').val('');
    $('#create-post').hide();
    // deleteTag()

  })
}

function getAllPosts(){
$.getJSON(path).done(function(response){
  showPosts(response.posts)
});
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
  '<tr>'+
  '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
   post.name +'</td>'+
  //  console.log(post.id);
   '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show" +'</td>'+



  '</tr>' +

  '<br>';

  return post;
}



//
// ' <li id="listed-tag" data-name=" ' + post.name+ ' " data-tag-id=" ' + post.id + ' ">' +
//    post.name +
//   '<button class="delete_class" data-tag-id=" '+ post.id + ' ">Remove</button>' +
// '</li>';
