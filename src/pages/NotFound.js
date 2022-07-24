import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
	render() {
		return (
			<div className="ht-page">
				<h2 className="m-t-20">Page not found!</h2>
				<p className="text-center">
					<Link className="btn btn-primary btn-mt-primary back-btn" to="/">Back to homepage</Link>
				</p>
			</div>
		)
	}
}

export default NotFound;
