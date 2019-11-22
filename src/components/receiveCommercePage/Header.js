import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { maxWidth } from '@material-ui/system';
// import { Paper, Typography, MobileStepper, Button } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import IMG2 from '../../assets/pub2.png';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
        background: '#000'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
    },
    img: {
        height: 400,
        maxWidth: '100%',
        overflow: 'hidden',
        width: '100%',
        background: '#34495e',
        objectFit: 'cover',
        objectPosition: 'right top'
    },
    div: {
        // background: '#FFF'
    }
}));

const tutorialSteps = [
	{
	  label: 'Bird',
	  imgPath: IMG2,
	},
	{
	  label: 'Bali, Indonesia',
	  imgPath:
		'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
	},
	{
	  label: 'Goč, Serbia',
	  imgPath:
		'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
	},
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    // const maxSteps = tutorialSteps.length;

    // const handleNext = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep + 1);
    // }

    // const handleBack = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep - 1);
    // }

    const handleStepChange = step => {
        setActiveStep(step);
    }

    return (
        <div className={classes.root}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {
                    tutorialSteps.map((step, index) => (
                        <div key={step.label} className={classes.div}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img
                                    className={classes.img}
                                    src={step.imgPath}
                                    alt={step.label}
                                />
                            ) : null}
                        </div>
                    ))
                }
            </AutoPlaySwipeableViews>
            
            {/* <MobileStepper
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>Next</Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>Back</Button>
                }
            /> */}
        </div>
    )
    
}

export default Header;