import React, { Component } from 'react';
import { } from 'react-router-dom';
import NavBar from './NavBar';
import Commerce from './Commerce';
import Footer from './Footer';
import Profile from '../profile/Pofile'
import { Paper, Grid, Container } from '@material-ui/core';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        
        return (
            <div>
                <NavBar/>
                {/* <div>
                    <Container>
                        <Paper>
                            <Grid container spacing={2}>
                                <Grid item xs zeroMinWidth>
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                </Grid>
                                <Grid item>
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                yfyuviyv hiyu hlbug uigiugi giuguigugui
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </div> */}
                <div className="container" style={{marginTop: "30px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <Profile/>
                        </div>
                        <div className="col-sm-8">
                            <Commerce/>
                            <Commerce/>
                            <Commerce/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default Account;