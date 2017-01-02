/// <reference path="/Scripts/jquery-1.4.1-vsdoc.js" />
/// <reference path="/Scripts/jquery-1.4.1-vsdoc.js" />
///<reference path="http://code.jquery.com/ui/1.10.3/jquery-ui.js">
///<reference path="http://jquery.com/">
///<reference path="http://www.malsup.com/jquery/form/">
///<reference path="text/javascript" src="jquery-1.2.6.pack.js">  
///<reference path="text/javascript" src="jquery.form.js">
///<reference path='text/javascript' src='https://cdn.firebase.com/js/client/1.0.2/firebase.js'>

$(function() {
    var name = $( "#name" ),
        //image = $( "#image" ),
        userID = $("#userID").val(),
        namee = $( "#name" ).val(),
        card1= $("#card1").val(),
        card2= $("#card2").val(),
        card3= $("#card3").val(),

      //allFields = $( [] ).add( name ).add( email ).add( password ),
      allFields = $( [] ).add( name ).add(userID).add(namee).add(card1).add(card2).add(card3),
      tips = $( ".validateTips" );
      var bookID;

    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    
    $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 340,
      width: 400,
      position:['middle',20],
      modal: true,
      buttons: {
        "新增": function() {
          var bValid = true;

          allFields.removeClass( "ui-state-error" );
          var a =name.val();

          var CData = new Firebase('https://resplendent-fire-6545.firebaseio.com/');
          var ncarddata = CData.child(userID);
          
          ncarddata.on('value', function(snapshot) {
          bookID = snapshot.val().booksID;//when to new a book
          bookID = bookID+1;
          });
          
          ncarddata.child('booksID').set(bookID);
          var bb=ncarddata.child('book');
          var aa=bb.push();
          aa.set({name:a,bookid:bookID});
          //document.write(card2);

         //$( "#book ulbody" ).append( "<li>" +
             // "<a href=\"cardview.html\">" +"<img src=\"http://t3.gstatic.com/images?q=tbn:ANd9GcQxgABKdato_DOigkbRSMVWFn7M3afWlmqluFuRO92MUNuudCc1\">"
             // +"<span>"+ name.val()+"</span>" +"</a>"+              
            //"</li>" );
            $( this ).dialog( "close" );
        },
        "取消": function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });
 
    $( "#create-user" )
      .button()
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });

      $( "#addnew1" )
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });

      $( "#addnew2" )
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });

       $( "#addnew3" )
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });

       $( "#addnew4" )
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });




  });


