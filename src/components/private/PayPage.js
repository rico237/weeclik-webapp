import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Grid, Typography, Avatar, Button, Box } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import logoComptePro from '../../assets/icons/users.svg';

const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    // paddingTop: '70px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const avatar = {
    margin: theme.spacing(5),
    borderRadius: 0,
    width: 160,
    height: 160
}

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

class PayPage extends Component {
    constructor(props) {
        super(props);
        // this.submit = this.submit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(event) {
        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // Call your backend to create the Checkout Session
        const response = await fetch(`${process.env.REACT_APP_ROOT_SERVER_URL}/create-checkout-session`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commerceId: this.props.location.state.id })
        });
    
        const session = await response.json();
    
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
    
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
          console.log(`Error trying to display Stripe Checkout: ${result.error.message}`);
        }
    }

    render() {
        return (
            <Container component="main" maxWidth={'lg'} style={{ marginTop: '-100px' }}>
                <Box my={9}/>
                <div style={root}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        spacing={0}>
                        <Grid item xs={12} sm={6}>
                            <center>
                                <Avatar alt="Logo" src={logoComptePro} style={avatar}/>
                                <Typography variant="h4">Offre de lancement</Typography>
                                <div style={{ margin: '15px', textAlign: 'justify' }}>
                                    Pour son lancement l'ajout d'un commerce sur Weeclik est à un tarif préférenciel de 329.99 €
                                </div>
                                <div style={{ margin: '15px', textAlign: 'justify' }}>
                                    Votre paiement sera débité de votre compte. L'abonnement vous permet d'obtenir un commerce sur le réseau Weeclik pour une durée d'un an, sans renouvellement automatique.
                                    Le rachat de cet abonnement pour un commerce existant rajoute un an à sa période de visibilité sur le réseau Weeclik.

                                    En vous abonnant, vous acceptez nos <Link style={{color: "blue", textDecoration: "none"}} to={`/doc/cguv`}>Termes &amp; Conditions</Link>, <Link style={{color: "blue", textDecoration: "none"}} to={`/doc/cgu`}>CGU</Link>, <Link style={{color: "blue", textDecoration: "none"}} to={`/doc/cgv`}>CGV</Link> <Link style={{color: "blue", textDecoration: "none"}} to={`/doc/rgpd`}>Politique de vie privée</Link>.
                                </div>
                            </center>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div style={{
                                padding: '25px',
                                // marginLeft: '25px',
                                borderRadius: '5px',
                                backgroundColor: '#F6F9FC'
                            }}>

                                <div className="example">
                                    <Button fullWidth
                                        role="link" onClick={this.handleClick}
                                        variant="contained"
                                        to="/createcommerce"
                                        style={{background: '#1EB0F8', marginBottom:'25px', border: 0,boxShadow: '0 3px 5px 2px rgba(30, 176, 248, .3)',color: 'white',textTransform: 'uppercase',fontSize: 15,fontWeight: 700,borderRadius: 100}}>
                                        Payer 329,99€
                                    </Button>
                                </div>

                                <Button fullWidth onClick={() => this.props.history.goBack()} variant="outlined" size="small" color="secondary" style={{outline: 'none', borderRadius: '2rem'}}>
                                        Annuler
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default PayPage;