//entity
var READY_STATE = 4;
var LOAD_WEB_OK = 200;
var text = '{"subject":[' +
  '{"name":"physic","id":"subject1" },' +
  '{"name":"math","id":"subject2" },' +
  '{"name":"art","id":"subject3" }]}';
var obj = JSON.parse(text);
var lst = obj.subject;

window.addEventListener('load', loadTable);



// ajax to show modal
function showModal(modal) {


  var xhttp;
  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhttp.onreadystatechange = function() {
    if (this.readyState === READY_STATE && this.status === LOAD_WEB_OK) {
      document.getElementById("list_categories").innerHTML = this.responseText;
      if (modal === 'detail.html') {
        init();
        var back = document.getElementById('back-button');
        back.addEventListener('mousedown', showCategories);
      }
      if (modal === 'subjectmenu.html') {
        initEventCategories();
        var back = document.getElementById('back-button');
        back.addEventListener('mousedown', showDetail);
      }
      if (modal === 'searchmenu.html') {
        var searchInput = document.getElementById('search_input');
        searchInput.addEventListener('change', search);
      }
      if (modal === 'settingmenu.html') {
        document.getElementById('log-out-button').addEventListener('click', logOut);
        document.getElementById('clear-button').addEventListener('click', clearTable);
      }
    }
  };
  xhttp.open("GET", "./modal/" + modal, true);
  xhttp.send();
}


// remove all child faster
function removeAllChild(id) {
  var myNode = document.getElementById(id);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}



//fill subject with json
function addOneSubject(sub) {
  var a = document.createElement('a');
  var li = document.createElement('li');
  var ct = document.createTextNode(sub.name);
  li.appendChild(ct);
  a.appendChild(li);
  a.setAttribute("href", "#");
  a.setAttribute("id", sub.id);
  a.setAttribute("onmousedown", "startDrag(event)");

  document.getElementById("search_display").appendChild(a);
}

//fill subject data
function fillData() {
  removeAllChild("search_display");

  for (var i = 0; i < lst.length; i++) {
    addOneSubject(lst[i]);
  }
}

//search subject by name
function searchByName(name) {
  removeAllChild("search_display");
  for (var i = 0; i < lst.length; i++) {
    if (lst[i].name.includes(name))
      addOneSubject(lst[i]);
  }
}

//search Funciton
function search() {
  var nameSearch = document.getElementById("search_input").value;
  document.getElementById("search_input").value = '';
  if (nameSearch === "") {
    fillData();
  } else {

    searchByName(nameSearch);
  }

}

//clear table
function clearTable() {
  for (var i = 1; i < 8; i++) {
    for (var j = 1; j < 7; j++) {
      var idtxt = "td" + i + "_" + j;
      removeAllChild(idtxt);
    }
  }
}

//save table
function saveTable() {
  var user = getCookie("xxx");
  removeStyle("li");
  for (var i = 1; i < 8; i++) {
    for (var j = 1; j < 7; j++) {
      var idtxt = "td" + i + "_" + j;
      var data = document.getElementById(idtxt).innerHTML;

      setCookie(user + idtxt, data, 31);
    }
  }
}

function removeStyle(tagName) {
  var x = document.getElementsByTagName(tagName);
  for (var i = 0; i < x.length; i++) {
    x[i].removeAttribute("style");
  }
}

//load table
function loadTable() {
  fillAcc();
  var user = getCookie("xxx");
  for (var i = 1; i < 8; i++) {
    for (var j = 1; j < 7; j++) {
      var idtxt = "td" + i + "_" + j;
      var data = getCookie(user + idtxt);
      if (data != "") {
        document.getElementById(idtxt).innerHTML = data;

      }
    }
  }
  initEventCategories();
  initEventItem();
}

//init Event item
function initEventItem() {
  var menuItem = document.getElementById('menu_item');
  var searchItem = document.getElementById('search_item');
  var settingItem = document.getElementById('setting_item');
  var saveItem = document.getElementById('save-button');
  menuItem.addEventListener('click', showCategories);
  searchItem.addEventListener('click', showSearch);
  settingItem.addEventListener('click', showSetting);
  saveItem.addEventListener('click', confirmSaveData);
}

//init event for categories
function initEventCategories() {
  for (var i = 1; i < 5; i++) {
    var category = document.getElementById('cate' + i);
    category.addEventListener('click', showDetail);

  }

}
//when click each catefory will show detail
function showDetail() {
  showModal('detail.html');
}

//when click back button will show categories
function showCategories() {
  showModal('subjectmenu.html');
}


//when click search Item
function showSearch() {
  showModal('searchmenu.html');
}

//when click settingItem
function showSetting() {
  showModal('settingmenu.html');
}

//submit
function confirmSaveData() {
  var txt;
  var r = confirm("Do You want to Save this data");
  if (r == true) {
    saveTable();
  } else {
    txt = "You pressed Cancel!";
  }
}