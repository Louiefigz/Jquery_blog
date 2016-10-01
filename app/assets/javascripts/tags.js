


function appendTag(data){
  // debugger;
   var tag = data.post.tags.slice(-1)[0];

    if ($('#new-tag').val() != '') {
      // debugger;
          $('#tags').append(showTag(tag))
          $('#new-tag').val('');
          deleteTag()
          $('#numberoftags').html($('#tags li').length)
  }
}

var getAllTags = function() {
  $.getJSON(path).done(function(response) {
    showTags(response.post.tags)
    createTagModel(response)
    deleteTag()

  })
}

function jsonTags(){
  tags =[];

  $.getJSON(path).done(function(response){
    createTagModel(response)
    $('#numberoftags').html(tags.length)
  })
}


var tags =[];

var createTagModel = function(response){

  tags =[];
  response.post.tags.forEach(function(tag){
    tags.push(new tagObject(tag.name))
  })
}

function tagObject(tag){
  this.name = tag;
}


function deleteTag(){
  $(".delete_class").click(function(e){
  $('#numberoftags').html(tags.length -1);
    var id = $(this).attr('data-tag-id');
  $('#listed-tag-'+id ).hide();
    $.ajax({
      url: path + '/delete_tag',
      method: "DELETE",
      data:{
        tag_id: $(this).attr("data-tag-id")
      }
    })
  })
}


var showTag = function(tag) {
// return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var tag =
    ' <li id="listed-tag-'+tag.id+'" data-name=" ' + tag.name+ ' " data-tag-id="'+tag.id+'">' +
       tag.name +
      '<button align="right" class="delete_class" data-tag-id="'+tag.id+'">Remove</button>' +
    '</li>';

  return tag;
}


var showTags = function(tags) {
  var dom = "";
    tags.forEach(function(tag) {
      dom += (showTag(tag));
    });
  $("#tags").html(dom);
}
