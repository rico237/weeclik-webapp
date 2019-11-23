import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

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
        position: 'relative',
        width: '100%' /* for IE 6 */
    }
}));

const tutorialSteps = [
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

function Header(commerceParams) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

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
                            <div style={{
                                font: 'bold 24px/45px Helvetica, Sans-Serif',
                                letterSpacing: '-1px',
                                background: 'rgba(0, 0, 0, 0.3)',
                                color: 'white',
                                position: 'absolute',
                                top: 0, left: 0,
                                width: '100%', height: '100%'}}>
                                <div style={{
                                    position: 'relative',
                                    textAlign: 'center'
                                }}>
                                    <h1 style={{textAlign: 'center', marginTop: '150px'}}>{commerceParams.name}</h1>
                                    <p style={{fontStyle: 'italic'}}>{commerceParams.type}</p>
                                    <p style={{
                                        position: 'absolute',
                                        marginLeft: '16px',
                                        marginBottom: '8px',
                                        marginTop: '70px'}}>{commerceParams.nbShare}{' '} <FavoriteRoundedIcon/></p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </AutoPlaySwipeableViews>
        </div>
    )
    
}

export default Header;