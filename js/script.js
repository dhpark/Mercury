Parse.initialize("ss4Qntwp1qBNb2cDgmI10Jt6A9RNpFJOckwGbHAn", "dQVT5XqLPGwKy2ycHZSKhvDHJWCX5lvQYb75qCQo");


/**
*  Add shit to a list
**/


function addForms() {
  $('.all-forms').append('<div class="nf"><br><br><form class="add-item" style="display:inline-block">\
                    <input type="text" placeholder="Enter an item (e.g. cupcakes)" class="new-item n1">\
                  </form>\
                  <form class="add-retail" style="display:inline-block">\
                    <input type="text" placeholder="Enter a retailer brand (e.g. Walmart)" class="new-item n2">\
                  </form></div>');
}


$('body').on('submit', '.add-item', function(e) {
  e.preventDefault();
  
  addForms();
  
  return false;
});

$('body').on('submit', '.add-retail', function(e) {
  e.preventDefault();
  
 addForms();
  
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



$('body').on('click', '.comparebutton', function() {
  var n = $('.nf').length;
  
    $('.c1').fadeOut();
    $('.c2').fadeOut();
  if(n == 1) {
    $('.c2').fadeIn();
  } else if(n >= 2) {
    $('.c1').fadeIn();
  }
});



if(Parse.User.current()) {
  $("a[href='login.html']").html('Logout').attr('href', 'logout.html');
}

