import React, { Component } from 'react';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
// import ImageUploader from 'react-images-upload';
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
    buttonUpload: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
});

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canModify: false,
            addCommerce: false,
            isModify: false,
            nbCommerce: 0,
            uploading: false,
            images: [],
            user: {
                name: '',
                username: '',
                email: '',
                picture: 'https://weeclik-server-dev.herokuapp.com/parse/files/JVQZMCuNYvnecPWvWFDTZa8A/dc21467414b2346642648e97e589c888_image.png'
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


    /**
     * Met a jour la photo de profile
     * @param {*} event 
     */
    onChange(event) {
        var currentUser = Parse.User.current();

        // console.log(event.target.files[0]);
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
                // console.log("----------------<<<<<<<<<<<<<"+file.name+">>>>>>>>>>----------------");
                // console.log(file.url());// TODO sauvegarder dans la table USER
            }, (error) => {
                console.error(error);
            });
        } else {
            
        }
        
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
                    // console.log(user);
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

    getNbCommerce() {
        var Commerce = Parse.Object.extend("Commerce");
        var query = new Parse.Query(Commerce);
        query.equalTo("owner", Parse.User.createWithoutData("EruF4h35eI"));//this.state.currentUser.id
        // console.log(query.count);

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
                var objectId = fetchedUser.id;
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

        if (this.state.canModify) {
            return (
                <div>
                    <img src={this.state.user.picture} className="rounded" style={{ width: 200 }} alt="Default profile"/>
                    <input type="file" onChange={this.onChange} />

                    {/* <ImageUploader
                        withIcon={false}
                        buttonText="Choisir une image"
                        onChange={this.onChange}
                        imgExtension={['.jpg', '.png']}
                        maxFileSize={5242880}
                    /> */}

                    <h2>{this.state.user.name}</h2>
                    {/* <h3>Coordonnées</h3>
                    <p>Lorem ipsum dolor sit ame.</p> */}

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
                <p>{this.state.user.email}</p>

                {/* <p>{this.getNbCommerce()}</p> */}

                {/* <h3>Coordonnées</h3>
                <p>Lorem ipsum dolor sit ame.</p> */}

                {/* <form>
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
                </form> */}
                <hr className="d-sm-none"></hr>
                <button className="btn btn-primary btn-sm" onClick={this.handleClick}>Modifier votre profile ?</button>
                <hr className="d-sm-none"/>
                <div>
                    <Button variant="contained" className={classes.button} onClick={this.handleClick2}>Creer un Nouveau commerce</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles) (Profile);