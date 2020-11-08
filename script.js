
window.onload = function()
  {
    alert("Welcome to 'Shopping List' App!\n\nCreated by Rock Valley College\n**Javascript(Web233) Students**\n\nQuestions?\nemail Professor Chuck Konkol\nc.konkol@rockvalleycollege.edu\n\nRegister @ RockValleyCollege.edu");
    populateshoppinglistonload();
    displayShoppinglists();
    clearFocus();
  };

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
    y = y.split('%2C');
    if (y)
      {
        shoppingLists = y;
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
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteshoppingLists(' + i + ')" />';
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
        var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteshoppingCart(' + i + ')" />';
        var arrays = addtoCart[i];
        arrays = "'"+arrays+"'";
        var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppingLists('+arrays+',' + i + ')" checked="checked"/>Add</label>';

        TheRow = "<li>" + addtoCart[i] + btndelete + ' ' + ' ' + btnaddlist + '<br></li>';

        TheList += TheRow;
      }
    if (arrayLength > 0)
      {
        document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
      } else 
        {
          document.getElementById("MyCart").innerHTML = '';
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
