import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
// import ImageUploader from 'react-images-upload';
import profileImg from '../../assets/images/users.svg';
import { Button, IconButton, Typography, Paper, Card, Avatar, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';

import grey from '@material-ui/core/colors/grey';

import AddImg from '../../assets/images/addImage.svg'

const styles = theme => ({
    root: {
        height: '100%',
        margin: theme.spacing(2),
        // minWidth: "400px"
    },
    button: {
        margin: theme.spacing(4, 0),
    },
    buttonAction: {
        margin: theme.spacing(1),
    },
    buttonUpload: {
        margin: theme.spacing(1),
    },
    inputLoadPicture: {
        display: 'none'
    },
    input: {
        display: 'none',
    },
    bigAvatar: {
        margin: 10,
        width: 150,
        height: 150,
    },
    firstCardContent: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // WebkitFilter: 'blur(0.5px)'
        //"linear-gradient(to bottom right, #f44336, #fff)"
    },
    secondCardContent: {
        background: 'white',
        paddingLeft: "50px",
        paddingRight: "50px",
        // WebkitFilter: 'blur(0.5px)'
        //"linear-gradient(to bottom right, #f44336, #fff)"
    }
});

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            addCommerce: false,
            isModify: false,
            nbCommerce: 0,
            uploading: false,
            images: [],
            user: {
                name: '',
                username: '',
                email: '',
                picture: ''
            }
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleModifyProfile = this.handleModifyProfile.bind(this);
        this.changeMyInfo = this.changeMyInfo.bind(this);
        
        this.onChange = this.onChange.bind(this);
    }

    handleOpen = (event) => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }


    /**
     * Met a jour la photo de profile
     * @param {*} event 
     */
    onChange(event) {
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

    handleClick() {
        this.setState(state => ({
            open: !state.open
        }));
    }

    handleClick2() {
        this.setState(state => ({
            addCommerce: !state.addCommerce
        }));
    }

    handleModifyProfile() {
        this.setState(state => ({
            isModify: !state.isModify
        }));
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

    changeMyInfo(event) {
        var currentUser = Parse.User.current();
        if (currentUser) {
            currentUser.setEmail(this.state.user.email);
            currentUser.set('name', this.state.user.name);
            currentUser.save()
                .then((user) => {
                    console.log(user);
                    this.handleClose();
                }, (error) => {
                    console.error(error);
                });
            
        } else {
            
        }
        event.preventDefault();
    }

    onFileLoad(event, file) {
        console.log(event.target.result, file.name);
    }

    componentDidMount() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            // console.log(JSON.stringify(currentUser, null, 2));
            currentUser.fetch().then((fetchedUser) => {
                var name = fetchedUser.get('name');
                var PICTURE = fetchedUser.get('profilePictureURL');
                var username = fetchedUser.getUsername();
                var email = fetchedUser.getEmail();
                // var objectId = fetchedUser.id;
                if (!PICTURE) {
                    PICTURE = profileImg
                }
                // console.log(objectId);
                this.setState(prevState => ({
                    user: {                 // object that we want to update
                        ...prevState.user,  // keep all other key-value pairs
                        username: username,       // update the value of specific key
                        email: email,
                        name: name,
                        picture: PICTURE
                    }
                }));
            });
        } else {
            //
        }
        
    }

    render() {

        const { classes } = this.props;

        // const fakeImg = {
        //     height: "100vh",
        //     background: "#aaa"
        // }

        if (this.state.addCommerce) {
            return (
                <Redirect to="/addcommerce" />
            )
        }

        return (
            <div style={{ marginBottom: 20, paddingTop: "90px" }}>
                
                <Paper className={classes.root}>
                    <Card>
                        <CardContent className={classes.firstCardContent}>
                            <div>
                                <IconButton variant="h5" component="h2" onClick={this.handleOpen} style={{ float: "right", color: grey[50]}}>
                                    <EditIcon/>
                                </IconButton>
                                {/* <IconButton variant="body2" component="p" style={{ color: grey[300]}}>
                                    {this.state.user.email}
                                </IconButton> */}
                            </div>
                        
                            <center style={{ padding: "50px" }}>
                                <Avatar alt="Image de profile" src={this.state.user.picture} className={classes.bigAvatar} />
                                <Typography variant="h5" component="h2" style={{ color: grey[50]}}>
                                    {this.state.user.name}
                                </Typography>
                                <Typography variant="body2" component="p" style={{ color: grey[300]}}>
                                    {this.state.user.email}
                                </Typography>
                            </center>
                        </CardContent>
                        <CardActions className={classes.secondCardContent}>
                            <center>
                                <Button
                                    size="small"
                                    color="primary"
                                    className={classes.buttonAction}
                                    onClick={this.handleClick2}>Creer un nouveau commerce</Button>

                                {/* <Button size="small" color="primary" className={classes.buttonAction}>Bouton 2</Button> */}
                                <Button
                                    size="small"
                                    color="primary"
                                    className={classes.buttonAction}
                                    onClick={this.handleOpen}>Modifier le profile</Button>
                            </center>
                        </CardActions>
                    </Card>
                </Paper>











                <div style={{ color: grey[900], paddingTop: "90px" }}>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
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
                                    className={classes.inputLoadPicture}
                                    onChange={this.onChange} />
                                <label htmlFor="icon-input-file">
                                    <img
                                        src={AddImg}
                                        className="rounded"
                                        alt="Default profile"
                                        style={{ width: 200 }}/>
                                    {/* {this.state.user.picture} */}
                                </label>

                                {/* <ImageUploader
                                    withIcon={false}
                                    buttonText="Choisir une image"
                                    onChange={this.onChange}
                                    imgExtension={['.jpg', '.png']}
                                    maxFileSize={5242880}
                                /> */}

                                <h2 style={{ color: grey[900] }}>{this.state.user.name}</h2>

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
                                <hr className="d-sm-none"></hr>
                                <button className="btn btn-primary btn-sm invisible" onClick={this.handleClick}>Modifier le profile</button>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>

                    
                </div>
            </div>



        )
    }
}

export default withStyles(styles) (Profile);