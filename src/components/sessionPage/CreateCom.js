import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Paper, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core';

import { UpdateUser } from './UpdateUser';
import UploadMovie from './components/UploadMovie';

import { connect /*, useDispatch*/ } from 'react-redux';
import { allEvent } from '../../redux/actions';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    backButton: {
        marginRight: '8px',
        outline: 'none'
    },
    instructions: {
        marginTop: '8px',
        marginBottom: '8px',
    }
}))

function getSteps() {
    return ['Création d\'un nouveau commerce', 'Ajouter des images', 'Ajouter une vidéo'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 2:
            return <UpdateUser/>;//'Formulaire du commerce...';
        case 1:
            return 'Formulaire d\'ajout des images du commerce...';
        case 0:
            return <UploadMovie/>;//'Formulaire d\'ajout d\'une vidéo du commerce...';
        default:
            return 'Unknown stepIndex';
    }
}




// action pour recuperer le state
const mapStateToProps = (state) => ({
    state
})

// action pour modifier le state
const actionCreators = {
    uploadFinish: allEvent.finishUploadMovie
}





function CreateCom(states, props) {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const steps = getSteps()

    const handleNext = () => {
        console.log(states.state.allEvent)
        console.log(states.state)
        console.log(states)
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    // const dispatch = useDispatch();

    const aaa = () => {
        this.props.dispatch({finish_upload_movie: false})
        console.log("+++")
    }

    const handleBack = () => {
        // console.log("+++"+dispatch)
        // dispatch({finish_upload_movie: false})
        // this.uploadFinish(true)
        aaa()
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <div style={{ marginTop: '70px', background: '#bdbdbd', paddingTop: '10px', paddingBottom: '10px' }}>
            <Container maxWidth={'md'}>
                <Paper style={{padding: '10px'}}>
                    <div className={classes.root}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>Commerce créé avec succès</Typography>
                                    <Button onClick={handleReset} style={{outline: 'none'}}>Réinitialiser</Button>
                                </div>
                            ) : (
                                <div>
                                    <div className={classes.instructions}>
                                        {getStepContent(activeStep)}
                                    </div>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                            style={{outline: 'none'}}
                                        >Retour</Button>
                                        <Button variant="contained" color="primary" onClick={handleNext} style={{outline: 'none'}}>
                                            {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Paper>
            </Container>
        </div>
    )

}


export default connect(mapStateToProps, actionCreators) (CreateCom);