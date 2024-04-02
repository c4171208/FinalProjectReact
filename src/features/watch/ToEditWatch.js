import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { upDateWatchByID } from './watchApi';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const [open, setOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // סטטוס האם העדכון הצליח
    let location = useLocation();
    let item = location.state;

    const [formData, setFormData] = useState({
        model: item.model,
        description: item.description,
        price: item.price,
        urlImg: item.urlImg,
    });
    const user = useSelector((state) => state.user.currentUser);
    let navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onClose = () => {
        navigate("/watches");
    };

    const handleSubmit = async () => {
        try {
            await upDateWatchByID(formData, item._id, user.token);
            setIsSuccess(true); // הצלחת העדכון
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('You are not authorized');
            }
            console.error('Error updating item:', error.message);
        }
    };

    const handleSnackbarClose = () => {
        setIsSuccess(false);
        navigate("/watches");
    };

    return (
        <>
            <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    The product has been updated successfully.
                </Alert>
            </Snackbar>
            <Dialog
                open={true} // Always keep the dialog open
                onClose={onClose} // Call onClose when dialog should be closed
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="md"
                fullWidth>
                <DialogTitle>Update Item</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label="model"
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="url"
                            type="text"
                            name="urlImg"
                            value={formData.urlImg}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" id="button" color='secondary'>
                        Update
                    </Button>
                    <Button onClick={onClose} variant="contained" id="button" color='secondary'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UpdateForm;
