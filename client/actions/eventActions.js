import axios from 'axios';

export default function createEvent(event) {
	return dispatch => {
		return axios.post('/api/events', event);
	}
}
