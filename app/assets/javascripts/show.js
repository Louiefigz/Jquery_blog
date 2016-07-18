$('document').ready(function(){

  $('#remove-tag').hide();
  attachListeners();

})

var path = window.location.pathname;
var postId;
var newPost;
// pathId = pathId[pathId.length -1]



function attachListeners(){
  $('#tag-listener').click(function(){

    getAllTags();
    $('#tag-listener').hide();
    $('#remove-tag').show();
  })

  $('#remove-tag').click(function(){

    $('#tags li').remove();
    $('#remove-tag').hide();
    $('#tag-listener').show();
  })

  $('#create-tag').click(function(){
    updatePost(this);
  })

  $('#create-tag').click(function(e){
    e.preventDefault();
    var pathId = path.split('/')
    pathId = path[2]


    $.ajax({
      url: path + "/createtag";



    })



  })


}


var getAllTags = function() {
  $.getJSON(path).done(function(response) {
    showTags(response.post.tags)
  })
}


var showTag = function(tag) {
  return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name});
}

var showTags = function(tags) {
  var dom = $()
  tags.forEach(function(tag) {
    dom = dom.add(showTag(tag));
  })
  $("#tags").html(dom);
}

function updatePost(position){
  var state = [];
    // $(position).text(player());
    debugger;
    $('#tags').each(function(index, cell){

      state.push($(cell).text());
    });
    newPost = state;
};


function postData(){
  return {"post":{"tags": newPost}};
}




function savePost(callback){

  $.ajax({
    url: path,
    method: "PATCH",
    data: postData()
  });
}
