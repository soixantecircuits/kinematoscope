var Socket = function () {

  var socketConnect,
    intervalSocket = undefined,
    updateSocket = undefined,
    dataArray = [],
    //https = (window.location.protocol === "https:") ? 's' : '',
    https = 's',
    websocketServerLocation = 'ws' + https + '://' + Config.wsUrl,
    socketUpdate = 3000,
    _self = this;

  var handleData = function (data) {
    console.log(data.profile.screen_name);
    //
  };

  var createWebSocket = function (host) {
    if (window.MozWebSocket) {
      window.WebSocket = window.MozWebSocket;
    }

    if (!window.WebSocket) {
      console.log('Votre navigateur ne supporte pas les webSocket!');
      return false;
    } else {
      socketConnect = new WebSocket(host);

      socketConnect.onopen = function () {
        window.clearInterval(intervalSocket);
        console.log('socket ouverte');
        var message = {
          message: "humain"
        };
        sendMessage(message);
      };

      socketConnect.onclose = function () {
        console.log('socket fermée');
        window.clearInterval(intervalSocket);
        intervalSocket = setInterval(function () {
          createWebSocket(websocketServerLocation)
        }, socketUpdate);
      };

      socketConnect.onerror = function (e) {
        console.log('Une erreur est survenue: ', e);
        socketConnect.close();
        window.clearInterval(intervalSocket);
        intervalSocket = setInterval(function () {
          createWebSocket(websocketServerLocation);
        }, socketUpdate);
      };

      socketConnect.onmessage = function (msg) {
        try { //tente de parser data
          var data = JSON.parse(msg.data);
          //console.log(data.source_slug);
          if (data.source_slug === 'twitter'){
            //$(_self).trigger('new-twitter');
            if(data.meta.mentions.indexOf('AugusteLeBot') > 0){
              $(_self).triggerHandler('new-twitter', data);  
            }
            //handleData(data);
          }
        } catch (exception) {
          throw(exception);
        }
        //console.log(msg);
      };
    }
  };

  var sendMessage = function (data) {
    if (typeof data == 'object') { // si data est un objet on le change en chaine
      data = JSON.stringify(data);
    }
    socketConnect.send(data);
  };

  this.init = function (address) {
    var url = address || _self.websocketServerLocation
    createWebSocket(websocketServerLocation);
  };
  this.sendMessage = sendMessage;
};
