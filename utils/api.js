import axios from 'axios';
import pick from 'lodash.pick';

let axiosInstance = axios.create();

export const updateApi = config => { axiosInstance = axios.create(config); };

export const createApiAction = (name = '') => {
	const prefix = name.split('/').join(' / ');

	return {
		REQUEST: `${prefix} / REQUEST`,
		SUCCESS: `${prefix} / SUCCESS`,
		FAIL: `${prefix} / FAIL`,
	};
};

export const makeRequest = (method, url, options = {}) => {
	const { data, params } = options;
	const headers = { ...axiosInstance.defaults.headers, ...options.headers };

	return axiosInstance({ method, url, data, params, headers })
		.then(response => pick(response, ['data', 'status', 'headers']))
		.catch(error => (
			error.response
				? Promise.reject({ error: true, ...pick(error.response, ['data', 'status', 'headers']) })
				: Promise.reject({ error: error.message })
		));
};

export const get = (url, config) => makeRequest('get', url, config);
export const post = (url, config) => makeRequest('post', url, config);
export const put = (url, config) => makeRequest('put', url, config);
export const patch = (url, config) => makeRequest('patch', url, config);
export const del = (url, config) => makeRequest('delete', url, config);
export const requestHandlers = { get, post, put, patch, del };

/**
 * Redux API helper for request -> success/fail flow
 * @param apiAction - can be created using `createApiAction`
 * @param cb - callback which executes requests
 * @returns {function(*, *)}
 */

export default (apiAction, cb, metadata) => dispatch => {
	dispatch({ type: apiAction.REQUEST, metadata });

	return cb(requestHandlers)
		.then(response => pick(dispatch({ type: apiAction.SUCCESS, metadata, ...response }), ['data', 'status', 'headers']))
		.catch(error => {
			if (error.error) {
				dispatch({ type: apiAction.FAIL, metadata, ...error });

				if (error.status === 401) { // UNAUTHORIZED
					// eslint-disable-next-line global-require
					// dispatch(require('../store/modules/auth').discardToken());
				}
			} else {
				console.error(error);
			}

			throw error;
		});
};