var acc = '{"account":[{"name":"ntq","pass":"123456a"},{"name":"nam","pass":"123456b"}] }';
var data = JSON.parse(acc);
var listAccount = data.account;

var form = document.getElementById('form-login');
form.addEventListener('submit', submitForm);

function submitForm(){
	return validateData();
}
window.addEventListener('load',checkSession);


function setCookie(cname, cvalue, exdays) {

	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function delCookie(cname) {
	setCookie(cname, "", -1);
}

//get cookie by Name
function getCookie(cName) {

	cName = cName + "=";
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var ck = cookies[i];
		while (ck.charAt(0) == ' ') {
			ck = ck.substring(1); // remove space
		}
		if (ck.indexOf(cName) == 0) {
			return ck.substring(cName.length, ck.length);
		}
	};


	return "";
}


//check acc use for validate data fucntion Below
function checkExistAcc(name, pass) {

	for (var i = 0; i < listAccount.length; i++) {
		var n = listAccount[i].name.toUpperCase();
		var p = listAccount[i].pass;

		if (name == n && pass == p)
			return true;
	}
	return false;
}

//if user = ntq and pass = 123465a  => setcookie and redirect opp.html , other wise show Error
function validateData() {
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pwd").value;
	user = user.toUpperCase();

	if (checkExistAcc(user, pass)) {
		setCookie("xxx", user, 31);
		return true;
	} else {
		document.getElementById("message").innerHTML = "Password or username Wrong!!!";
		return false;
	}
	return true;
}

// check session if have cookie already => redirect to opp.hmtl 
function checkSession() {

	var user = getCookie("xxx");
	if (user != "") {
		window.location.href = "opp.html";
		return true;
	}
}

// fill information account
function fillAcc() {

	var user = getCookie("xxx");
	if (user != "") {
		document.getElementById("acc").innerHTML = "<h1>" + user + "'s TimeTable </h1>";
		return true;
	} else {
		window.location.href = "login.html";
		return true;
	}
}

//log out
function logOut() {
	delCookie("xxx");
	window.location.href = "login.html";
}
