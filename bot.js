var Discordie = require("discordie");
var client = new Discordie();

client.connect({
  token: "MzA3NjE1OTk3MzY2MzcwMzE1.DDBlsw.o75bxGBlzLhzfYAXEjUCYI8EuQQ"
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});

client.User.setStatus("invisible");

client.Dispatcher.on("MESSAGE_CREATE", e => {
  if(!e.message.isPrivate){
    guild = e.message.guild;

    var kaliId = client.Users.get("327461537172422657");
    var kali = kaliId.memberOf(guild);
    var gankryId = client.Users.get("275438967279583234");
    var gankry = gankryId.memberOf(guild);
  }

  message = e.message;
  channel = message.channel;
  content = message.content;

  switch (content){
    case "hide":
      if(message.isPrivate && message.author.id == "275438967279583234"){
        client.User.setStatus("invisible");
        channel.sendMessage(" Sneaky, sneaky... ");
        console.log("Now hidden");
      }
    break;
    case "reveal":
      if(message.isPrivate && message.author.id == "275438967279583234"){
       client.User.setStatus("online");
       channel.sendMessage("I was hiding! Hehehahaa, grr!")
       console.log("Now visible");
     }
    break;
    case "ping":
      channel.sendMessage(message.author.mention + " Pong");
  }

  if(content.toLowerCase().search("gankry") != -1 && content.toLowerCase().search("fdp") != -1) message.delete();

  if(!e.message.isPrivate && client.User.can(Discordie.Permissions.Text.MANAGE_MESSAGES, channel)){
    if(content.toLowerCase().search("!play") == 0 && kali.getVoiceChannel() != null) message.delete();
  }

  //----- LOL -----
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xhr = new XMLHttpRequest();

  if(content.toLowerCase().search(".id") == 0 && message.author.id == gankryId){
    var cmdArr = content.toLowerCase().split(" ");

    var summoner = "";
    var server = "";

    if(cmdArr.length >= 3){
      if(cmdArr[1] == "br" ||  cmdArr[1] == "eune" ||  cmdArr[1] == "euw" ||  cmdArr[1] == "lan" ||  cmdArr[1] == "las" ||  cmdArr[1] == "na" ||  cmdArr[1] == "oce" ||  cmdArr[1] == "ru" ||  cmdArr[1] == "tr" ||  cmdArr[1] == "jp" ||  cmdArr[1] == "sea" ||  cmdArr[1] == "kr" ||  cmdArr[1] == "pbe"){
        for(var i = 2; i < cmdArr.length; i++){
          summoner += cmdArr[i];
        }
        summoner = summoner.toLowerCase();
        var encodedSummoner = encodeURI(summoner);

        server = cmdArr[1];

        xhr.open("GET", "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.4/summoner/by-name/" + encodedSummoner +"?api_key=RGAPI-94ddcd63-2cff-4e2d-89df-575515c9ca36", false);
        xhr.send();

        console.log(xhr.status);

        data = JSON.parse(xhr.responseText);

        if(data[summoner] != null){
          channel.sendMessage("ID : " + data[summoner].id);
          channel.sendMessage("Name : " + data[summoner].name);
          channel.sendMessage("Level : " + data[summoner].summonerLevel);
        }else channel.sendMessage("Sorry, this profile does not exist.");
      }else channel.sendMessage("I don't understand region **" + cmdArr[1] + "**. Accepted regions are **br, eune, euw, jp, kr, lan, las, na, oce, ru, tr.**")
    }else channel.sendMessage("Syntax : .id <region> <name>");
  }

  if(content.toLowerCase().search(".match") == 0 && !message.author.bot){
    var cmdArr = content.toLowerCase().split(" ");

    var summoner = "";
    var server = "";
    var platformId = "";
    var summonerId = "";

    if(cmdArr.length >= 3){
      if(cmdArr[1] == "br" ||  cmdArr[1] == "eune" ||  cmdArr[1] == "euw" ||  cmdArr[1] == "lan" ||  cmdArr[1] == "las" ||  cmdArr[1] == "na" ||  cmdArr[1] == "oce" ||  cmdArr[1] == "ru" ||  cmdArr[1] == "tr" ||  cmdArr[1] == "jp" ||  cmdArr[1] == "sea" ||  cmdArr[1] == "kr" ||  cmdArr[1] == "pbe"){
        for(var i = 2; i < cmdArr.length; i++){
          summoner += cmdArr[i];
        }
        summoner = summoner.toLowerCase();
        var encodedSummoner = encodeURI(summoner);

        server = cmdArr[1];

        switch(server){
          case "br": platformId = "BR1"
          break;
          case "eune": platformId = "EUN1"
          break;
          case "euw": platformId = "EUW1"
          break;
          case "jp": platformId = "JP1"
          break;
          case "kr": platformId = "KR"
          break;
          case "lan": platformId = "LA1"
          break;
          case "las": platformId = "LA2"
          break;
          case "oce": platformId = "OC1"
          break;
          case "tr": platformId = "TR1"
          break;
          case "ru": platformId = "RU"
          break;
          case "PBE": platformId = "PBE1"
          break;
        }

        xhr.open("GET", "https://" + server + ".api.pvp.net/api/lol/" + server + "/v1.4/summoner/by-name/" + encodedSummoner +"?api_key=RGAPI-94ddcd63-2cff-4e2d-89df-575515c9ca36", false);
        xhr.send();

        console.log(xhr.status);

        data = JSON.parse(xhr.responseText)

        summonerId =

        xhr.open("GET", "https://" + server + ".api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/" + platformId + "/" + summonerId + "?api_key=RGAPI-94ddcd63-2cff-4e2d-89df-575515c9ca36", false);
        xhr.send();

        console.log(xhr.status);

        data = JSON.parse(xhr.responseText);

        if(data[summoner] != null){
          channel.sendMessage("ID : " + data[summoner].id);
          channel.sendMessage("Name : " + data[summoner].name);
          channel.sendMessage("Level : " + data[summoner].summonerLevel);
        }else channel.sendMessage("Sorry, this profile does not exist.");
      }else channel.sendMessage("I don't understand region **" + cmdArr[1] + "**. Accepted regions are **br, eune, euw, jp, kr, lan, las, na, oce, ru, tr.**")
    }else channel.sendMessage("Syntax : .match <region> <name>");
  }
});
