import React, { Component } from 'react';
import Login from "./Login";
import img_promo from '../assets/images/pub_example.png';
import '../css/App.css';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}
	
	render() {
		return (
			<div className="container">
        		<div className="row">
          			<div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
            			<Login/>
          			</div>
          
					<div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
						<img src={img_promo} className="rounded mx-auto d-block" alt="..." style={{ width : '600px'}}/>
					</div>
        		</div>
			</div>
		)
	};
}

export default App;
