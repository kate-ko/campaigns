import React, { Component } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid } from '@material-ui/data-grid';
import API from './API'

const rows = [
    { id: 1, 'bid_cpm': 'Hello', col2: 'World' },
    { id: 2, 'bid_cpm': 'XGrid', col2: 'is Awesome' },
    { id: 3, 'bid_cpm': 'Material-UI', col2: 'is Amazing' },
];

const columns = [
    //{ field: 'id', headerName: 'Id', width: 150 },
    { field: 'bid_cpm', headerName: 'Bid CPM', width: 150 },
    { field: 'col2', headerName: 'col2', width: 150 },
];


export default class extends Component {
    state = {
        camps: []//[{ id: 5, bid_cpm: 10 }]
    }

    componentDidMount() {
        //this.props.store.searchBookmarks()
        API.find().then(data => {
            console.log('got it')
            this.setState({ camps: data.splice(0, 5) })
            this.forceUpdate()
        })
    }

    upd = () => {
        this.setState({ camps: rows })
    }

    render() {
        console.log(this.state.camps)

        return <div>
            <div>Camps</div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={10}/>
            </div>

            <button onClick={this.upd}>UPdate</button>
        </div>
    }
}


