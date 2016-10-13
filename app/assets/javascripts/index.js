
var path = window.location.pathname;
var postId;
var newPost;
var posts= [];
var myPosts=[];
var restPosts=[];

// This function is making a call to the backend for all posts as the page is loading.
function getAllPosts(){
  $.getJSON(path).done(function(response){
    createPostObjects(response)
    $('#mypostnumber').val('')
    $('#mypostnumber').html(posts.length - restPosts.length + " posts")
    $('#theirnumber').html(posts.length - myPosts.length + " posts")
    $('.w3-container').fadeOut();

  });
}

// This function is being used after an ajax request and no page refresh
function reloadPost(path){
  $.getJSON(path).done(function(response){

    // Instead of returning an json object, I decided to make it a javascript object
    // in order to make it easier to organize my posts from everyone else's
    createPostObjects(response);
    showPosts(posts);
    getAllPosts();

    //This is clearing the form on the index page
    $('#mypostnumber').html($('#myposts .post-listener').length);
    $('#create-post input[type=text]').val('');
    $('#create-post textarea').val('');
    $('#create-post').hide();
    // deleteTag()
    $('#new-post-form').show();

  });
}

//Creating the Javascript Object
var createPostObjects = function(response) {
  posts =[]
  myPosts =[]
  restPosts =[]
  response.posts.forEach(function(post) {
    posts.push(new Post(post.id, post.name, post.content, post.user.id, post.current_user_id))
  })

  showPosts(posts);
  showMyPosts();
  showRestPosts();
}

var Post = function(id, name, content, user_id, current_user_id) {
  this.id = id;
  this.name = name;
  this.content = content;
  this.user_id = user_id;
  this.current_user_id = current_user_id;
  this.my_post()
}

Post.prototype.my_post = function(){

   if (this.current_user_id == this.user_id) {
     myPosts.push(this);
   } else {
     restPosts.push(this);
   }
 }
// END OF JAVASCRIPT OBJECT FUNCTIONS

//ALL OTHER POSTS - JAVASCRIPT OBJECT
function showRestPosts(){
  var dom = "";
  restPosts.forEach(function(post) {
    dom += (showPost(post, post.current_user_id));
  });

  $("#restofposts").html(dom);

}

//ONLY MY POSTS - JAVASCRIPT OBJECT
function showMyPosts(){
  var dom = "";
  myPosts.forEach(function(post) {
    dom += (showPost(post, post.current_user_id));
  });

  $('#myposts table').remove();
  $("#myposts").html(dom);
}

// SHOWING ALL POSTS
var showPosts = function(posts) {
  var dom = "";
    posts.forEach(function(post) {
      dom += (showPost(post, post.current_user_id));
    });
  $("#showPosts").html(dom);
}

//SYNTAX FOR RETURNING ONE POST
function showPost(post, current_user_id) {
  var content = post.content.slice(0, 200);
  var post_td =
    '<h2>' +
        '<a href="/posts/'+post.id+' " >' + post.name + '</a>' +
    '</h2>' +
      '<p>' + '<span class="glyphicon glyphicon-time">' + '</span>' + 'Posted on August 28, 2013 at 10:45 PM' + '</p>' +
    '<hr>' +
      '<img class="img-responsive" src="http://placehold.it/900x300" alt="">' +
    '<hr>' +
      '<p>' + content + '</p>' +
      '<a class="btn btn-primary" href="/posts/'+post.id+' ">' + "Read More" +  '<span class="glyphicon glyphicon-chevron-right">' + '</span>' + '</a>' +
    '<hr>';

    post_td += '</tr>' + '</table>' + '<br>';

  return post_td;
}
