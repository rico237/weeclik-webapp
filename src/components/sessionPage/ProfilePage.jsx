import React, { Component } from 'react';
import Parse from 'parse';
import { Avatar, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import logo from '../../assets/icons/LogoWeeclik.svg';
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
            open: false,
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

    getUserPicture() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            currentUser.fetch().then((snapshot) => {
                var name = snapshot.get('name');
                var PICTURE = snapshot.get('profilePictureURL');
                var username = snapshot.getUsername();
                var mail = snapshot.getEmail();

                if (!PICTURE) {
                    PICTURE = {logo}
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
        // const { user } = this.props;
        return (
            <header className="App-header">
                <Avatar
                    alt="Image de profile"
                    src={this.state.user.picture}
                    style={{
                        margin: 10,
                        width: 150,
                        height: 150,
                    }}
                    />

                <h1>Hi {this.state.user.name}</h1>
                <h3>{this.state.user.username}</h3>

                <Button onClick={() => {this.handleOpenUpdateProfile()}}>Modifier</Button>





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

