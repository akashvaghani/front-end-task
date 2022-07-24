
export default function Home() {

	const handleLogout = (props) => {
		localStorage.removeItem('auth_token');
		props.history.push('/login')
	};

	return (
		<div className="home-page">
			<span className="pull-left m-t-10"><a href="/about">About</a></span>
			<span className="pull-left m-t-10 m-l-20"><a href="/head-tail">Head & Tail</a></span>
			<span className="pull-right m-t-10"><a href="/#" onClick={() => handleLogout()} >Logout</a></span>
		</div>
	);
}