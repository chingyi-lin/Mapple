bower install firebase
      var myDataRef = new Firebase('https://resplendent-fire-6545.firebaseio.com/chat');
      var myDataRef2 = new Firebase('https://resplendent-fire-6545.firebaseio.com/usertry');
      $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.set({name: name, text: text});//using set will not create new node, it will replace the old one with new one.
          myDataRef2.push({name: name, text: text}); //using push will new a node which can be used in adding_many situation. It seens that set & push cannot be used in the same time.
          $('#messageInput').val();
        }
      });
      myDataRef.on('child_changed', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
      });
      myDataRef2.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessagee(message.name, message.text);
      });

      myDataRef.on('child_removed', function(snapshot) {
      var userName = snapshot.name(), userData = snapshot.val();
      alert('User ' + userName + ' has left the chat.');
      });

      myDataRef2.on('child_removed', function(snapshot) {
      var userName = snapshot.name(), userData = snapshot.val();
      alert('User ' + userName + ' has left the chat.');
      });

      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+'i am change note: ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
      function displayChatMessagee(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+'i am add node: ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };
