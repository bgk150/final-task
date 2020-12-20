import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function EditCustomer(props) {
    const [open, setOpen] = useState('');

    const [customer, setCustomer] = useState({
        firstname:'' ,
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '' 
    });

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname ,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        });
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        props.updateCustomer(props.params.value, customer);
        handleClose();
    }

    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                            name = "firstname"
                            value = {customer.firstname}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Firstname"
                            fullWidth
                    />
                    <TextField
                            name = "lastname"
                            value = {customer.lastname}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Lastname"
                            fullWidth
                    />
                    <TextField
                            name = "streetaddress"
                            value = {customer.streetaddress}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Street Address"
                            fullWidth
                    />
                    <TextField
                            name = "postcode"
                            value = {customer.postcode}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Postcode"
                            fullWidth
                    />
                    <TextField
                            name = "city"
                            value = {customer.city}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "City"
                            fullWidth
                    />
                    <TextField
                            name = "email"
                            value = {customer.email}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Email"
                            fullWidth
                    />
                    <TextField
                            name = "phone"
                            value = {customer.phone}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Phone"
                            fullWidth
                    />
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Edit Customer
            </Button>
        </div>
    );
}

export default EditCustomer