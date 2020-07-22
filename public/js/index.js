// //alert("hi, you called for js?")

//scrollHeight property returns the entire height of an element in pixels, including padding, but not the border, scrollbar or margin.
$("#postContent").height($("textarea")[0].scrollHeight);

//Description: Get the value of a property for the first element in the set of matched elements.
//.prop() method provides a way to explicitly retrieve property values, while .attr() retrieves attributes.
// document.getElementById("postContent").disabled = true;
$("#postContent").prop('disabled', true);