import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: '16px'
        },
        marginTop: '16px',
        marginBottom: '16px'
    }
}))

export default function Progress() {
    const classes = useStyles();
    const [completed, setCompleted] = React.useState(0);

    React.useEffect(() => {
        function progress() {
            setCompleted(oldCompleted => {
                if (oldCompleted === 100) {
                    return 100; // 
                }
                const diff = Math.random() * 10;
                return Math.min(oldCompleted + diff, 100);
            })
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        }
    }, [])
    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={completed}/>
        </div>
    )
}