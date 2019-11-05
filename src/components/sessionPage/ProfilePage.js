import React, { Component } from 'react';
import Parse from 'parse';
import { Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, Grid, Container } from '@material-ui/core';
import YouTube from 'react-youtube';
import { Button } from '@material-ui/core';
import defaultProfile from '../../assets/icons/defaultUser.svg'
import AddImg from '../../assets/images/addImage.svg'
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';


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
            nbPersonneParraine: 0,
            nbCommerce: 0,
            open: false,
            open2: false,
        };

        this.changeMyInfo = this.changeMyInfo.bind(this);
        this.changePicture = this.changePicture.bind(this);
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

    handleOpen = () => {
        this.setState({ open2: true });
    }

    handleClose = () => {
        this.setState({ open2: false });
    }

    changeMyInfo(event) {
        var currentUser = Parse.User.current();
        if (currentUser) {
            currentUser.setEmail(this.state.user.email);
            currentUser.set('name', this.state.user.name);
            currentUser.save()
                .then((user) => {
                    console.log(user);
                    this.handleCloseUpdateProfile();
                }, (error) => {
                    console.error(error);
                });
            
        } else {
            
        }
        event.preventDefault();
    }

    changePicture(event) {
        var currentUser = Parse.User.current();

        var file = new Parse.File("image", event.target.files[0]);
        if (currentUser) {
            file.save().then(function() {
                currentUser.set('profilePictureURL', file.url());
                currentUser.save()
                    .then((user) => {
                        console.log(user);
                    }, (error) => {
                        console.error(error);
                    });
            }, (error) => {
                console.error(error);
            });
        } else {
            
        }
    }

    getNbCommerce = () => {
        return 1;
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
                // console.log("%%%%%zahdu%%% " +JSON.stringify(snapshot, null, 2));
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
        // this.props.getUserInfo();
        // const id = JSON.parse(localStorage.getItem(`Parse/${process.env.REACT_APP_APP_ID}/currentUser`));
        this.getUserPicture();
    }

    render() {

        const opts = {
            // height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        }

        // const { user } = this.props;
        return (
            <div>
                <header className="App-header">
                    <Container>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={12} sm={4}>
                                {
                                    !this.state.user.picture ?
                                    <Avatar
                                        alt="Image de profile"
                                        src={this.state.user.picture}
                                        style={{
                                            margin: 10,
                                            width: 150,
                                            height: 150,
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        }}
                                    />
                                    : <Avatar
                                        alt="Image de profile par defaut"
                                        src={defaultProfile}
                                        style={{
                                            margin: 10,
                                            width: 150,
                                            height: 150,
                                            display: 'block',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        }}
                                    />
                                }
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}><h1>{this.state.user.name}</h1></Grid>
                                    {/* <Grid item xs={12}>
                                        <h4>{"Ambassadrise / Ambassadeur ?"}</h4>
                                        <Button onClick={() => {this.handleOpen()}} style={styleButton}>Devenir ambassadrise/ ambassadeure</Button>
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <h5>
                                            <svg width="48" height="48" fill="#FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>
                                            {" " + this.state.user.email}
                                        </h5>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <Grid container xs={12}>
                                            <Grid item xs={4}>
                                                <div>
                                                    <h1>{this.state.nbCommerce}</h1>
                                                    <p>{this.state.nbCommerce > 1 ? "Commerces" : "Commerce"}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div>
                                                    <h1>{this.state.nbPersonneParraine}</h1>
                                                    <p>{this.state.nbPersonneParraine > 1 ? "Parrainages" : "Parrainage"}</p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div>
                                                    <h1>+10</h1>
                                                    <p>Partages</p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Button variant="contained" size="small" color="primary" onClick={() => {this.handleOpenUpdateProfile()}}>Modifier votre profile</Button>



                    <div>
                        <Dialog
                            open={this.state.open2}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            style={{ minHeight: "600px"}}
                            // fullWidth={true}
                            maxWidth={"md"}
                        >
                            <DialogTitle id="alert-dialog-title">{"Être ambassadrise / ambassadeure Weeclik"}</DialogTitle>
                            <DialogContent>
                                <YouTube
                                    videoId="HEPL30xM25U"
                                    opts={opts}
                                    onReady={this._onReady}
                                    style={{ margin: '10px' }}
                                />
                                <DialogContentText id="alert-dialog-description">
                                    
                                    
                                    
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </div>



                    <div>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleCloseUpdateProfile}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Modifier votre profile"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description" style={{ minWidth: "500px"}}>
                                    <input
                                        id="icon-input-file"
                                        accept="image/*"
                                        type="file"
                                        style={{ display: 'None' }}
                                        onChange={this.changePicture} />
                                    <label htmlFor="icon-input-file">
                                        <img
                                            src={AddImg}
                                            className="rounded"
                                            alt="Default profile"
                                            style={{ width: 200 }}/>
                                    </label>
                                    <h2>{this.state.user.name}</h2>

                                    <form onSubmit={this.changeMyInfo}>
                                        <fieldset>
                                            <div className="form-group">
                                                <label htmlFor="nameInput">Name</label>
                                                <input
                                                    type="text"
                                                    id="nameInput"
                                                    className="form-control"
                                                    value={this.state.user.name}
                                                    onChange={e => this.handleChangeName(e.target.value)}
                                                    placeholder={this.state.user.name}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="emailInput">Mail</label>
                                                <input
                                                    type="email"
                                                    id="emailInput"
                                                    className="form-control"
                                                    value={this.state.user.email}
                                                    onChange={e => this.handleChangeMail(e.target.value)}
                                                    placeholder={this.state.user.email}/>
                                            </div>
                                            <input type="submit" className="btn btn-primary btn-sm" value="Valider"/>
                                        </fieldset>
                                    </form>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </div>
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

