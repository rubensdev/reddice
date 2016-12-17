import React from 'react';
import NavigationBar from './NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

export default class App extends React.Component {
	render() {
		return (
			<div className="container">
				<NavigationBar />
				<FlashMessagesList />
				{this.props.children}
			</div>
		);
	}
}
