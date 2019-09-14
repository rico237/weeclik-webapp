import React, { Component } from 'react';
import Parse from 'parse';
import { Link, Redirect } from 'react-router-dom';
import profileImg from '../../assets/images/users.svg';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        height: '100%',
    },
    button: {
        margin: theme.spacing(4, 0),
    },
});

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canModify: false,
            addCommerce: false,
            isModify: false,
            user: {
                name: '',
                username: '',
                email: '',
                picture: 'https://fr.wikipedia.org/wiki/Image#/media/Fichier:Image_created_with_a_mobile_phone.png'
            }
        };

        // Cette liaison est nécéssaire afin de permettre
        // l'utilisation de `this` dans la fonction de rappel.
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleModifyProfile = this.handleModifyProfile.bind(this);
        this.changeMyInfo = this.changeMyInfo.bind(this);

    }

    handleClick() {
        this.setState(state => ({
            canModify: !state.canModify
        }));
    }

    handleClick2() {
        this.setState(state => ({
            addCommerce: !state.addCommerce
        }));
    }

    handleModifyProfile() {
        this.setState(state => ({
            canModify: !state.canModify,
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
                    this.setState(state => ({
                        canModify: !state.canModify
                    }));
                }, (error) => {
                    console.error(error);
                });
            
        } else {
            
        }
        event.preventDefault();
    }

    componentDidMount() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            console.log(JSON.stringify(currentUser, null, 2));
            currentUser.fetch().then((fetchedUser) => {
                var name = fetchedUser.get('name');
                var PICTURE = fetchedUser.get('profilePictureURL');
                var username = fetchedUser.getUsername();
                var email = fetchedUser.getEmail();
                var objectId = fetchedUser.id;
                if (PICTURE === "") {
                    PICTURE = profileImg
                }
                console.log(objectId);
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

        const fakeImg = {
            height: "100vh",
            background: "#aaa"
        }

        if (this.state.addCommerce) {
            return (
                <Redirect to="/addcommerce" />
            )
        }

        if (this.state.canModify) {
            return (
                <div>
                    <img src={this.state.user.picture} className="rounded" style={{ width: 200 }} alt="Default profile"/>
                    <h2>{this.state.user.name}</h2>
                    <h3>Coordonnées</h3>
                    <p>Lorem ipsum dolor sit ame.</p>

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
                </div>
            )
        }

        return (
            <div style={{ marginBottom: 20 }}>
                <img src={this.state.user.picture} className="rounded" style={{ width: 200 }} alt="Default profile"/>
                <h2>{this.state.user.name}</h2>
                <h3>Coordonnées</h3>
                <p>Lorem ipsum dolor sit ame.</p>

                <form>
                    <fieldset disabled>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" id="nameInput" className="form-control" placeholder={this.state.user.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Mail</label>
                            <input type="email" id="emailInput" className="form-control" placeholder={this.state.user.email}/>
                        </div>
                    </fieldset>
                </form>
                <hr className="d-sm-none"></hr>
                <button className="btn btn-primary btn-sm" onClick={this.handleClick}>Modifier votre profile ?</button>
                <hr className="d-sm-none"></hr>
                <div>
                    <Button variant="contained" className={classes.button} onClick={this.handleClick2}>Creer un Nouveau commerce</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles) (Profile);