import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

function AddTraining(props) {
    const [open, setOpen] = useState('');

    const [training, setTraining] = useState({
        date: '', 
        duration: '', 
        activity: '', 
        customer: props.params.value
    });

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const handleDateChange = (date) =>{
        setTraining({...training, date: moment.utc(date).toISOString() })
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }

    return(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Training</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker 
                    style={{margin:5}} 
                    label="Date" 
                    name="date" 
                    value={training.date} 
                    onChange={handleDateChange}/>
                    </MuiPickersUtilsProvider>
            
                    <TextField
                            name = "duration"
                            value = {training.duration}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "Duration"
                            fullWidth
                    />
                    <TextField
                            name = "activity"
                            value = {training.activity}
                            onChange = {inputChanged}
                            margin = "dense"
                            label = "activity"
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
                    Add Training
            </Button>
        </div>
    );
}

export default AddTraining