import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';

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

	handleChange(e) {
		this.setState({	
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ errors: {}, isLoading: true });
		this.props.userSignupRequest(this.state)
			.then(() => {})
			.catch(errors => {
				this.setState({ errors : errors.response.data, isLoading: false })
			});
	}

	render() {
		const { errors } = this.state;
		const options = map(timezones, (val, key) =>
			<option key={val} value={val}>{key}</option>
		);

		return (
			<form onSubmit={this.handleSubmit}>
				<h1>Join our community</h1>
				<div className={classnames("form-group", { 'has-error': errors.username })}>
					<label className="control-label">Username</label>
					<input
						type="text"
						name="username"
						className="form-control"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					{errors.username && <span className="help-block">{errors.username}</span>}
				</div>
				<div className={classnames("form-group", { 'has-error': errors.email })}>
					<label className="control-label">Email</label>
					<input
						type="text"
						name="email"
						className="form-control"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					{errors.email && <span className="help-block">{errors.email}</span>}
				</div>
				<div className={classnames("form-group", { 'has-error': errors.password })}>
					<label className="control-label">Password</label>
					<input
						type="password"
						name="password"
						className="form-control"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					{errors.password && <span className="help-block">{errors.password}</span>}
				</div>
				<div className={classnames("form-group", { 'has-error': errors.passwordConfirmation })}>
					<label className="control-label">Password Confirmation</label>
					<input
						type="password"
						name="passwordConfirmation"
						className="form-control"
						value={this.state.passwordConfirmation}
						onChange={this.handleChange}
					/>
					{errors.passwordConfirmation && 
							<span className="help-block">{errors.passwordConfirmation}</span>
					}
				</div>
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
