var number = 3;
      var wifi = true;
      var plug = true;
      var icon3 = false;
      var icon4 = false;

      function stick(url){
        switch (number){
          case 1:
            document.getElementById("icon1").src = url;
            number = number + 1;
            break;
          case 2:
            document.getElementById("icon2").src = url;
            number = number + 1;
            break;
          case 3:
            if(!icon3){
              document.getElementById("icon3").src = url;
              number = number + 1;
              icon3 = true;
            }
            break;
          case 4:
            if(!icon4){
              document.getElementById("icon4").src = url;
              number = number + 1;
              icon4 = true;
            }
            break;
          default:
            break;
        }
      }
      function wifiSwitch(){
        if(wifi) {
          document.getElementById("icon1").src= "img/card_icon/wifi icon trans.png";
          wifi = false;
          cardDB.set({wifis: 0});  //no wifi, save to database
        }

        else {
          document.getElementById("icon1").src= "img/card_icon/wifi icon.png";
          wifi = true;
          cardDB.set({wifis: 1});//has wifi, save to database
        }
      }
      function plugSwitch(){
        if(plug) {
          document.getElementById("icon2").src= "img/card_icon/plug icon trans.png";
          plug = false;
          cardDB.set({plugs: 0});
        }
        else {
          document.getElementById("icon2").src= "img/card_icon/plug icon.png";
          plug = true;
          cardDB.set({plugs: 1});
        }
      }
      function dropicon(num){
        switch(num){
          case 1:
            if(icon1)
            {
              document.getElementById("icon1").src= "";
              icon1 = false;
              number = number - 1;
            }
            break;
          case 2:
            if(icon2)
            {
              document.getElementById("icon2").src= "";
              icon2 = false;
              number = number - 1;
            }
            break;
          case 3:
            if(icon3)
            {
              document.getElementById("icon3").src= "";
              icon3 = false;
              number = number - 1;
            }
            break;
          case 4:
            if(icon4)
            {
              document.getElementById("icon4").src= "";
              icon4 = false;
              number = number - 1;
            }
            break;
          default:
            break;
        }

      }