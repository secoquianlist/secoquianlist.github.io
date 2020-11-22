
window.onload = function()
  {
    alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Students**\n\nQuestions?\nemail Professor Chuck Konkol\nc.konkol@rockvalleycollege.edu\n\nRegister @ RockValleyCollege.edu");
    populateshoppingListsonload();
    displayShoppinglists();
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
 var url = "https://secoquianlist.github.io/index.html?list="+ shoppinglist;
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
   window.prompt("Copy & Share List!", text);
  }

function about()
  {
    alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Students**\n\nQuestions?\nemail Professor Chuck Konkol\nc.konkol@rockvalleycollege.edu\n\nRegister @ RockValleyCollege.edu");
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

function ReplacedAmount(str)
  {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
      str = str.replace(/%20/g, "");
      str = str.replace(/%24/g, "$");
      str = str.replace(/%7C/g, " | ");
      return str.replace(/[^\x20-\x7E]/g, '');
  }

function saveCookie()
  {
    delete_cookie('secoquianlist')
    var date = new Date();
      date.setTime(date.getTime() + Number(365) * 3600 * 1000);
      document.cookie = 'secoquianlist' + "=" + escape(shoppingLists.join(',')) + "; path=/;expires = " + date.toGMTString();
  }

function delete_cookie(name)
  {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

function populateshoppingListsonload()
  {
    shoppingLists = [];
    addtoCart = [];

    var y = readCookie('secoquianlist');
    y = remove_unwanted(y);
    
    var geturllistvalue = get("list");
    if (geturllistvalue) 
      {
       geturllistvalue = remove_unwanted(geturllistvalue);
       geturllistvalue = geturllistvalue.split(',');
       shoppinglist = geturllistvalue;
      } else if (y)
        {
         y = y.split('%2C');
         shoppinglist = y;
        }
   }

var MyItems = 
  {
    name:"",
    price:""
  };

var shoppingLists = [];
var addtoCart = [];

function displayshoppingLists() 
  {
    var TheList = "";
    var arrayLength = shoppingLists.length;

    for (var i = 0; i < shoppingLists.length; i++) 
      {
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteshoppingLists(' + i + ')" />';
        var arrays = shoppingLists[i];
        arrays = "'" + arrays + "'";
        var btnaddcart =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopCart('+arrays+',' + i + ')" />Add</label>';

        TheRow = "<li>" + shoppingLists[i] + btndelete + ' ' + ' ' + btnaddcart + '</li>';

        TheList += TheRow;
      }
    if (arrayLength > 0)
      {
        document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
      } else 
        {
          document.getElementById("MyList").innerHTML = '';
        }
  }

function displayshoppingCart() 
  {
    var TheList = "";
    var TheRow = "";
    var arrayLength = addtoCart.length;
    for (var i = 0; i < arrayLength; i++) 
      {
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove" onclick="deleteshoppingCart(' + i + ')" />';
        var arrays = addtoCart[i];
        arrays = "'"+arrays+"'";
        var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppingLists('+arrays+',' + i + ')" checked="checked"/>Add</label>';

        var btnsharelist = '<input class="button" id="shares" name="shares" type="submit" value="Share Shopping List" onclick="share()" />';
        
        TheRow = "<li>" + addtoCart[i] + btndelete + ' ' + ' ' + btnaddlist + '<br></li>';

        TheList += TheRow;
      }
    if (arrayLength > 0)
      {
        document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
        document.getElementById("sharebutton").innerHTML = btnsharelist;
      } else 
        {
          document.getElementById("MyCart").innerHTML = '';
          document.getElementById("sharebutton").innerHTML = ' ';
          document.getElementById("sharelist").innerHTML = ' ';
        }
    }

function addshoppingLists(item,cost)
  {
    var groc = "";
    var count = 0;
    MyItems.name = item;
    MyItems.price = cost;
    
    for (var x in MyItems)
      {
        if (count === 1){
          groc += "$";
        }
        groc += MyItems[x];
        if (count === 0){
          groc += " | ";
        }
        count++;
      }

    shoppingLists.push(groc);
    displayshoppingLists();
    
    displayshoppingCart();
    clearFocus();

    saveCookie();
  }

function changeshoppingLists(position)
  {
    var arrays = shoppingLists[position];
    arrays = arrays.split(",");
      var e1 = arrays[0];
      var e2 = arrays [1];

    var ReplacedAmount = e2.replace(/\$/g, '');
      var eitem = prompt("Please enter new item:", e1);
      var ecost = prompt("Please enter your name:", ReplacedAmount);
      shoppingLists[position] = eitem + "," + '$' + ecost;
      displayshoppingLists();
      displayshoppingCart();
      
      saveCookie();
  }

function changeshoppingCart(position)
  {
    document.getElementById("MyCart").innerHTML = shoppingLists[position];
    var arrays = addtoCart[position];
    arrays = arrays.split(",");
      var e1 = arrays[0];
      var e2 = arrays[1];
    
    var ReplacedAmount = e2.replace(/\$/g, '');
      var eitem = prompt("Please enter new item:", e1);
      var ecost = prompt("Please enter your name:", ReplacedAmount);
      shoppingLists[position] = eitem + "," + '$' + ecost;
      displayshoppingLists();
      displayshoppingCart();

      saveCookie();
  }

function addbacktoshoppingLists(item, num)
  {
    deleteshoppingCart(num);
    shoppingLists.push(item);
    
    displayshoppingLists();

    displayshoppingCart();
    clearFocus();

    saveCookie();
  }

function addtoshopCart(item, num)
  {
    deleteshoppingLists(num);
    addtoCart.push(item);
    
    displayshoppingLists();

    displayshoppingCart();
    clearFocus();

    saveCookie();
  }

function deleteshoppingLists(position)
  {
    shoppingLists.splice(position, 1);
    displayshoppingLists();
    displayshoppingCart();

    saveCookie();
  }

function deleteshoppingCart(position)
  {
    addtoCart.splice(position, 1);
    displayshoppingLists();
    displayshoppingCart();
  }

function clearFocus()
  {
    document.getElementById("cost").value = "";
    
    document.getElementById("item").value = "";
    document.getElementById("item").focus();
  }
