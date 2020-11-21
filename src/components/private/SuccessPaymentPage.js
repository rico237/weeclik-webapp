import React, { Component } from 'react';
import { Link, useLocation, Redirect } from "react-router-dom";
import Parse from 'parse';
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

class SuccessPaymentPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            complete: false
        };
        this.updateStatusCommerce = this.updateStatusCommerce.bind(this);
    }

    updateStatusCommerce(ID) {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const instanceCommerce = new ParseCommerce();
        instanceCommerce.id = ID;
        instanceCommerce.set("statutCommerce", 1);
        instanceCommerce.set("brouillon", false);
        instanceCommerce.save().then((commerceUpdate) => {
            this.setState({complete: true})
        }, (error) => {
            console.error(`Failed to create new object, with error code: ' + ${error.message}`);
        })
    }

    async componentDidMount() {
        // let query = duery();

        let commerceId = this.props.match.params.commerce_id;
        let sessionId = this.props.match.params.session_id;
        
        console.log(`Commerce id url params: ${commerceId}`);
        console.log(`Session id url params: ${sessionId}`);

        // commerceId = query.get("commerce_id");
        // sessionId = query.get("session_id");

        // console.log(`Commerce id url params: ${commerceId}`);
        // console.log(`Session id url params: ${sessionId}`);

        if (!commerceId || !sessionId) { return; }

        // Call your backend to create the Checkout Session
        const response = await fetch(`${process.env.REACT_APP_ROOT_SERVER_URL}/retrieve-checkout-session-status`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutId: sessionId })
        });
    
        const checkout = await response.json();

        console.log(`Session status: ${checkout.payment_status}`);
        
        switch(checkout.payment_status) {
        case 'paid':
            // this.updateStatusCommerce(commerceId);
            break;
        case 'unpaid':
            break;
        case 'no_payment_required':
            break;
        default:
            break;
        }
    }

    render() {
        if (this.state.complete) {
            let commerceId = this.props.match.params.commerce_id;
            let sessionId = this.props.match.params.session_id;
            
            console.log(`Commerce id url params: ${commerceId}`);
            console.log(`Session id url params: ${sessionId}`);

            return <Redirect to={{
                pathname: '/aboutcommerce',
                state: { id: commerceId }
            }} />;
        }

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

export default SuccessPaymentPage;