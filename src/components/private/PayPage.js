import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container, Grid, Typography, Avatar, Button, Box } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import CheckoutForm from './CheckoutForm';
import logoComptePro from '../../assets/icons/users.svg';
// import { borderRadius } from '@material-ui/system';

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


class PayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prix: 300,
            complete: false,
            stripePublicKey: ""+process.env.STRIPE_PUBLIC_KEY
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
            body: token.id
        });

        if (response.ok) this.setState({complete: true})
    }

    goToBack = () => {
        this.props.history.goBack();
    }

    render() {
        // console.log("id Commerce "+this.props.location.state.id);
        
        if (this.state.complete) return <h1>Purchase Complete</h1>
        
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
                                <StripeProvider apiKey={this.state.stripePublicKey}>
                                    <div className="example">
                                        <Elements>
                                            <CheckoutForm _idCommerce={this.props.location.state.id}/>
                                        </Elements>
                                    </div>
                                </StripeProvider>

                                <Button fullWidth onClick={() => this.goToBack()} variant="outlined" size="small" color="secondary" style={{outline: 'none', borderRadius: '2rem'}}>Annuler</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default PayPage;