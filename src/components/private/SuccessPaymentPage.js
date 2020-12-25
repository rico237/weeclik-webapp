import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Parse from 'parse';
import { Container, Grid, Typography, Avatar, Button, Box } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import logoComptePro from '../../assets/icons/users.svg';
import ReactLoading from 'react-loading';

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
        
        /// paymentStatus: 0 = loading, 1 = success, 2 = failure, 
        /// 3 = Stripe Checkout session already used
        this.state = {
            shdRedirect: false,
            paymentStatus: 0,
        };
        this.redirectUserToCommerce = this.redirectUserToCommerce.bind(this);
    }

    redirectUserToCommerce() {
        this.setState({shdRedirect: true});
    }

    async componentDidMount() {
        let commerceId = this.props.match.params.commerce_id;
        let sessionId = this.props.match.params.session_id;
        
        if (!commerceId || !sessionId) { 
            this.setState({shdRedirect: true});
            return; 
        }

        // Call your backend to create the Checkout Session
        const response = await fetch(`${process.env.REACT_APP_ROOT_SERVER_URL}/retrieve-checkout-session-status`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutId: sessionId })
        });
        const checkout = await response.json();

        if (checkout.errorMessage) {
            // TODO: Handling error from API
            console.log(`Error while confirming checkout session error: ${checkout.errorMessage}`);
            this.setState({paymentStatus: 2});
        } else {
            // No error returned by API
            switch(checkout.payment_status) {
            case 'paid':
                const ParseCommerce = Parse.Object.extend("Commerce");
                const query = new Parse.Query(ParseCommerce);
                query.get(`${commerceId}`)
                .then((instanceCommerce) => {
                    // The commerce was retrieved successfully.
                    var sessions = instanceCommerce.get("stripeCheckoutSession");
                    if (sessions === undefined) {
                        instanceCommerce.set("stripeCheckoutSession", []);
                    }
                    if (sessions === undefined || !sessions.includes(sessionId)) {
                        instanceCommerce.addUnique("stripeCheckoutSession", sessionId);
                        instanceCommerce.set("statutCommerce", 1);
                        instanceCommerce.set("brouillon", false);
                        instanceCommerce.set("endedSubscription", new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
                        instanceCommerce.save().then((commerceUpdate) => {
                            this.setState({paymentStatus: 1});
                        }, (error) => {
                            console.error(`Failed to create new object, with error code: ' + ${error.message}`);
                            this.setState({paymentStatus: 2});
                        })
                    } else {
                        this.setState({paymentStatus: 3});
                    }
                }, (error) => {
                    console.log(`Error while getting commerce infos error: ${error}`);
                    this.setState({paymentStatus: 2});
                });
                break;

            case 'unpaid':
                this.setState({paymentStatus: 2});
                break;
            
            case 'no_payment_required':
                this.setState({paymentStatus: 1});
                break;
            
            default:
                break;
            }
        }
    }

    render() {
        if (this.state.shdRedirect) {
            const commerceId = this.props.match.params.commerce_id;
            if (commerceId) { return <Redirect to={{ pathname: `/aboutcommerce/${commerceId}` }} />; }
            return <Redirect to={{ pathname: `/user` }} />;
        }

        return (
            <Container component="main" maxWidth={'lg'} style={{ marginTop: '-100px' }}>
                <Box my={9}/>
                <div style={root}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={0}>
                        <Grid item xs={12} sm={6} lg={6}>
                        <center>
                                <Avatar alt="Logo" src={logoComptePro} style={avatar}/>
                                
                                {(() => {
                                    switch (this.state.paymentStatus) {
                                        case 0: // Loading
                                            return (
                                                <div>
                                                    <ReactLoading type={"spinningBubbles"} color={"#1DAFF8"} />
                                                    <Typography variant="h4">Chargement</Typography>
                                                    <div style={{ margin: '15px', textAlign: 'justify' }}>
                                                    Vérification du paiement en cours, veuillez patienter.
                                                    </div>
                                                </div>
                                            );
                                            
                                        case 1: // Success
                                            return (
                                                <div>
                                                    <Typography variant="h4">Bravo !</Typography>
                                                    <div style={{ margin: '15px', textAlign: 'justify' }}>
                                                    Votre paiement pour la mise en ligne de votre commerce a été effectué avec succès,
                                                    votre commerce est maintenant visible par l'ensemble du réseau Weeclik®
                                                    </div>
                                                </div>
                                            );

                                        case 2: // Failure
                                            return (
                                                <div>
                                                    <Typography variant="h4">Erreur lors du paiement</Typography>
                                                    <div style={{ margin: '15px', textAlign: 'justify' }}>
                                                    Une erreur est survenue lors du paiement de votre abonnement,
                                                    veuillez ressayer ou changer de moyen de paiement.
                                                    </div>
                                                </div>
                                            );

                                        case 3: // Stripe checkout session already used
                                            let sessionId = this.props.match.params.session_id;
                                            return (
                                                <div>
                                                    <Typography variant="h4">Erreur d'identifiant Stripe</Typography>
                                                    <div style={{ margin: '15px', textAlign: 'justify' }}>
                                                    L'identifiant Stripe unique utilisé afin d'authentifier votre paiement est déjà connu de notre système.
                                                    Veuillez contacter un administrateur du site si votre commerce n'est pas en ligne.
                                                    <br/><br/>
                                                    Veuillez indiquer cet identifiant dans votre prise de contact: <br/>
                                                    { sessionId }
                                                    </div>
                                                </div>
                                            );

                                        default:
                                            // Should not be called
                                            return (<Container component="main"></Container>);
                                    }
                                })()}

                                <Button fullWidth onClick={() => this.redirectUserToCommerce()} variant="outlined" size="small" color="secondary" style={{outline: 'none', borderRadius: '2rem'}}>
                                        Retour sur la page de mon commerce
                                </Button>
                            </center>
                            </Grid>
                        </Grid>
                </div>
            </Container>
        );
    }
}

export default SuccessPaymentPage;