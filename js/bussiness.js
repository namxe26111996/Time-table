// var READY_STATE = 4;
// var STATUS_STATE = 200;
// function ajax(url,beforeSend,afterSend) {
// 	var xhttp;
// 	if (window.XMLHttpRequest) {
// 		xhttp = new XMLHttpRequest();
// 	} else {
// 		xhttp = new ActiveXObject('Microsoft.XMLHTTP');
// 	};

// 	xhttp.onreadstatechange = function(err) {
// 		if(this.readyState === READY_STATE && this.status === STATUS_STATE){
// 			if(afterSend)
// 			{
// 				afterSend(this.responseText);
// 			}
// 		}
// 	};
// 	if(beforeSend)
// 	{
// 		beforeSend();
// 	}

// 	xhttp.open('GET',url,true);
// 	xhttp.send();
// }