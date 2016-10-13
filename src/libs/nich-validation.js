function validateNameId(data) {
	var re = /^[0-9]{1,15}$/;
	return re.test(data);
}

function validateName(data) {
	var re = /^[a-zA-ZА-Яа-я ]{1,30}$/;
	return re.test(data);
}

function validateArticle(data) {
	var re = /^[a-zA-ZА-Яа-я0-9()\-_.,:;#$%!^*+=?<>'"\\/@ ]{1,30}$/;
	return re.test(data);
}

function validateFloat(data) {
	var re = /^[0-9.]{1,15}$/;
	return re.test(data);
}

function validateTime(data) {
	var re = /^(((2[0-4]|1[0-9]|0[1-9]|[1-9])([: .,;-_/]{1,3})?(([1-5]?[0-9]|0[0-9]))?)|((0[0-9]|[0-9])([: .,;-_/]{1,3}([1-5][0-9]|[1-9]|0[1-9]))))$/;
	return re.test(data);
}

function validateInt(data) {
	var re = /^[0-9]{1,15}$/;
	return re.test(data);
}

function validateData(data, jsonName) {
	switch (jsonName) {
		case 'nameId':
			return validateNameId(data);

		case 'name':
			return validateName(data);

		case 'article':
			return validateArticle(data);

		case 'time':
		case 'fullTime':
			return validateTime(data);

		case 'rateWeekday':
		case 'rateWeekend':
		case 'amount':
		case 'boxes':
		case 'inBox':
			return validateInt(data);

		default:
			console.log("chn-validation / switch:default = Error Parameter");
			return false
	}
}

export function validate(newData, jsonName, error, action, index) {
	let data = ('' + newData).trim();
	let val = validateData(data, jsonName);

	if (error === undefined) {
		console.log(`VALIDATION: ${data}/${jsonName} | val:${val}`);
		return {validation: val};
	}

	let errorName = `${jsonName}ErrorText`;
	let errorItem = error;
	if (index !== undefined) {
		errorItem = error[index];
	}
	let errorTextAtStart = errorItem[errorName];

	console.log(`ERRPR: index\ ${index}:`, errorItem);
	console.log("ERROR Item!: " + errorItem[errorName]);

	console.log(`chn-validation / input ${jsonName} changed and validation: ${val}/${data}"`);

	if (val == true) {
		//result = {...result, [jsonName]: data}
		if (action === undefined) {
			console.log('WARNING: nich-validation/ ACTION UNDEFINED!');
		} else
		if (index === undefined) {
			action(data); // action action- inputChanged
		} else {
			action(data, index);
		}

		// reset Text
		errorItem[errorName] = '';
		error[index] = errorItem;
		return {Error: error,
			validation: val};
	} else {
		errorItem[errorName] = `Validation Error ${jsonName}`;
		console.log("ErrorName: ", errorItem[errorName]);
		error[index] = errorItem;
	}

	// call action?setState(by return 1) only once, when error changed
	if (errorTextAtStart != `Validation Error ${jsonName}`) {
		return {Error: error,
			validation: val};
	}

	return {Error: error,
		validation: val}; //'DenySetState' errorText again
}
