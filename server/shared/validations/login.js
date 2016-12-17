import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { login } from '../../../client/actions/login';

export default function validateInput(data) {
	let errors = {};

	if (Validator.isEmpty(data.identifier)) {
		errors.identifier = 'This field is required';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'This field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}
