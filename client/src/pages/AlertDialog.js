/* eslint-disable */
import { useSelector, useDispatch } from 'react-redux'
// material
// import { Button, Dialog,  DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

// ----------------------------------------------------------------------
import { setModal } from '../actions/manager';

export default function AlertDialog() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.manager.modalOpen);
    const text = useSelector(state => state.manager.modalText);

    const handleClose = () => {
        dispatch(setModal(false));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle>Use Google's location service?</DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ color: 'white', fontSize: '18px' }}>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
