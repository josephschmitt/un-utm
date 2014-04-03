if (window.top === window) {
	var getParams = function () {
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		var pair;

		for (var i=0;i<vars.length;i++) {
			pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
			} 
			// If second entry with this name
			else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]], decodeURIComponent(pair[1]) ];
				query_string[pair[0]] = arr;
			} 
			// If third or later entry with this name
			else {
			  query_string[pair[0]].push(pair[1]);
			}
		}

		return query_string;
	};

	var serialize = function(obj, prefix) {
	  var str = [];
	  for(var p in obj) {
	    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
	    str.push(typeof v == "object" ?
	      serialize(v, k) :
	      encodeURIComponent(k) + "=" + encodeURIComponent(v));
	  }
	  return str.join("&");
	};

	function doReplace() {
		var params = getParams();
		var utm_keys = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign'];
		utm_keys.forEach(function(key) {
		  delete params[key];
		});

		var query = serialize(params);
		window.history.replaceState(params, null, window.location.origin + window.location.pathname + (query ? '?' + query : '') );
	}

	doReplace();
}