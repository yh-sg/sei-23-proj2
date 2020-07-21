// //alert("hi, you called?")

// $('textarea').autoResize();
// //$("h1").css( "color", "red" );

$("#postContent").height( $("textarea")[0].scrollHeight );
// $(".postContent").readOnly = true;
// document.getElementById("postContent").disabled = true;
$("#postContent").prop('disabled', true);