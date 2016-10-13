export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		console.log(" forFetch = OK");
		return 1;
	} else {
		console.log(" forFetch = ERROR");
		var error = new Error(response.statusText);
		error.response = response;
		return error;
	}
}

export function parseJSON(response) {
	return response.json()
}

export function getJsonObject(data) {
	var object = {
		method: 'post',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(data)
	}
	return object;
}
