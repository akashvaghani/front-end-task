import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {
	const [state, setState] = useState({ email: '', password: '' })
	const [errorMessage, setErrorMessage] = useState('');

	function handleChange(e) {
		setState({ ...state, [e.target.name] : e.target.value })
	}

	function handleLogin(e) {
		e.preventDefault()
		const data = { email: state.email, password: state.password }
		axios.post('http://localhost:4000/authorization', data, { headers: {} })
		.then(function (res) {
			if (res && res.data && res.data.token) {
				localStorage.setItem("auth_token", res.data.token)
				props.history.push('/home')
			} 
		})
		.catch(function (error) {
		    setErrorMessage(error.response.data.message)
		});
	}

	if (localStorage.getItem("auth_token")) return <Redirect to='/home' />

	return (
		<div className="login-page">
			<h4>Have an Account?</h4>
			<form onSubmit={handleLogin}>
				<div className="">
					<input type="email" name="email" value={state.email} onChange={handleChange} placeholder="task@task.com" required />
				</div>
				<div className="m-t-10">
					<input type="password" className="" name="password" value={state.password} onChange={handleChange} placeholder="123456" required />
				</div>
				<button type="submit" className="btn m-t-10">Login</button>
			</form>
			{errorMessage && (
				<div className="error-msg m-t-10"> {errorMessage} </div>
			)}
			<span className="pull-left m-t-10"><a href="/sign-up" className="text-primary text-decoration-none">Signup</a></span>
		</div>
	)
}
