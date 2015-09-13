Parse.initialize("ss4Qntwp1qBNb2cDgmI10Jt6A9RNpFJOckwGbHAn", "dQVT5XqLPGwKy2ycHZSKhvDHJWCX5lvQYb75qCQo");


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



$('body').on('submit', '.login-form', function(e) {
  e.preventDefault();
  
  Parse.User.logIn($('.login-username').val(), $('.login-pass').val(), {
    success: function(user) {
      window.location.replace('index.html');
    },
    error: function(user, error) {
      $('.error').text("Error: " + user.message).show();
      $('.login-pass').val('');
    }
  });
  
  return false;
});


$('body').on('submit', '.reg-form', function(e) {
  e.preventDefault();
  
  var user = new Parse.User();
  user.set("username", $('.reg-username').val());
  user.set("email", $('.reg-username').val());
  user.set("password", $('.reg-pass').val());

  user.signUp(null, {
    success: function(user) {
      window.location.replace('index.html');
    }, error: function(a, b) {
      $('.error').text("Error: " + a.message).show();
    }
  });
  
  return false;
});



if(Parse.User.current()) {
  $("a[href='login.html']").html('Logout').attr('href', 'logout.html');
}

