$('document').ready(function(){

  $('#remove-tag').hide();
  $('#create-tag').hide();
  attachListeners();
  indexListeners();

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
    $('#create-tag').show();

  })

  $('#remove-tag').click(function(){

    $('#tags li').remove();
    $('#remove-tag').hide();
    $('#tag-listener').show();
    $('#create-tag').hide();
  })



    $('#create-tag').submit(function(e){
        console.log(" aint gonna work bitch ");
      $.ajax({
        url: path + "/create_tag",
        method: "POST",
        data: {
          name: $('#new-tag').val()
        }
      }).done(function(){
        appendTag()
      });
      e.preventDefault();
    });

    };

  // debugger;



  function appendTag(){
    $.getJSON(path).done(function(response) {
      // showTags(response.post.tags)
if ($('#new-tag').val() != '') {
      new_tag = showTag(response.post.tags[response.post.tags.length-1])
      $('#tags').append(new_tag)
      $('#new-tag').val('');
      deleteTag()
    }
    })
  }







var getAllTags = function() {
  $.getJSON(path).done(function(response) {
    showTags(response.post.tags)
    deleteTag()


  })
}

function deleteTag(){
$(".delete_class").click(function(e){

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


// $('#listed-tag').attr('data-tag-id') == $(this).attr("data-tag-id")

// var getLastTag = function(){
//   $.getJson(path).done(function(response){
//
//   var dom = $();
//     dom = dom.add(showTag(response.post.tags[response.post.tags.length -1])
//
//     $('#tags').html(dom);
//   })
// }


var showTag = function(tag) {
  // return $('<li>', {'data-name': tag.name, 'data-tagid': tag.id, text: tag.name  });
  var tag =
    ' <li id="listed-tag-'+tag.id+'" data-name=" ' + tag.name+ ' " data-tag-id="'+tag.id+'">' +
       tag.name +
      '<button class="delete_class" data-tag-id="'+tag.id+'">Remove</button>' +
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
//
// function updatePost(position){
//   var state = [];
//     // $(position).text(player());
//     debugger;
//     $('#tags').each(function(index, cell){
//
//       state.push($(cell).text());
//     });
//     newPost = state;
// };


function postData(){
  return {"post":{"tags": newPost}};
}



//
// function savePost(callback){
//
//   $.ajax({
//     url: path,
//     method: "PATCH",
//     data: postData()
//   });
// }
