import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
      padding: theme.spacing(0.5),
    },
  }));

function PopupMessage(props) {

    const [open, setOpen] = React.useState(props.open);

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
        >
            <SnackbarContent
                style={{background: `${props.bgColor}`, color: `${props.fgColor}`}}
                message={<span id="message-id">{props.message}</span>}
                action={
                    <Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                            className={classes.close}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Fragment>
                }
            />
        </Snackbar>
    )
}

PopupMessage.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
};

export { PopupMessage };