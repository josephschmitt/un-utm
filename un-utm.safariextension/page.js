if (window.top === window) {
	function replaceUrlParam(url, paramName, paramValue){
	    var pattern = new RegExp('('+paramName+'=).*?(&|$)');
	    var newUrl = url;

	    if (url.search(pattern) >= 0){
	        newUrl = url.replace(pattern, '$1' + paramValue + '$2');

	    	if (!paramValue) {
	    		newUrl = newUrl.replace(new RegExp(paramName + '='), '').replace(/&&/, '&').replace(/\?&/, '?');
	    	}
	    }
	    // No more url params
	    if (newUrl.search(/(=).*?(&|$)/) < 0) {
	    	newUrl = newUrl.replace(/\?/, '');
	    }
	    return newUrl;
	}

	function doReplace() {
		var utm_keys = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign'];
		var url = window.location.toString();
		utm_keys.forEach(function(key) {
			url = replaceUrlParam(url, key, '');
		});

		if (!window.location.search) {
	    	url = url.replace(/\?/, '');
	    }
	    
		window.history.replaceState(null, null, url);
	}

	window.addEventListener('load', function() {
		doReplace();
	});
}