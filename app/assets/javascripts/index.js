
var path = window.location.pathname;
var postId;
var newPost;
var posts= [];
var myPosts=[];
var restPosts=[];

function reloadPost(path){
  $.getJSON(path).done(function(response){

    createPostObjects(response);
    showPosts(
    );
    $('#mypostnumber').html($('#myposts .post-listener').length);

    $('#create-post input[type=text]').val('');
    $('#create-post textarea').val('');
    $('#create-post').hide();
    // deleteTag()
    $('#new-post-form').show();

    posts = [];
    getAllPosts();
  });
}

var createPostObjects = function(response) {
  // posts =[]
  myPosts =[]
  restPosts =[]
  response.posts.forEach(function(post) {
    posts.push(new Post(post.id, post.name, post.user.id, post.current_user_id))
  })

  // debugger;

  showMyPosts();
  showRestPosts();
}

var Post = function(id, name, user_id, current_user_id) {
  this.id = id;
  this.name = name;
  this.user_id = user_id;
  this.current_user_id = current_user_id;
  this.my_post()
}

Post.prototype.my_post = function(){

 if(this.current_user_id == this.user_id) {
   myPosts.push(this);
  } else {
     restPosts.push(this);
   }

 }



function showRestPosts(){
  var dom = "";
  restPosts.forEach(function(post) {
    // var post_td =
    // '<table>'+
    // '<tr>'+
    // '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
    //  post.name +'</td>'+
    //
    // '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " + " "+' </td>' +
    //     '<tr>' + '<table>';

    dom += (showPost(post, post.current_user_id));
  });

  $("#restofposts").html(dom);

}

function showMyPosts(){
  var dom = "";
  myPosts.forEach(function(post) {


    // var post_td =
    // '<table>'+
    // '<tr>'+
    // '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
    //  post.name +'</td>'+
    // //  console.log(post.id);
    // '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " + " "+' </td>' +
    //
    //     '<td>'+  '<a href="/posts/'+post.id+'/edit " >' + " Edit" +' </td>'+
    //     '<td>'+  '<a data-method="delete" href="/posts/'+post.id+' " >' + " Destroy" +'</td>'+
    //     '<tr>' + '<table>';


    dom += (showPost(post, post.current_user_id));
  });

  $('#myposts table').remove();
  $("#myposts").html(dom);

}

function getAllPosts(){

$.getJSON(path).done(function(response){
  createPostObjects(response)
  showPosts(posts);
  $('#mypostnumber').val('')
  $('#mypostnumber').html(posts.length - restPosts.length + " posts")
  $('#theirnumber').html(posts.length - myPosts.length + " posts")

});
}
