

/**
*  Add shit to a list
**/

$('body').on('submit', '.add-item', function(e) {
  e.preventDefault();
  
  const item = $(this).find("input").val();
  const itemObj = $("<div>").addClass("item").text(item);
  $(itemObj).append($('<div>').addClass('delete-item').text('x'));
  $(".items-list").append(itemObj);
  
  $(this).find("input").val('');
  
  return false;
});


$('body').on('click', '.delete-item', function() {
  $(this).closest(".item").remove();
});