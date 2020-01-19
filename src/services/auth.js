import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

export const signUp = async datastring => {
	return await axios.post(`${ApiList.env}${ApiList.endpoint.signUp}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
export const signUp2 = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.signUp2}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
export const signIn = datastring => {
	return axios.post(`${ApiList.envmin}${ApiList.endpoint.signIn}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
export const sendOtp = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.sendOtp}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

export const verifyPhone = datastring => {
	return axios.post(`${ApiList.env}${ApiList.endpoint.verifyPhone}`, qs.stringify(datastring), {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
