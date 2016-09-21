

var GoogleFetch = function() {
	const request = 'https://sheets.googleapis.com/v4/spreadsheets/1xMjMsQ_nLzSHMhL63wz6Rt19rr9HHHqgqHjCztHptYs/values/B2:K?key=AIzaSyA77u9rK7o_jskCARMY6LiCNO6aMIzYgMo';
	fetch(request).then(
		function(response) {
			var contentType = response.headers.get("content-type");
			if(contentType && contentType.indexOf("application/json") !== -1) {
				return response.json().then(function(json) {
					console.log(json);
					var max = 0;
					var result = {
						grid: []
					};
					json.values.forEach(function(row, z) {
						row.forEach(function(entry, x) {
							if (entry.length > 0) {
								var values = entry.split(":");
								var data = {
									x: x,
									z: z,
									value: values[0],
									title: (values.length > 1) ? values[1] : "Unknown"
								};
								if (values.length > 2) {
									data.model = values[2];
								}
								result.grid.push(data);
								if (values[0] > max) {
									max = values[0];
								}
							}
						});
					});
					result.grid.forEach(function(data) {
						data.scaley = data.value / max;
					});
					console.log(result);
					return result;
				});
			} else {
				console.log("JSON error!");
				return null;
			}
		},
		function(reason) {
			console.log("FETCH error! Reason: " + reason);
			return null;
		}
	);
};

