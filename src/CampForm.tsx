import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from './API'

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        position: 'absolute' as 'absolute',
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '44ch',
        },
    },
    button: {

    }
}));

type FormProps = { open: boolean, handleClose: () => void, find: () => void, showAlert: (data: any) => void; };

export default function SimpleModal({ open, handleClose, find, showAlert }: FormProps) {
    const [state, setState] = useState({
        name: "",
        priority: 0,
        bid_cpm: 0,
        daily_frequency_capping: 0,
        creative_url: '',
        daily_spend: 0,
        is_accelerated_daily_spend: 0,
    });

    const [error, setError] = useState(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle); // getModalStyle is not a pure function, we roll the style only on the first render

    const create_new_camp = () => {
        if (!state.name) {
            setError(true)
            return
        }
        else setError(false)

        API.add(state).then((data) => {
            showAlert({ message: 'Successfully added', type: 'success' })
            handleClose()
            find()
        }).catch(err => {
            showAlert({ message: `Failed to add. Error: ${err}`, type: 'error' })
            handleClose()
        })

    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Create New Campaign</h2>

            <form className={classes.root} noValidate autoComplete="off">

                <TextField id="outlined-basic" error={error} helperText="*Required" label="Name" variant="outlined" value={state.name} name="name" onChange={handleChange} required />
                <TextField id="outlined-basic" label="Priority" type="number" variant="outlined" value={state.priority} name="priority" onChange={handleChange} />
                <TextField id="outlined-basic" label="Bid CPM" type="number" variant="outlined" value={state.bid_cpm} name="bid_cpm" onChange={handleChange} />
                <TextField id="outlined-basic" label="Daily Frequency Capping" type="number" variant="outlined" value={state.daily_frequency_capping} name="daily_frequency_capping" onChange={handleChange} />
                <TextField id="outlined-basic" label="Daily Spend" type="number" variant="outlined" value={state.daily_spend} name="daily_spend" onChange={handleChange} />
                <TextField id="outlined-basic" label="Is Accelerated Daily Spend" type="number" variant="outlined" value={state.is_accelerated_daily_spend} name="is_accelerated_daily_spend" onChange={handleChange} />
                <TextField id="outlined-basic" label="Creative URL" variant="outlined" value={state.creative_url} name="creative_url" onChange={handleChange} required />
            </form>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" disabled={false} className={classes.button} onClick={create_new_camp}>
                    Create
                </Button>
            </div>

        </div>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
