import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './test.css'

/**
 * https://stripe.com/docs/recipes/elements-react
 */
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false
        };
        this.submit = this.submit.bind(this);
    }

    /**
     * Create a token to securely transmit card information
     * @param {*} ev 
     */
    async submit(ev) {
        // User clicked submit
        let { token } = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch("/charge", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: token
        });

        if (response.ok) this.setState({complete: true})
        console.log(response);
        
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>
        
        return (
            <div>
                <div className="checkout">
                    <label>
                        Card details
                        <CardElement />
                    </label>
                    <button className="button-pay" onClick={this.submit}>Payer 299 €</button>
                </div>
                <div>
                    <p style={{ color: '#6B7C93'}}>Payer <span className="price">299 €</span>, pour rendre votre commerce visible</p>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);