var spinner = new Spinner({color: '#ddd'});//建立Spinner物件
//var firebaseRef = 'https://firepano.firebaseio.com/';//firebase的路徑
var userRef = 'https://resplendent-fire-6545.firebaseio.com/admin';
var userFRef = new Firebase('https://resplendent-fire-6545.firebaseio.com/admin');

userFRef.once('value', function(dataSnapshot) {
  if (dataSnapshot.hasChild('cardNum')){
    cardNum = dataSnapshot.val().cardNum + 1;
    console.log(cardNum);
  } else {
    userFRef.update({'cardNum': 0});
    cardNum = 1;
    cardNumOri = 1;
  }
  cardRef = userRef +'/cards' + '/card' + cardNum;
  console.log(cardRef);
});

function finish() {
  
  
}
function renew(){

}

$(document).ready(function (){
  $("#saveNote").click(function(event) {
    var cardFirebase = new Firebase(cardRef);
    cardFirebase.update({'note': document.getElementById('note').value});
    cardFirebase.update({'note-privacy': document.getElementById("notePrivacy").value});
    event.preventDefault();
  });
  $("#saveComment").click(function (event) {
    var cardFirebase = new Firebase(cardRef);
    cardFirebase.update({'comment': document.getElementById('card-text').value});
    event.preventDefault();
  });
  $("#saveContactInfo").click(function (event) {
    var cardFirebase = new Firebase(cardRef);
    cardFirebase.update({'phone': document.getElementById('storePhone').value});
    cardFirebase.update({'address': document.getElementById("storeAddress").value});
    cardFirebase.update({'storename': document.getElementById("storeName").value});
    event.preventDefault();
  });
  $("#btn-allsave").click(function (event) {
  //click另外三個//綁一堆
    $("#saveNote").click();
    $("#saveComment").click();
    $("#saveContactInfo").click();
    userFRef.once('value', function(dataSnapshot) {
      userFRef.child('cardNum').transaction(function(cardNum) {
        return cardNum+1;
      });
    });
    event.preventDefault();
  });

    //cardFirebase.child('address').on("value", function(dataSnapshot){
    //  $("#storeAddress").value(
    //  JSON.stringify(dataSnapshot.val()));  
    //});
    //e.preventDefault();
});

function handleFileSelect(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      //imageFirebase = new Firebase(cardRef + '/image/' + hash + '/filePayload');
      var imageFirebase = new Firebase(cardRef + '/image');
      imageFirebase.once('value', function(dataSnapshot) {
        if (dataSnapshot.hasChildren()) {
          imageFirebase.remove();
        } else {
        }
        imageFirebase = new Firebase(cardRef + '/image/' + hash + '/filePayload');
      });

      spinner.spin(document.getElementById('spin'));
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
      imageFirebase.set(filePayload, function() { //why會出現第二個？！ 
        spinner.stop();
        document.getElementById("card-photo").style.visibility='hidden';
        document.getElementById("card-photo").src = e.target.result;
        document.getElementById("card-photo").style.left="80px";
        document.getElementById("card-photo").style.top="30px";
        document.getElementById("card-photo").style.height="455px"
        document.getElementById("card-photo").style.visibility='visible';
        document.getElementById("icon1").style.visibility='visible';
        document.getElementById("icon2").style.visibility='visible';
        $('#form-pic').hide();
        // Update the location bar so the URL can be shared with others
        window.location.hash = hash;
      });
    };
  })(file);
  reader.readAsDataURL(file);
}

$(document).ready(function() {
  $('#spin').append(spinner);
  var idx = window.location.href.indexOf('#');
  var hash = (idx > 0) ? window.location.href.slice(idx + 1) : '';
  if (hash === '') {
    // No hash found, so render the file upload button.
    $('#form-pic').show();
    document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
  } else {
    // A hash was passed in, so let's retrieve and render it.
    spinner.spin(document.getElementById('spin'));
    var file = new Firebase(cardRef + '/image');
    file.once('value', function(snap) {
      var payload = snap.val();
      if (payload != null) {
      	document.getElementById("card-photo").style.visibility='hidden';
        document.getElementById("card-photo").src = payload;
        document.getElementById("card-photo").style.left="80px";
        document.getElementById("card-photo").style.top="30px";
        document.getElementById("card-photo").style.height="455px"
        document.getElementById("card-photo").style.visibility='visible';
        document.getElementById("icon1").style.visibility='visible';
        document.getElementById("icon2").style.visibility='visible';
      } else {
        $('#body').append("Not found");
      }
      spinner.stop();
    });
  }
});