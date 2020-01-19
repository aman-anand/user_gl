import axios from "axios";
import ApiList from "../config/apiList.json";
import qs from "querystring";

export const aadharUpload = requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
    };
    console.log(requestBody);
	return axios.post(`${ApiList.env}${ApiList.endpoint.uploadDocument}`, qs.stringify(requestBody), config);
};
export const documentCategoryUuid = requestBody => {
	const config = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
    };
    console.log(qs.stringify(requestBody));
	return axios.post(`${ApiList.env}${ApiList.endpoint.documentCategoryUuid}`, qs.stringify(requestBody), config);
};


// export const otherDetailsAddReference = requestBody => {
// 	const config = {
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		}
// 	};
// 	return axios.post(`${ApiList.env}${ApiList.endpoint.addReferenceDetails}`, qs.stringify(requestBody), config);
// };
