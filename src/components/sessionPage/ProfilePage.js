/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Parse from 'parse';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Container, IconButton } from '@material-ui/core';
import defaultProfile from '../../assets/icons/defaultUser.svg'
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import EditIcon from '@material-ui/icons/Edit';


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                username: '',
                picture: '',
                email: ''
            },
            alertMsg: '',
            nbPersonneParraine: 0,
            nbCommerce: 0,
            open: false,
            sec: 3
        };
    }

    handleChangeName(value) {
        this.setState(prevState => ({
            user: {                 // object that we want to update
                ...prevState.user,  // keep all other key-value pairs
                name: value   // update the value of specific key
            }
        }))
    }

    handleChangeMail(value) {
        this.setState(prevState => ({
            user: {                 // object that we want to update
                ...prevState.user,  // keep all other key-value pairs
                email: value   // update the value of specific key
            }
        }))
    }

    handleOpenUpdateProfile = () => {
        this.setState({ open: true });
    }

    handleCloseUpdateProfile = () => {
        this.setState({ open: false });
    }

    getUserPicture() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            currentUser.fetch().then((snapshot) => {
                var name = snapshot.get('name');
                var PICTURE = snapshot.get('profilePictureURL');
                var username = snapshot.getUsername();
                var mail = snapshot.getEmail();

                if (!PICTURE) {
                    PICTURE = {defaultProfile}
                }

                this.setState(prevState => ({
                    user: {
                        ...prevState.user,
                        name: name,
                        username: username,
                        picture: PICTURE,
                        email: mail
                    }
                }))
            })
        } else {
            
        }
    }


    componentDidMount() {
        this.getUserPicture();
    }

    render() {
        return (
            <div>
                <header className="App-header-profile">
                    <Container maxWidth="sm">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={12}>
                                {
                                    this.state.user.picture.length > 2 ?
                                    (<div><Avatar
                                        alt="Image profil"
                                        src={this.state.user.picture}
                                        style={{
                                            margin: 10,
                                            width: 150,
                                            height: 150,
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            border: 'solid #DA5456',
                                            marginBottom: '30px'
                                        }}
                                    /></div>)
                                    : (<Avatar
                                        alt="Image de profil par defaut"
                                        src={defaultProfile}
                                        style={{
                                            margin: 10,
                                            width: 150,
                                            height: 150,
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            border: 'solid #DA5456',
                                            marginBottom: '30px'
                                        }}
                                    />)
                                }

                                <Grid item xs={12} style={{ background: "#E2E2E2", margin: '0px 10px', padding: '10px', color: 'black', fontWeight: 'bold' }}>Mon profil</Grid>
                                
                                <Grid item xs={12} style={{ margin: '0px 10px', padding: '10px', background: "#FFF", height: '100%', overflow: 'auto' }}>
                                    <div style={{ float: "left" }}>
                                        <h5 style={{color:"#000"}}>
                                            {this.state.user.name}
                                        </h5>
                                        <h5 style={{color:"grey"}}>
                                            {this.state.user.email}
                                        </h5>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <IconButton
                                            aria-label="edit"
                                            component={Link}
                                            to="/updateuser"
                                            style={{ margin: '10px', outline: 'none' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </Grid>

                                <Grid item xs={12} style={{
                                    background: "#E2E2E2",
                                    margin: '0px 10px',
                                    padding: '10px',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    // position: '-webkit-sticky',
                                    position: 'sticky',
                                    top: '55px',

                                }}>Mes commerces</Grid>

                                {/* <Grid item xs={12} style={{ margin: '0px 10px', paddingBottom: '2000px', background: "#FFF", height: '100%', overflow: 'auto' }}>
                                    <div style={{ float: "left" }}>
                                        <h5 style={{color:"#000"}}>
                                            {this.state.user.name}
                                        </h5>
                                        <h5 style={{color:"grey"}}>
                                            {this.state.user.email}
                                        </h5>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        <IconButton
                                            aria-label="edit"
                                            component={Link}
                                            to="/updateuser"
                                            style={{ margin: '10px', outline: 'none' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </Grid> */}
                            </Grid>
                        </Grid>
                        
                    </Container>
                </header>
            </div>
        );
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
const connectedProfilePage = connect(mapState, actionCreators) (ProfilePage);
export { connectedProfilePage as ProfilePage };

