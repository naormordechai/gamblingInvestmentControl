import React from 'react';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogTransition = ({ open, handleCloseDialogTransition, children, className }) => {
    return (
        <Dialog
            classes={{ paper: className }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialogTransition}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {children}
        </Dialog>
    )
}
