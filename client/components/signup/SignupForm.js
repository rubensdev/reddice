import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import validateInput from '../../../server/shared/validations/signup';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import { browserHistory } from 'react-router';
import isEmpty from 'lodash/isEmpty';

class SignupForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			errors: {},
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			timezone: '',
			invalid: false
		};
		// This way, we have the proper context in this function
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.checkUserExists = this.checkUserExists.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	checkUserExists(e) {
		const field = e.target.name;
		const val = e.target.value;

		if (val !== '') {
			this.props.isUserExists(val).then(res => {
				let errors = this.state.errors;

				if (res.data.user) {
					errors[field] = 'There is user with such ' + field;
				} else {
					delete errors[field];
				}
				this.setState({ errors, invalid: !isEmpty(errors) });
			});
		}
	}

	handleChange(e) {
		this.setState({	
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.isValid()) {
			this.setState({ isLoading: true });
			this.props.userSignupRequest(this.state)
				.then(() => {
					//browserHistory.push('/');
					this.props.addFlashMessage({
						type: 'success',
						text: 'You signed up successfuly. Welcome!'
					});
					this.context.router.push('/');
				})
				.catch(errors => {
					this.setState({ errors : errors.response.data, isLoading: false })
				});
		}
	}

	render() {
		const { errors } = this.state;
		const options = map(timezones, (val, key) =>
			<option key={val} value={val}>{key}</option>
		);

		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Join our community</h1>

				<TextFieldGroup
					error={errors.username}
					label="Username"
					checkUserExists={this.checkUserExists}
					onChange={this.handleChange}
					value={this.state.username}
					field="username"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
					checkUserExists={this.checkUserExists}
					onChange={this.handleChange}
					value={this.state.email}
					field="email"
				/>

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.handleChange}
					value={this.state.password}
					field="password"
					type="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.handleChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
					type="password"
				/>

				<div className={classnames("form-group", { 'has-error': errors.timezone })}>
					<label className="control-label">Timezone</label>
					<select
						className="form-control"
						name="timezone"
						onChange={this.handleChange}
						value={this.state.timezone}
					>
						<option value="" disabled>Choose Your Timezone</option>
						{options}
					</select>
					{errors.timezone && <span className="help-block">{errors.timezone}</span>}
				</div>

				<div className="form-group">
					<button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired,
	isUserExists: React.PropTypes.func.isRequired
};

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default SignupForm;
