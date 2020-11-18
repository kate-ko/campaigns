import React, { Component, useState, useEffect } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import API from './API'

const rows: RowsProp = [
    { id: 1, 'bid_cpm': 'Hello', col2: 'World' },
    { id: 2, 'bid_cpm': 'XGrid', col2: 'is Awesome' },
    { id: 3, 'bid_cpm': 'Material-UI', col2: 'is Amazing' },
];

const rows1 = [
    { id: 1, 'bid_cpm': 'Hello', col2: 'World' },
    { id: 2, 'bid_cpm': 'XGrid', col2: 'is Awesome' },
    { id: 3, 'bid_cpm': 'Material-UI', col2: 'is Amazing' },
] as any;

const columns: ColDef[] = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'bid_cpm', headerName: 'Bid CPM', width: 150 },
    { field: 'col2', headerName: 'col2', width: 150 },
];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));


export default function () {
    const [camps, setCamps] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        API.find().then(data => {
            setCamps(data.splice(0,100))
        })
    }, []);

    return <div>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                   Campaigns
        </Typography>
            </Toolbar>
        </AppBar>
        <div style={{ height: '100vh', width: '100%' }}>
            <DataGrid autoPageSize rows={camps} columns={columns} />
        </div>

        <button onClick={console.log}>UPdate</button>
    </div>
}


