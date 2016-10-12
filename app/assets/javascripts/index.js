
var path = window.location.pathname;
var postId;
var newPost;
var posts= [];
var myPosts=[];
var restPosts=[];


function reloadPost(path){
  $.getJSON(path).done(function(response){

    createPostObjects(response);
    showPosts(posts);
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
    $('#mypostnumber').val('')
    $('#mypostnumber').html(posts.length - restPosts.length + " posts")
    $('#theirnumber').html(posts.length - myPosts.length + " posts")
    $('.w3-container').fadeOut();

  });
}


var showPosts = function(posts) {

  var dom = "";
    posts.forEach(function(post) {
      dom += (showPost(post, post.current_user_id));
    })

  $("#showPosts").html(dom);
}

function showPost(post, current_user_id) {

  var content = post.content.slice(0, 200);
  // debugger ;
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
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

// '<table>'+
// '<tr>'+
// '<td class="post-listener" data-name=" ' + post.name + ' " data-post-id=" ' + post.id +' ">'+
//  post.name +'</td>'+
// //  console.log(post.id);
// '<td>'+  '<a href="/posts/'+post.id+' " >' + "Show " + " "+' </td>';
//
//   if (post.user_id == post.current_user_id) {
//     post_td +=
//       '<td>'+  '<a href="/posts/'+post.id+'/edit " >' + " Edit" +' </td>'+
//       '<td>'+  '<a data-method="delete" href="/posts/'+post.id+' " >' + " Destroy" +'</td>';
//   }

              // '<h2>' +
              //     '<a href="#">' + 'Blog Post Title'+ '</a>' +
              // '</h2>' +
              // '<p class="lead">' +
              //     'by' +  '<a href="index.php">' + 'Start Bootstrap' + '</a>' +
              // '</p>' +
              // '<p>' + '<span class="glyphicon glyphicon-time">' + '</span>' + 'Posted on August 28, 2013 at 10:45 PM' + '</p>' +
              // '<hr>' +
              // '<img class="img-responsive" src="http://placehold.it/900x300" alt="">' +
              // '<hr>' +
              // '<p>' + "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam, quasi, fugiat, asperiores harum voluptatum tenetur a possimus nesciunt quod accusamus saepe tempora ipsam distinctio minima dolorum perferendis labore impedit voluptates!" + '</p>' +
              // '<a class="btn btn-primary" href="#">' + "Read More" +  '<span class="glyphicon glyphicon-chevron-right">' + '</span>' + '</a>' +
              //
              // '<hr>';
