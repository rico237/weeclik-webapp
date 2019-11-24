import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './style-stripe.css'


/**
 * https://stripe.com/docs/recipes/elements-react
 */
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            price: '329.99 €'
        };
        this.submit = this.submit.bind(this);
    }

    /**
     * Create a token to securely transmit card information
     * @param {*} ev 
     */
    async submit(ev) {
        console.log("-------> "+ process.env.REACT_APP_ROOT_SERVER_URL);
        let { token } = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch(`https://weeclik-server-dev.herokuapp.com/charge`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: token
        });

        if (response.ok) this.setState({complete: true})
    }

    

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>
        
        return (
            <div>
                <div className="checkout">
                    <label>
                        Nom complet
                        <input name="name" type="text" placeholder="Nom du propriétaire" required/>
                    </label>
                    <label>
                        Détails de la carte
                        <CardElement />
                    </label>
                    <button className="btn-solid-lg" onClick={this.submit} style={{outline: 'none', width: '100%', marginBottom: '50px'}}>Payer {this.state.price}</button>
                </div>
                <div>
                    <p style={{ color: '#6B7C93'}}>Payer <span className="price">{this.state.price}</span>, pour rendre votre commerce visible</p>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);