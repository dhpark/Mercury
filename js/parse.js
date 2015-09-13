Parse.initialize("ss4Qntwp1qBNb2cDgmI10Jt6A9RNpFJOckwGbHAn", "dQVT5XqLPGwKy2ycHZSKhvDHJWCX5lvQYb75qCQo");



var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  alert("yay! it worked");
});

