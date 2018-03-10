import React, { Component } from 'react';
import API from '../../utils/API';
//const $ = require('jquery');
import { Input } from 'react-materialize'


// add gig modal
class ModalAddGig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getAccountList(accounts) {
        let accountList = [<option key={0} disabled>None</option>]
        accounts.forEach(acct =>{
            accountList.push(<option key={acct._id}>{acct.name}</option>)
        });
        return accountList
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidUpdate() {
        // console.log(this.state);
    }

    handleSubmit() {
        console.log(`adding gig: `, this.state);
        API.addGig(this.state)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render() {
        // build a list of accounts
        const accounts = this.props.user.accounts || []
        const accountItems = this.getAccountList(accounts)
        return (
                 <div id="add-gig-modal" className="modal" data-modal style={{width: '60%', height: '40%'}}>
                   <div className="modal-content">
                     <h4>Add a Gig</h4>
                     <div className="col input-field s12">
                       <input value={this.state.name} onChange={this.handleChange} type="text" name="name" id="input-gig-name" />
                       <label className="active" htmlFor="input-gig-name">Gig Name</label>
                     </div>
                     <div className="col input-field s12">
                       <input value={this.state.description} onChange={this.handleChange} type="text" name="description" id="input-gig-description"/>
                       <label className="active" htmlFor="input-gig-description">Description</label>
                     </div>
                     {/* Accounts */}
                     <div className="row">
                       <div className="input-field col s6">
                         <Input s={12} type='select' id="input-gig-account" label="Associate with Account" defaultValue="None">
                           {accountItems}
                         </Input>
                       </div>
                     </div>
                   </div>
                   <div className="modal-footer">
                     <section>
                       <button className="btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text">Cancel</button>
                       &nbsp;
                       <button onClick={this.handleSubmit} className="btn waves-effect waves-light modal-action modal-close teal">Apply</button>
                     </section>
                   </div>
                 </div>
        );
    }
}

export default ModalAddGig;
