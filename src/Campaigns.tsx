import React, { useState, useEffect } from 'react';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
//import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import API from './API'
import CampForm from './CampForm'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const usdPrice = {
    type: 'number',
    width: 130,
    valueFormatter: (data: any) => currencyFormatter.format(Number(data.value)),
    //cellClassName: 'font-tabular-nums',
};

const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'priority', headerName: 'Priority', width: 150 },
    { field: 'bid_cpm', headerName: 'Bid CPM', ...usdPrice, width: 150 },
    { field: 'daily_frequency_capping', headerName: 'Daily Frequency Cap', width: 150 },
    { field: 'daily_spend', headerName: 'Daily Spend', ...usdPrice, width: 150 },
    { field: 'is_accelerated_daily_spend', headerName: 'Accelerated Daily Spend', ...usdPrice, width: 150 },
    {
        field: 'creative_url', headerName: 'URL', width: 500, renderCell: (params: any) => (
            <a href={params.value} target="_blank" rel="noreferrer" >
                {params.value}
            </a>
        ),
    },
];

const rows: RowsProp = []

export default function Campaigns() {
    const [camps, setCamps] = useState(rows);
    const [loading, setLoading] = useState(true)

    const [alert, setAlert] = useState({
        open: false,
        type: '',
        message: ''
    })

    const showAlert = (data: any) => {
        const { message, type } = data;
        setAlert({ open: true, message, type })
        setTimeout(() => { setAlert({ open: false, message: '', type: ''}) }, 2000)
    }

    const find = () => {
        setLoading(true)

        API.find().then(data => {
            setCamps(data)
            setLoading(false)
        }).catch(err => {
            showAlert({ message: `Failed to fetch campaigns. Error: ${err.toString()}`, type: 'error' })
            setLoading(false)
        })
    }
    useEffect(find, []);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <div>
        <AppBar position="static">
            <Toolbar variant="dense">

                <Typography variant="h6" color="inherit">
                    Campaigns
                </Typography>

                <Icon style={{ fontSize: 30, paddingLeft: '20px' }} onClick={handleOpen}>add_circle</Icon>
            </Toolbar>
        </AppBar>

        <CampForm open={open} handleClose={handleClose} find={find} showAlert={showAlert} />

        <Snackbar open={alert.open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity={alert.type}>
                {alert.message}
            </Alert>
        </Snackbar>

        <div style={{ height: 'calc(100vh - 50px)', width: '100%' }}>
            <DataGrid autoPageSize={true} rows={camps} columns={columns} loading={loading} />
        </div>
    </div>
}




