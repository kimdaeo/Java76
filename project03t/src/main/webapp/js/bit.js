function bit(selector) {
	var el;
	
	if (selector.indexOf("<") == 0) { 
		// selector 값이 < 로 시작한다면; 예) <p>
		// 태그를 생성하여 배열에 담는다.
		var tagName = selector.substr(1, selector.length - 2);
		el = [document.createElement(tagName)];
	} else {
		// DOM API를 통해 찾은 순순한 태그 목록
		el = document.querySelectorAll(selector);		
	}
	
	// 태그 목록에 도우미 함수 추가 
	el.click = function(listener) {
	  for (var i = 0; i < this.length; i++) {
		if (this[i].addEventListener) {
		  this[i].addEventListener('click', listener);
		} else { // <= IE8
		  this[i].attachEvent('onclick', listener);
		}
	  }
	};
	
	// 폼 항목의 값을 설정하는 함수 추가 => getter/setter 겸용!
	el.val = function(value) {
	  if (value == undefined) { //getter로 활용됨 
		return this[0].value; // 목록에서 첫 번째 값만 리턴한다.
	  } else {
		for (var i = 0; i < this.length; i++) {
		  this[i].value = value;
		}
	  }
	};
	
	// innerHTML 값을 다루는 함수
	el.html = function(value) {
	  if (value == undefined) { //getter로 활용됨 
		return this[0].innerHTML; // 목록에서 첫 번째 값만 리턴한다.
	  } else { //setter로 사용됨 
		for (var i = 0; i < this.length; i++) {
		  this[i].innerHTML = value;
		}
	  }
	};
	
	// textContext 값을 다루는 함수 
	el.text = function(value) {
	  if (value == undefined) { //getter로 활용됨 
		var str = '';
		for (var i = 0; i < this.length; i++) {
		  str += this[i].textContent;
		}
		return str;
	  } else { //setter로 사용됨 
		for (var i = 0; i < this.length; i++) {
		  this[i].textContent = value;
		}
	  }
	};
	
	// innerHTML 값을 다루는 함수
	el.append = function(children) {
	  // 부모 태그 반복하기 
      for (var i = 0; i < this.length; i++) {
    	    // 부모에 자식들을 붙인다.
		for (var x = 0; x < children.length; x++) {
		  this[i].appendChild(children[x]);
		}
	  }
	};
	
	return el;  // 도우미 함수가 태그 목록을 리턴한다. 
}

var $ = bit;

bit.ajax = function(url, settings) {
  var xhr = null;

  try {
	xhr = new XMLHttpRequest();
  } catch (e) {
	try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	  try { 
	    xhr = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (e) {
		alert("이 브라우저는 AJAX를 지원하지 않습니다.");
		return;
	  }
	}
  }

  xhr.onreadystatechange = function(event) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        if (settings.success) {
        	  if (settings.dataType == 'json') {
        		settings.success(JSON.parse(xhr.responseText));  
        	  } else {
        		settings.success(xhr.responseText);
        	  }
        }  
      } else {
        if (settings.error) 
        	  settings.error(xhr.responseText);
      } 
    }
  };
  
  if (settings.method == undefined)
	settings.method = 'GET';
  
  xhr.open(settings.method, url, true);
  
  xhr.setRequestHeader("Accept", "application/json");
  
  if (settings.method == 'POST') {
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var queryString = '';
	if (settings.data != undefined) {
	  if (queryString.length > 0) 
		queryString += '&';
	  for (var propName in settings.data) {
		queryString += propName + '=' + settings.data[propName];
	  }
	}
    xhr.send(queryString);
    
  } else {
	xhr.send();
  }
};










