import React, { Component } from 'react';
import Parse from 'parse';
import { Avatar, Dialog, DialogTitle, DialogContent, Grid, Typography, Box, Badge, Button, Card,
    CardHeader, IconButton } from '@material-ui/core';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import NoProfile from '../../assets/images/no-profile.jpg';
import EditImg from '../../assets/icons/edit.svg';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';
import { isValideEmail } from '../../functions/weeclik.func';


const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

class UpdateUser extends Component {
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
            lastPassword: '',
            newPassword: '',
            newPassword2: '',
            nbPersonneParraine: 0,
            nbCommerce: 0,
            open: false,
            openAmbassador: false,
            openUpdatePass: false,
            imgPreview: null,
            sec: 3
        };

        this.changeMyInfo = this.changeMyInfo.bind(this);
        this.changeMyPassword = this.changeMyPassword.bind(this);
        this.changePicture = this.changePicture.bind(this);
        this.handleSavePictureInLocal = this.handleSavePictureInLocal.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }

    handleChangeName(value) {
        this.setState(prevState => ({
            user: {                 // object that we want to update
                ...prevState.user,  // keep all other key-value pairs
                name: value   // update the value of specific key
            }
        }))
    }

    handleChangePass(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleChangeMail(value) {
        this.setState(prevState => ({
            user: {                 // object that we want to update
                ...prevState.user,  // keep all other key-value pairs
                email: value   // update the value of specific key
            }
        }))
    }

    handleOpenUpdateUser = () => {
        this.setState({ open: true });
    }

    handleCloseUpdateUser = () => {
        this.setState({ open: false });
    }

    handleOpen = () => {
        this.setState({ openAmbassador: true });
    }

    handleClose = () => {
        this.setState({ openAmbassador: false });
    }

    handleOpenUpdatePass = () => {
        this.setState({ openUpdatePass: true });
    }

    handleCloseUpdatePass = () => {
        this.setState({
            openUpdatePass: false,
            alertMsg: '',
            lastPassword: '',
            newPassword: '',
            newPassword2: ''
        });
    }

    changeMyInfo(event) {
        var currentUser = Parse.User.current();
        if (currentUser) {
            try {
                // Je mets à jour l'image de profile
                this._uploadPicture(localStorage.getItem("imageProfile"), currentUser);
            } catch (error) {}
            
            
            currentUser.setEmail(this.state.user.email);
            currentUser.setUsername(this.state.user.email);
            currentUser.set('name', this.state.user.name);
            currentUser.save()
                .then((user) => {
                    // console.log(user);
                    this.setState({ alertMsg: "Le profile a été modifié avec succès" });
                    var counter = 3;

                    this.intervalId = setInterval(() => {
                        counter--;
                        if (counter === -1) {
                            clearInterval(this.intervalId);
                            this.handleCloseUpdateUser();
                            this.setState({
                                alertMsg: '',
                                sec: 3
                            });
                            window.location.reload();
                        } else {
                            this.setState({ sec: counter })
                        }
                    }, 1000);
                }, (error) => {
                    this.setState({ alertMsg: "Cette adresse e-mail est déjà utilisée" });
                    // console.error(error);
                });
            
        } else {
            
        }
        event.preventDefault();
    }

    changeMyPassword(event) {
        event.preventDefault();
        var currentUser = Parse.User.current();
        if (currentUser) {
            if (this.state.lastPassword && this.state.newPassword && this.state.newPassword2) {
                    if (this.state.newPassword === this.state.newPassword2) {
                        if (this.state.newPassword.length > 5 && this.state.newPassword.length < 16) {
                            Parse.User.logIn(currentUser.getUsername(), this.state.lastPassword).then((usr) => {
                                // console.log(`Mot de passe identique`);
                                currentUser.setPassword(this.state.newPassword);
                                currentUser.save()
                                    .then((user) => {
                                        this.setState({ alertMsg: "Mot de passe sauvegardé" });
                                        this.intervalId = setInterval(() => {
                                            this.handleCloseUpdatePass();
                                            clearInterval(this.intervalId);
                                            this.setState({
                                                alertMsg: '',
                                                lastPassword: '',
                                                newPassword: '',
                                                newPassword2: ''
                                            });
                                        }, 3000);
                                    }, (error) => {
                                        console.error(error);
                                    })
                            }, (error) => {
                                this.setState({ alertMsg: "Veuillez saisir votre mot de passe principal" });
                                this.intervalId = setInterval(() => {
                                    clearInterval(this.intervalId);
                                    this.setState({
                                        lastPassword: '',
                                        newPassword: '',
                                        newPassword2: ''
                                    });
                                }, 3000);
                            })
                        } else {
                            this.setState({ alertMsg: "Le mot de passe doit comporter entre six et quinze caractères" });
                            this.intervalId = setInterval(() => {
                                clearInterval(this.intervalId);
                                this.setState({
                                    lastPassword: '',
                                    newPassword: '',
                                    newPassword2: ''
                                });
                            }, 3000);
                        }
                    } else {
                        this.setState({ alertMsg: "Le mot de passe n'est pas identique" });
                        this.intervalId = setInterval(() => {
                            clearInterval(this.intervalId);
                            this.setState({
                                lastPassword: '',
                                newPassword: '',
                                newPassword2: ''
                            });
                        }, 3000);
                    }
            } else {
                this.setState({ alertMsg: "Veuillez remplir tous les champs" });
                this.intervalId = setInterval(() => {
                    clearInterval(this.intervalId);
                }, 3000);
            }
        }
    }

    /**
     * Sauvegarde en local de l'image de profile en attende du clique sur enregistrer
     * @param {*} event 
     */
    handleSavePictureInLocal(event) {
        const file = event.target.files[0];
        getBase64(file).then((base64) => {
            localStorage["imageProfile"] = base64;
        })
        this.setState({
            imgPreview: URL.createObjectURL(file),
        })
    }

    _uploadPicture(img, currentUser) {
        // var currentUser = Parse.User.current();
        var file = new Parse.File("imgProfileName.jpg", { base64: img });
        if (currentUser) {
            file.save().then((_file) => {
                currentUser.set("profilPicFile", file);
                currentUser.save().then((snapshot) => {
                    localStorage.removeItem("imageProfile");
                })
            })
        }
    }

    changePicture(event) {
        var currentUser = Parse.User.current();

        var file = new Parse.File("image", event.target.files[0]);
        if (currentUser) {
            this.setState({
                imgPreview: URL.createObjectURL(event.target.files[0])
            });
            file.save().then(function() {
                currentUser.set('profilePictureURL', file.url());
                currentUser.save()
                    .then((user) => {
                        console.log("OK")
                        // this.setState({ alertMsg: "Votre photo à été mise à jour" });
                        // this.intervalId = setInterval(() => {
                        //     this.setState({
                        //         alertMsg: '',
                        //     })
                        // }, 3000);
                        window.location.reload();
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
                var PICTURE = null
                try {
                    if (snapshot.get("profilPicFile")._url) {
                        PICTURE = snapshot.get("profilPicFile")._url;
                    } else {
                        PICTURE = snapshot.get('profilePictureURL');
                    }
                } catch (error) {
                }
                var username = snapshot.getUsername();
                var mail = snapshot.getEmail();

                if (!PICTURE) {
                    PICTURE = {NoProfile}
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
        const { alertMsg, sec } = this.state;
        return (
            <div>
                <header>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader
                                        avatar={
                                            <IconButton
                                                aria-label="edit"
                                                onClick={() => window.location.reload()}
                                                // component={Link}
                                                // to="/updateuser"
                                                style={{outline: 'none'}}
                                            >
                                                <ArrowBackRoundedIcon />
                                            </IconButton>
                                        }
                                    />
                                    <Box display="flex" style={{position: 'relative'}}>
                                        <Box m={1} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                            <Badge
                                                overlap="circle"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                badgeContent={
                                                    <center>
                                                        <input
                                                            id="icon-input-file"
                                                            accept="image/*"
                                                            type="file"
                                                            style={{ display: 'None' }}
                                                            onChange={this.handleSavePictureInLocal} />
                                                        <div style={{ width: '50px', height: '50px', border: 'solid #FFFFFF', background: '#E2E2E2', margin: '10px', outline: 'none', borderRadius: '50%' }}>
                                                            <label htmlFor="icon-input-file">
                                                                <img
                                                                    src={this.state.imgPreview ? this.state.imgPreview : EditImg}
                                                                    className="rounded"
                                                                    alt="Default profile"
                                                                    style={{ width: '24px', margin: '10px' }}/>
                                                            </label>
                                                        </div>
                                                    </center>
                                                }
                                            >
                                                {
                                                    this.state.user.picture.length > 2 ? (
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
                                                                border: 'solid #DA5456',
                                                            }}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            alt="Image de profile par defaut"
                                                            src={NoProfile}
                                                            style={{
                                                                margin: 10,
                                                                width: 150,
                                                                height: 150,
                                                                display: 'block',
                                                                marginLeft: 'auto',
                                                                marginRight: 'auto',
                                                                border: 'solid #DA5456'
                                                            }}
                                                        />
                                                    )
                                                }
                                            </Badge>
                                        </Box>
                                    </Box>
                                    
                                    {/* <Grid item xs={12} style={{ background: "#E2E2E2", margin: '0px 10px', padding: '10px', color: 'black', fontWeight: 'bold' }}>Mes informations</Grid> */}
                                    
                                    <Grid item xs={12} style={{ margin: '0px 10px', padding: '10px 0', background: "#FFF", height: '100%', overflow: 'auto' }}>
                                        <form onSubmit={this.changeMyInfo}>
                                            <fieldset>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        id="nameInput"
                                                        className="form-control"
                                                        value={this.state.user.name}
                                                        onChange={e => this.handleChangeName(e.target.value)}
                                                        placeholder={this.state.user.name}/>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        id="emailInput"
                                                        className={"form-control " + (isValideEmail(this.state.user.email) ? "" : "is-invalid")}
                                                        value={this.state.user.email}
                                                        onChange={e => this.handleChangeMail(e.target.value)}
                                                        placeholder={this.state.user.email}/>
                                                        {
                                                            isValideEmail(this.state.user.email) ?
                                                            null :
                                                            (<div className="invalid-feedback">
                                                                * Ceci n'est pas un mail valide
                                                            </div>)
                                                        }
                                                </div>
                                                {
                                                    alertMsg ?
                                                    <div>
                                                        <div className="bouncing-loader">
                                                            <div></div>
                                                            <div></div>
                                                            <div></div>
                                                        </div>
                                                    </div> :
                                                    <div></div>
                                                }
                                                <input disabled={!isValideEmail(this.state.user.email)} type="submit" className="btn btn-solid-lg" value="ENREGISTRER" style={{ outline: 'none', width: '100%' }}/>
                                            </fieldset>
                                        </form>
                                    </Grid>
                                    <Grid item xs={12} style={{ padding: '20px 20px 0 0' }}>
                                        <Button size="large" style={{ margin: '10px', outline: 'none', width: '100%', background: '#FFF' }} color="secondary" onClick={() => {this.handleOpenUpdatePass()}}>Changer mon mot de passe</Button>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>


                    <div>
                        <Dialog
                            open={this.state.openUpdatePass}
                            onClose={this.handleCloseUpdatePass}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Changer mon mot de passe"}<p onClick={() => this.handleCloseUpdatePass()} style={{ cursor: 'pointer', float: 'right', width: '20px', color: 'grey', fontWeight: 'bold' }}>{"X"}</p></DialogTitle>
                            <DialogContent>
                                <div id="alert-dialog-description" style={{ minWidth: "500px"}}>
                                    <form onSubmit={this.changeMyPassword}>
                                        <fieldset>
                                            <div className="form-group">
                                                <input
                                                    name="lastPassword"
                                                    type="password"
                                                    id="lastInput"
                                                    className="form-control"
                                                    value={this.state.lastPassword}
                                                    onChange={this.handleChangePass}
                                                    placeholder={"Ancien mot de passe"}/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="newPassword"
                                                    type="password"
                                                    id="newInput"
                                                    className="form-control"
                                                    value={this.state.newPassword}
                                                    onChange={this.handleChangePass}
                                                    placeholder={"Nouveau mot de passe"}/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="newPassword2"
                                                    type="password"
                                                    id="newInput2"
                                                    className="form-control"
                                                    value={this.state.newPassword2}
                                                    onChange={this.handleChangePass}
                                                    placeholder={"Confirmation du mot de passe"}/>
                                            </div>
                                            <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{alertMsg}</Typography>
                                            <input type="submit" className="btn btn-solid-lg" style={{ outline: 'none', width: '100%' }} value="Réinitialiser mon mot de passe"/>
                                        </fieldset>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>



                    <div>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleCloseUpdateUser}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Modifier votre profil"}<p onClick={() => this.handleCloseUpdateUser()} style={{ cursor: 'pointer', float: 'right', width: '20px', color: 'grey', fontWeight: 'bold' }}>{"X"}</p></DialogTitle>
                            <DialogContent>
                                <div id="alert-dialog-description" style={{ minWidth: "500px"}}>
                                    <form onSubmit={this.changeMyInfo}>
                                        <fieldset>
                                            <div className="form-group">
                                                <label htmlFor="nameInput">Nom complet</label>
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
                                            {
                                                alertMsg ?
                                                <div>
                                                    <Typography variant="h6" style={{color: '#F00', textAlign: "center"}}>{alertMsg}</Typography>
                                                    <Typography component="p" style={{textAlign: "center"}}>{`${sec} ...`}</Typography>
                                                </div> :
                                                <div></div>
                                            }
                                            <input type="submit" className="btn btn-primary btn-sm" value="Valider"/>
                                        </fieldset>
                                    </form>
                                </div>
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
const connectedUpdateUser = connect(mapState, actionCreators) (UpdateUser);
export { connectedUpdateUser as UpdateUser };

