import React, { Component } from 'react';
import Parse from 'parse';
import {
    Container,
    CssBaseline,
    Button,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';
import IMG1 from '../../assets/images/img1.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../redux/actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';


const theme = createMuiTheme({
    spacing: 4,
});

const root = {
    flexGrow: 1,
    paddingTop: '70px',
}

const root2 = {
    padding: theme.spacing(5),
}

const bannier = {
    margin: `${theme.spacing(1)}px auto`,
    // padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor:"#FFF"
}

const styleButton = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '5px'
}

const controls = {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
}

const cover = {
    width: 160,
    height: 160,
    margin: "7px"
}

const card = {
    display: 'flex',
    margin: '15px 0'
}

const details = {
    display: 'flex',
    flexDirection: 'column',
}

const content = {
    flex: '1 0 auto',
}



class CommercesPage extends Component {
    constructor(props) {
        super(props);

        try {
            this.state = {
                commerceList: [],
                nb: 0,
                user: {
                    name: '',
                    username: '',
                    picture: ''
                },
                
            };            
        } catch (error) {
            
        }
    }

    getAllCommerces() {
        const ParseCommerce = Parse.Object.extend("Commerce");
        const queryCommerce = new Parse.Query(ParseCommerce);

        queryCommerce.equalTo("owner", Parse.User.current());

        let newCommerces = [];

        queryCommerce.find()
            .then(snapshot => {
                snapshot.forEach((elt) => {
                    var _status;

                    switch (elt.get("statutCommerce")) {
                        case 0:
                            _status = "Hors ligne - en attente de paiement"
                            break;
                        case 1:
                            _status = "En ligne"
                            break;
                        case 2:
                            _status = "Hors ligne - paiement annulé"
                            break;
                        case 3:
                            _status = "Erreur lors du paiement ou du renouvellement"
                            break;
                        case 4:
                            _status = ""
                            break;
                    
                        default:
                            _status = "Statut inconnu"
                            break;
                    }

                    newCommerces.push({
                        "id": elt.id,
                        "name": elt.get("nomCommerce"),
                        "status": _status,
                        "imgCategory": IMG1,
                        "description": elt.get("description"),
                        "nbPartage": elt.get("nombrePartages")
                    });
                });

                this.setState({
                    commerceList: newCommerces,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    goToDetail = (_id) => {
        this.props.history.push({
            pathname: `/aboutcommerce/${_id}`
        })
    }



    componentDidMount() {
        // this.props.getUserInfo();
        // const id = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
        try {
            this.getAllCommerces();
        } catch (error) {
            
        }
    }

    render() {
        try {
            return (
                <Container component="main" maxWidth="md">
                    <CssBaseline/>
                    <div style={root}>

                        <div style={bannier}>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Grid item sm={2}>
                                    <Paper elevation={0} style={root2}>
                                        <center>
                                            <Typography variant="h2" component="h3" style={{color:"#000"}}>{this.state.commerceList.length}</Typography>
                                            <Typography component="p" style={{color:"#000"}}>{this.state.commerceList.length > 1 ? "Commerces" : "Commerce"}</Typography>
                                        </center>
                                    </Paper>
                                </Grid>

                                <Grid item sm={10}>
                                    <Paper elevation={0} style={root2}>
                                        <center>
                                            <Button
                                                variant="contained"
                                                component={Link}
                                                to="/createcommerce"
                                                style={styleButton}>Ajouter un commerce</Button>
                                        </center>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>


                        <Grid container direction="row-reverse" spacing={3}>
                            <Container component="main" maxWidth="sm">
                                <Grid item xs={12} style={{ marginTop: '50px' }}>
                                    {this.state.commerceList.map((elt, index) => (
                                        <Card key={index} style={card}>
                                            <img style={cover} src={elt.imgCategory} alt={elt.name} />
                                            <div style={details}>
                                                <CardContent style={content}>
                                                    <Typography component="h5" variant="h5">{elt.name}</Typography>
                                                    <Typography variant="subtitle1" color="textSecondary">{elt.status}</Typography>

                                                    <h5 style={{color:"#000"}}>
                                                        {elt.nbPartage} {' '}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#F00" width="24" height="24" viewBox="0 0 24 24"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
                                                    </h5>
                                                </CardContent>
                                                <div style={controls}>
                                                    <Grid container justify="flex-start" spacing={1}>
                                                        <Grid item>
                                                            <Button color="primary" onClick={() => { this.goToDetail(elt.id) }} aria-label={`info about ${elt.title}`} style={{outline: 'none'}}>Plus de détail</Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                
                                            </div>
                                        </Card>
                                                
                                    ))}
                                </Grid>
                            </Container>
                        </Grid>
                        
                    </div>
                </Container>
            );
        } catch (error) { return <Redirect to='/error'/> }
    }
}

function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const actionCreators = {
    getUserInfo: userActions.getInfo,//userActions.getAllInfo
    // logout: userActions.logout
}

// connect permet de lier le component au state et aux actions
const connectedCommercesPage = connect(mapState, actionCreators) (CommercesPage);
export { connectedCommercesPage as CommercesPage };

