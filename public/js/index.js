// //alert("hi, you called?")


//scrollHeight property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
$("#postContent").height($("textarea")[0].scrollHeight);
// document.getElementById("postContent").disabled = true;
$("#postContent").prop('disabled', true);
//Description: Get the value of a property for the first element in the set of matched elements.
//.prop() method provides a way to explicitly retrieve property values, while .attr() retrieves attributes.