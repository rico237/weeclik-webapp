import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Container, Grid, Typography, Avatar, Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import CheckoutForm from './CheckoutForm';
import logoComptePro from '../../assets/icons/users.svg';
// import { borderRadius } from '@material-ui/system';

const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
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
        if (this.state.complete) return <h1>Purchase Complete</h1>
        
        return (
            <Container component="main" maxWidth="md">
                <div style={root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={7}>
                            <Avatar alt="Logo" src={logoComptePro} style={avatar}/>
                            <Typography variant="h6">-50% la première année</Typography>
                            <Typography variant="body1" style={{color:"#000", fontSize: '100'}}>{"Ajouter une description sur les prix"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <div style={{
                                padding: '25px',
                                // marginLeft: '25px',
                                borderRadius: '5px',
                                backgroundColor: '#F6F9FC'
                            }}>
                                <StripeProvider apiKey="pk_test_9OkMxuPwf69ObxaAqfOMih5M00m24msfT0">
                                    <div className="example">
                                        <Elements>
                                            <CheckoutForm/>
                                        </Elements>
                                    </div>
                                </StripeProvider>

                                <Button onClick={() => this.goToBack()} variant="outlined" size="small" color="secondary" style={{ width: '100%'}}>Non merci</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default PayPage;