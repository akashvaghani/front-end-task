import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'underscore';
import axios from 'axios';

export default function Signup(props) {
	const [state, setState] = useState({ firstName: '', lastName: '', email: '', gender: 'male', password: '', confirmPassword: '' })
	const [errorMessage, setErrorMessage] = useState('');

	function handleChange(event) {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	function handleSignup(e) {
		e.preventDefault()
		if(state.password !== state.confirmPassword) {
			setErrorMessage('Password and confirm password does not match')
		} else {
			setErrorMessage('')
			const data = _.omit(state, 'confirmPassword')
			axios.post('http://localhost:4000/createUser', data, { headers: { 'authorization': localStorage.getItem("auth_token") } })
			.then(function (res) {
				props.history.push('/login')
			})
			.catch(function (error) {
				setErrorMessage(error.response.data.message)
			});
		}
	}

  	if (localStorage.getItem("auth_token")) return <Redirect to='/home' />

	return (
	<div className="signup-page">
		<form className="my-5" onSubmit={handleSignup}>
			<div className="m-t-10">
				<div>First Name</div>
				<input type="text" className="form-control" name="firstName" value={state.firstName} onChange={handleChange} placeholder="First Name" maxLength="30" required />
			</div>
			<div className="m-t-10">
				<div>Last Name</div>
				<input type="text" className="form-control" name="lastName" value={state.lastName} onChange={handleChange} placeholder="Last Name" maxLength="30" required />
			</div>
			<div className="m-t-10">
				<div>Email</div>
				<input type="email" className="form-control" name="email" value={state.email} onChange={handleChange} placeholder="johndoe@domain.com" required />
			</div>
			<div className="m-t-10">
				<div>Gender</div>
				<input type="radio" id="male" name="gender" value="male" id="male" className="w-auto" onChange={handleChange} checked={state['gender'] === 'male'} />
				<label htmlFor="male">Male</label>
				<input type="radio" id="female" name="gender" value="female" id="female" className="w-auto" onChange={handleChange} checked={state['gender'] === 'female'} />
				<label htmlFor="female">Female</label>
			</div>
			<div className="m-t-10">
				<div>Password</div>
				<input type="password" className="form-control" name={'password'} value={state.password} onChange={handleChange} minLength="6" placeholder={'Password'} required />
			</div>
			<div className="m-t-10">
				<div>Confirm Password</div>
				<input type="password" className="form-control" name={'confirmPassword'} value={state.confirmPassword} onChange={handleChange} minLength="6" placeholder={'Confirm Password'} required />  				
			</div>
			<button type="submit" className="m-t-10">Register</button>
		</form>
		{errorMessage && (
			<div className="error-msg m-t-10"> {errorMessage} </div>
		)}
		<span className="pull-left m-t-10"><a href="/login" className="text-primary text-decoration-none">Login</a></span>
	</div>
	);
}