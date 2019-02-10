import api, { createApiAction } from '../../utils/api';

const URL = "https://api.alexvangroningen.nl/employer";

/**
 * partners: {
 *   id: 0,
 *   code: '',
 * }
 */

const initialState = {
	data: {},
	loading: false,
	error: null,
};

// Action constants
export const LOAD = createApiAction('partners/LOAD');

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case LOAD.REQUEST:
			return {
				...state, loading: true, error: null
			}
		case LOAD.FAIL:
			return { ...state, loading: false, error: action.data };
		case LOAD.SUCCESS: {
			console.log("action:::", action);

			return { ...state, data: action.payload }
		}
		default:
			return state
	}
}

// Selectors

// Actions
export const load = () => (
	api(LOAD, ({ get }) => get(URL))
);