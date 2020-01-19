import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

export const loanDropDown = async () => {
	return await axios.get(`${ApiList.env}${ApiList.endpoint.loanDropDown}?access_token=e555348a-731d-441c-a092-3764a5cd9f1a`);
};

export const cityList = () => {
	return axios.get(`${ApiList.env}${ApiList.endpoint.cityList}`, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};

export const employmentType = () => {
	return axios.get(`${ApiList.env}${ApiList.endpoint.employmentTypeDropdown}`, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
};
