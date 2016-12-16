import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import validateInput from '../../../server/shared/validations/signup';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

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
			timezone: ''
		};
		// This way, we have the proper context in this function
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
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
				.then(() => {})
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
					onChange={this.handleChange}
					value={this.state.username}
					field="username"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
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
					field="password"
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
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;
