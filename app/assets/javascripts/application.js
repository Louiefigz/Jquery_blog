// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery

//= require jquery_ujs
//= require turbolinks
//= require show
//= require index

//= require_tree .


// function attachListeners(){
//   $('#tag-listener').click(function(e){
//     debugger;
//     // assign data to a variable that you want to save - serialize()
//     $.get("/post_tags", function( data ) {
//       // Dispay to the DOM
//       $( ".result" ).html( data );
//       alert( "Load was performed." );
//     });
//   });
// }

// $('#browse-plan-table').on('submit', '#comment-form', function(e){
//     e.preventDefault();
//
//     var data = $('form').serialize(),
//     url = $(this).attr('action');
//
//
//     $.ajax({
//       type: "POST",
//       url: /posts,
//       data: data,
//       dataType: 'json',
//       success: function(data){
//          debugger;
//          Put data to the DOM
//       },
//       error: function(XMLHttpRequest, textStatus, errorThrown) {
//         alert("Your comment failed to be posted");
//       }
//     });
//   });

// $(function(){
//   attachListeners();
// });
