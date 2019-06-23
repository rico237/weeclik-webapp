import React from 'react';
import Login from "./Login";
import img_promo from '../assets/images/pub_example.png';
import '../css/App.css';

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
            <Login/>
          </div>
          
          <div className="col-12 col-md" style={{ backgroundColor : '#FFF' }}>
            <img src={img_promo} class="rounded mx-auto d-block" alt="..." style={{ width : '600px'}}/>
          </div>
        </div>
      </div>
    )
  };
}

export default App;
