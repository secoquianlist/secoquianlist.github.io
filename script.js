
window.onload = function()
  {
    alert("Welcome to the 'Destination List' App!\n\nCreated by Justin Secoquian!\n\nWith this app, you'll be able to list all of the places you want to visit or have visited already!");
    populateDestinationListonload();
    displayDestinationList();
    clearFocus();
  };

function get(name)
  {
    var url = window.location.search;
    var num = url.search(name);
    var namel = name.length;
    var frontlength = namel+num+1;
    var front = url.substring(0, frontlength);
    url = url.replace(front, "");
    num = url.search("&");
    if(num>=0) return url.substr(0,num);
    if(num<0)  return url;
  }

function passlist()
  {
    var url = "https://secoquianlist.github.io/index.html?list="+ DestinationList;
    var accessToken = "b48efbd91f4c4f45b03ca0f333f0bd74e17bb72d";
    var params = {
        "long_url" : url           
      };

    $.ajax({
        url: "https://api-ssl.bitly.com/v4/shorten",
        cache: false,
        dataType: "json",
        method: "POST",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        },
        data: JSON.stringify(params)
    }).done(function(data) {
        getshorturl = 1;
        document.getElementById("sharelist").innerHTML = 'Share List:\n' + data.link;
        copyToClipboard(data.link);
    }).fail(function(data) {
        document.getElementById("sharelist").innerHTML = 'Share List:\n' + url;
        copyToClipboard(url);
    });
  }

function share()
  {
   passlist();
  }

function copyToClipboard(text) 
  {
    var passbyurl = document.createElement("textarea");
    passbyurl.value = text;
    document.body.appendChild(passbyurl);
    passbyurl.focus();
    passbyurl.select();
    document.execCommand("copy");
    document.body.removeChild(passbyurl);
    alert("URL has been copied. Ready to share: " + text);
  }

function about()
  {
    alert("Welcome to the 'Destination List' App!\n\nCreated by Justin Secoquian!\n\nWith this app, you'll be able to list all of the places you want to visit or have visited already!");  
  }

function readCookie(name)
  {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i < ca.length; i++)
      {
        var c = ca[i];
        while (c.charAt(0)=='') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
    return null;
  }

function remove_unwanted(str)
  {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      str = str.replace(/%20/g, "");
      str = str.replace(/%21/g, "!");
      str = str.replace(/%24/g, "$");
      str = str.replace(/%7C/g, " | ");
      return str.replace(/[^\x20-\x7E]/g, '');
  }

function saveCookie()
  {
    delete_cookie('secoquianlist')
    var date = new Date();
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
    document.cookie = 'secoquianlist' + "=" + escape(DestinationList.join(',')) + "; path=/;expires = " + date.toGMTString();
  }

function delete_cookie(name)
  {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

function populateDestinationListonload()
  {
    DestinationList = [];
    TravelBucket = [];

    var y = readCookie('secoquianlist');
    y = remove_unwanted(y);
    
    var geturllistvalue = get("list");
    if (geturllistvalue) 
      {
       geturllistvalue = remove_unwanted(geturllistvalue);
       geturllistvalue = geturllistvalue.split(',');
       DestinationList = geturllistvalue;
      } else if (y)
        {
         y = y.split('%2C');
         DestinationList = y;
        }
   }

var MyItems = 
  {
    name:"",
    price:""
  };

var DestinationList = [];
var TravelBucket = [];

function displayDestinationList() 
  {
    document.getElementById("MyList").innerHTML = ''
    var TheList = "";
    var TheRow = "";
    var arrayLength = DestinationList.length;

    for (var i = 0; i < DestinationList.length; i++) 
      {
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteDestinationList(' + i + ')" />';
        var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeDestinationList(' + i + ')" />';
        var arrays = DestinationList[i];
        arrays = "'"+arrays+"'";
        var btnaddcart =  '<label><input name="add" type="checkbox" id="adds" value="Add to Travel Bucket" onclick="addtoTravelBucket('+arrays+',' + i + ')" />';
        var btnsharelist = '<input class="button" id="shares" name="shares" type="submit" value="Share Destination List" onclick="share()" />';

        TheRow = "<li>" + DestinationList[i] + btndelete + ' ' + btnaddcart + '</li>';

        TheList += TheRow;
      }
    if (arrayLength > 0)
      {
        document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
        document.getElementById("sharebutton").innerHTML = btnsharelist;
      } else 
        {
          document.getElementById("MyList").innerHTML = '';
          
          document.getElementById("sharebutton").innerHTML = ' ';
          document.getElementById("sharelist").innerHTML = ' ';
        }
  }

function displayTravelBucket() 
  {
    document.getElementById("MyCart").innerHTML = ''
    var TheList = "";
    var TheRow = "";
    var arrayLength = addtoTravelBucket.length;
    for (var i = 0; i < arrayLength; i++) 
      {
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteTravelBucket(' + i + ')" />';
        var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeTravelBucket(' + i + ')" />';
        var arrays = addtoTravelBucket[i];
        arrays = "'"+arrays+"'";
        var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Destination List" onclick="addbacktoDestinationList('+arrays+',' + i + ')" checked="checked"/>';
        
        TheRow = "<li>" + addtoTravelBucket[i] + btndelete + ' ' + ' ' + btnaddlist + '</li>';

        TheList += TheRow;
      }
    if (arrayLength > 0)
      {
        document.getElementById("labels").innerHTML = 'Visited';
        document.getElementById("MyCart").innerHTML = '<ul>' + TheList + '</ul>';
      } else 
        {
          document.getElementById("labels").innerHTML = '';
          document.getElementById("MyCart").innerHTML = '';
        }
    }

function addDestinationList(item)
  {
    if (item != "")
      {
        document.getElementById("sharelist").innerHTML = ' ';
        DestinationList.push(item);
        displayDestinationList();
        displayTravelBucket(); 
        clearFocus();
        savecookie();
       }else 
          {
            alert("Item Description Required: Please enter now :)");
            clearFocus();
          }
   }

function changeDestinationList(position)
  {
    var arrays = DestinationList[position];
    arrays = arrays.split(",");
      var e1 = arrays[0];
      var e2 = arrays [1];

    var ReplacedAmount = e2.replace(/\$/g, '');
      var eitem = prompt("Please enter new item:", e1);
      var ecost = prompt("Please enter your name:", ReplacedAmount);
      DestinationList[position] = eitem + "," + '$' + ecost;
      displayDestinationList();
      displayTravelBucket();
      
      saveCookie();
  }

function changeTravelBucket(position)
  {
    document.getElementById("MyCart").innerHTML = DestinationList[position];
    var arrays = addtoTravelBucket[position];
    arrays = arrays.split(",");
      var e1 = arrays[0];
      var e2 = arrays[1];
    
    var ReplacedAmount = e2.replace(/\$/g, '');
      var eitem = prompt("Please enter new item:", e1);
      var ecost = prompt("Please enter your name:", ReplacedAmount);
      DestinationList[position] = eitem + "," + '$' + ecost;
      displayDestinationList();
      displayTravelBucket();

      saveCookie();
  }

function addbacktoDestinationList(item, num)
  {
    deleteTravelBucket(num);
    DestinationList.push(item);
    
    displayDestinationList();

    displayTravelBucket();
    clearFocus();

    saveCookie();
  }

function addtoTravelBucket(item, num)
  {
    document.getElementById("sharelist").innerHTML = ' ';
    deleteDestinationList(num);
    addtoTravelBucket.push(item);
    
    displayDestinationList();

    displayTravelBucket();
    clearFocus();

    saveCookie();
  }

function deleteDestinationList(position)
  {
    document.getElementById("sharelist").innerHTML = ' ';
    DestinationList.splice(position, 1);
    displayDestinationList();
    displayTravelBucket();

    saveCookie();
  }

function deleteTravelBucket(position)
  {
    document.getElementById("sharelist").innerHTML = ' ';
    addtoTravelBucket.splice(position, 1);
    displayDestinationList();
    displayTravelBucket();
  }

function clearFocus()
  {
    //document.getElementById("cost").value = "";
    
    document.getElementById("item").value = "";
    document.getElementById("item").focus();
  }
