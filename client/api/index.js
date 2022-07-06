const BASE_URL = "http://192.168.2.21:3000/api"

function post(parma) {
	return uni.request({
		header: {
			sign: 1,
			token: uni.getStorageSync("token")
		},
		method: "POST",
		...parma
	});
}

export function reqRegister(data) {
	return post({
		url: BASE_URL + '/user/register',
		data
	});
}

export function reqLogin(data) {
	return post({
		url: BASE_URL + '/user/login',
		data
	});
}


export function reqFindAllUser(data) {
	return post({
		url: BASE_URL + '/user/search',
		data
	});
}


export function reqAddFirend(data) {
	return post({
		url: BASE_URL + '/user/add/firend',
		data
	});
}
