import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './style-stripe.css'


/**
 * https://stripe.com/docs/recipes/elements-react
 */
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick: false,
            complete: false,
            noValid: false,
            price: '329.99 €'
        };
        this.submit = this.submit.bind(this);
        this.updateStatusCommerce = this.updateStatusCommerce.bind(this);
    }

    updateStatusCommerce(ID) {

        const ParseCommerce = Parse.Object.extend("Commerce");
        const instanceCommerce = new ParseCommerce();
        instanceCommerce.id = ID;
        instanceCommerce.set("statutCommerce", 1);
        instanceCommerce.set("brouillon", false);
        instanceCommerce.save()
        .then((commerceUpdate) => {
            this.setState({complete: true})
        }, (error) => {
            console.error(`Failed to create new object, with error code: ' + ${error.message}`);
        })
    }

    /**
     * Create a token to securely transmit card information
     * @param {*} ev 
     */
    async submit(ev) {
        ev.preventDefault();
        this.setState({isClick: true})
        // TODO: Insert real name
        let token = await this.props.stripe.createToken({name: "Name"});
        let response = await fetch(`${process.env.REACT_APP_ROOT_SERVER_URL}/charge`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(token)
        });
        if (response.ok) {
            this.updateStatusCommerce(this.props._idCommerce)
        } else {
            this.setState({noValid: true})
        }
    }

    

    render() {
        if (this.state.complete) return <Redirect to={{
            pathname: '/aboutcommerce',
            state: { id: this.props._idCommerce }
        }} />;//<h1>Paiement Validé</h1>

        if (this.state.noValid) return <h1>Paiement refusé</h1>
        
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
                    {
                        this.state.isClick ? (
                            <button disabled className="btn-solid-lg" onClick={this.submit} style={{outline: 'none', width: '100%', marginBottom: '50px'}}>{'attendre'}</button>
                        ) : (
                            <button className="btn-solid-lg" onClick={this.submit} style={{outline: 'none', width: '100%', marginBottom: '50px'}}>Payer {this.state.price}</button>
                        )
                    }
                </div>
                <div>
                    <p style={{ color: '#6B7C93'}}>Payer <span className="price">{this.state.price}</span>, pour rendre votre commerce visible</p>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);