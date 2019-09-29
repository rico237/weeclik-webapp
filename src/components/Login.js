import React, { Component, Fragment } from 'react';
import Parse from 'parse';
import { Link, Redirect } from 'react-router-dom';
import LoadApp from './external_link/LoadApp';
import img_promo from '../assets/images/pub_example.png';
import img_promo2 from '../assets/images/img1.png';
import Logo from '../assets/images/logo.svg';
import Footer from './Footer';
import { Grid, CssBaseline, Typography, Paper, Button, AppBar, Toolbar, Avatar } from '@material-ui/core';
// import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

// import YouTube from 'react-youtube';

const styles = theme => ({
    root: {
        height: '100%',
    },
    image: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        color: 'white',
        backgroundImage: `url(${img_promo})`,
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        // width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root2: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#000',
    },
});


const greyColor = grey[500];
const whiteColor = grey[50];


class Login extends Component {

    constructor(props) {
        super(props);
        // Crée une référence pour stocker l’élément DOM div de Connexion
        this.refConnexion = React.createRef(); // Create a ref object

        this.state = {
            account: {
                username: '',
                password: ''
            },
            submitted: false,
            newAccount: false,
            isAuthenticated: false
        };

        this.loginAccount = this.loginAccount.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    gotoRefConnexion = () => {
        if (this.refConnexion.current) {
            this.refConnexion.current.scrollIntoView(true);
            // this.refConnexion.current.scrollIntoView({
            //     behavior: "smooth",
            //     block: "nearest"
            // })
        }
    }

    handleChangeUser(event) {
        const username = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                username
            }
        }));
    }

    handleChangePass(event) {
        const password = event.target.value;
        this.setState(prevState => ({
            account: {
                ...prevState.account,
                password
            }
        }));
    }

    loginAccount(event) {
        console.log("LOGIN");
        event.preventDefault();
        this.setState({ submitted: true });
        console.log(this.state.account.username);
        if (this.state.account.username && this.state.account.password ) {
            try {
                const user = Parse.User.logIn(this.state.account.username, this.state.account.password);
                user.then(() => {
                    if (user) {
                        this.setState({
                            isAuthenticated: true
                        })
                    }
                }).catch((error) => {
                    // alertPopup();
                    alert("Error: " + error.code + "\n" + error.message);
                });
            } catch (error) {
                console.log("LOGIN" + error);
            }
    
        } else {
            return;
        }
    }

    createAccount() {
        console.log("CREATE ACCOUNT");
        if (!this.state.account.username || !this.state.account.password) {
            return;
        }
        console.log("CREATE ACCOUNT" + JSON.stringify(this.account, null, 2));
    }

    render() {

        const { classes } = this.props;

        const { username, password/*, submitted, newAccount*/ } = this.state;

        // const opts = {
        //     height: '390',
        //     width: '640',
        //     playerVars: { // https://developers.google.com/youtube/player_parameters
        //         autoplay: 1
        //     }
        // }

        var currentUser = Parse.User.current();

        if (this.state.isAuthenticated || currentUser) {
            return (
                <Redirect to="/home" />
            )
        }

        

        return (
            
            <Fragment>

                <div className={classes.root2}>
                    <AppBar position="fixed" elevation={1} style={{ backgroundColor: "white" }}>
                        <Toolbar>
                            <Grid edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                                <Avatar alt="user img" src={Logo} className={classes.avatar} />
                            </Grid>
                            <Typography variant="h4" className={classes.title}>Weeclik</Typography>
                            <Button onClick={this.gotoRefConnexion}>Connexion</Button>
                            <Link className="btn btn-outline-primary rounded" style={{ marginLeft: '10px' }} to="/register" role="button">Inscription</Link>
                        </Toolbar>
                    </AppBar>
                </div>

                <div style={{
                    backgroundImage: `url(${img_promo2})`,
                    backgroundRepeat: 'noRepeat',
                    backgroundSize: 'cover',
                    minHeight: '100%',
                    paddingTop: '80px',
                    paddingBottom: '47%'
                    }}>
                    {/* <img src={img_promo2} /> */}
                    <div style={{ margin: '70px', color: whiteColor/*padding: '500px'*/ }}>
                        <Typography component="h1" variant="h1">Weeclik</Typography>
                        <Typography component="h1" variant="h3">On aime et on partage</Typography>
                    </div>
                </div>

                <div ref={this.refConnexion}>

                    <Grid container component="main" className={classes.root}>
                        <CssBaseline/>
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
                            <div className={classes.paper}>
                                <div className={classes.avatar}>
                                    <img src={Logo} className="rounded mx-auto d-block" alt="..." style={{ width : '150px' }}/>
                                </div>
                                <Typography component="h1" variant="h5">On aime, on partage!</Typography>
                                <p className="text-secondary">Gerer vos commerces avec weeclik</p>
                                <form className={classes.form} onSubmit={this.loginAccount}>
                                    <div className="form-group">
                                        <input
                                            value={username}
                                            onChange={this.handleChangeUser.bind(this)}

                                            type="email"
                                            className="form-control border-0 bg-light"
                                            id="exampleInputEmail1"
                                            placeholder="Adresse e-mail"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            value={password}
                                            onChange={this.handleChangePass.bind(this)}

                                            type="password"
                                            className="form-control border-0 bg-light"
                                            id="exampleInputPassword1"
                                            placeholder="Mot de passe"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary rounded mr-2">Se connecter</button>
                                        <Link className="btn btn-outline-primary rounded" to="/register" role="button">Rejoindre weeclik</Link>
                                    </div>
                                                        
                                    <div className="form-group">
                                        <Link className="nav-link" to="/forgotpassword">Mot de passe oublié?</Link>
                                    </div>
                                </form>
                                <LoadApp/>
                            </div>

                        </Grid>
                        {/* Zone Image */}
                        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                        
                    </Grid>

                </div>


                {/* About Section */}
                <div className="w3-container" style={{ padding:'128px 16px'}} id="about">
                    <h3 className="w3-center">ABOUT THE COMPANY</h3>
                    <p className="w3-center w3-large">Key features of our company</p>
                    <div className="w3-row-padding w3-center" style={{ marginTop:'64px'}}>
                        <div className="w3-quarter">
                            <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
                            <p className="w3-large">Responsive</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                        <div className="w3-quarter">
                            <i className="fa fa-heart w3-margin-bottom w3-jumbo"></i>
                            <p className="w3-large">Passion</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                        <div className="w3-quarter">
                            <i className="fa fa-diamond w3-margin-bottom w3-jumbo"></i>
                            <p className="w3-large">Design</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                        <div className="w3-quarter">
                            <i className="fa fa-cog w3-margin-bottom w3-jumbo"></i>
                            <p className="w3-large">Support</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div>
                </div>


                {/* AMBASSADEUR WEECLIK */}
                <div className="w3-container w3-light-grey" style={{ padding: '128px 16px' }}>
                    <div className="w3-row-padding">
                        <div className="w3-col m6">
                            <h3>Devenir Ambassadeur</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/>tempor incididunt ut labore et dolore.</p>
                            <p><a href="#work" className="w3-button w3-black"><i className="fa fa-th"> </i> View Our Works</a></p>
                        </div>
                        <div className="w3-col m6">
                            <img className="w3-image w3-round-large" src={ img_promo2 } alt="Buildings" style={{ width: "700", height: "394" }}/>
                            {/* <YouTube
                                videoId="HEPL30xM25U"
                                opts={opts}
                                onReady={this._onReady}/> */}
                            {/* <CardMedia
                                width="560"
                                height="315"
                                component="video"
                                image="https://youtu.be/HEPL30xM25U?start=45"
                            /> */}
                        </div>
                    </div>
                </div>


                {/* Team Section */}
<div className="w3-container" style={{ padding:'128px 16px' }} id="team">
  <h3 className="w3-center">THE TEAM</h3>
  <p className="w3-center w3-large">The ones who runs this company</p>
  <div className="w3-row-padding w3-grayscale" style={{marginTop:'64px'}}>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <div className="w3-card">
        <img src="/w3images/team2.jpg" alt="Aziz" style={{width:'100%'}}/>
        <div className="w3-container">
          <h3>Aziz</h3>
          <p className="w3-opacity">CEO et Founder</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
          <p><button className="w3-button w3-light-grey w3-block"><i className="fa fa-envelope"></i> Contact</button></p>
        </div>
      </div>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <div className="w3-card">
        <img src="/w3images/team1.jpg" alt="Michel" style={{width:'100%'}}/>
        <div className="w3-container">
          <h3>Michel</h3>
          <p className="w3-opacity">Art Director</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
          <p><button className="w3-button w3-light-grey w3-block"><i className="fa fa-envelope"></i> Contact</button></p>
        </div>
      </div>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <div className="w3-card">
        <img src="/w3images/team3.jpg" alt="Mike" style={{width:'100%'}}/>
        <div className="w3-container">
          <h3>Mike Ross</h3>
          <p className="w3-opacity">Web Designer</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
          <p><button className="w3-button w3-light-grey w3-block"><i className="fa fa-envelope"></i> Contact</button></p>
        </div>
      </div>
    </div>
    <div className="w3-col l3 m6 w3-margin-bottom">
      <div className="w3-card">
        <img src="/w3images/team4.jpg" alt="Dan" style={{width:'100%'}}/>
        <div className="w3-container">
          <h3>Dan Star</h3>
          <p className="w3-opacity">Designer</p>
          <p>Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse sodales pellentesque elementum.</p>
          <p><button className="w3-button w3-light-grey w3-block"><i className="fa fa-envelope"></i> Contact</button></p>
        </div>
      </div>
    </div>
  </div>
</div>

                <div className="">
                    <Grid container spacing={3}
                        style={{
                            textAlign: 'center',
                            backgroundColor: greyColor,
                            color: whiteColor,
                            paddingLeft: '25px',
                            paddingRight: '25px',
                            paddingTop: '50px',
                            paddingBottom: '55px' }}>
                        <Grid item xs={3}>
                            <Typography variant="h4" component="h3">14+</Typography>Partners
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h4" component="h3">55+</Typography>Projects Done
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h4" component="h3">89+</Typography>Happy Clients
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h4" component="h3">150+</Typography>Meetings
                        </Grid>
                    </Grid>
                </div>

                <Footer/>
    
            </Fragment>
            
        )
    }
}

export default withStyles(styles) (Login);