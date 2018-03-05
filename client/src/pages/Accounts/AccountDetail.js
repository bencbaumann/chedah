import React, {Component} from 'react';
import {Col, Row, Container} from '../../components/Grid';
import {Account, GigMenu} from '../../components/Accounts';
import Moment from 'react-moment';
import API from '../../utils/API';
import {Table} from '../../components/DataTable';
import {formatCurrencyValueJSX} from '../../utils/currency';
import axios from 'axios';

// calculates the next due date of a credit card
function nextDueDate(day) {
    const dueDate = new Date();
    const diff = day - dueDate.getDate();
    if (diff < 1) {
        dueDate.setMonth(dueDate.getMonth() + 1)
    }
    dueDate.setDate(day);
    return dueDate;
}

const defaultHeaders = [
    {
        name: 'Date',
        align: 'left'
    }, {
        name: 'Vendor',
        align: 'left'
    }, {
        name: 'Category',
        align: 'left'
    }, {
        name: 'Gig',
        align: 'center'
    }, {
        name: 'Amount',
        align: 'right'
    }
]

// Account detail page
class AccountDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accountId: this.props.match.params.id,
            transactions: [],
            headers: defaultHeaders,
            gigName: null
        };
    }

    //
    gigSelected(gigId, gigName) {
        if (this.state.gigName == gigName) {
            return
        }

        this.setState({gigName: gigName})
        console.log(`-> gig updated: "${gigName}":`, gigId);
        this.updateDefaultGig(this.state.accountId, gigId)
    }

    // callback to backend
    updateDefaultGig(itemId, gigId) {
        axios.post('/accounts', itemId).then((gigData) => {
            console.log(gigData)
        }).catch((err) => {
            console.log(err)
        });
    }

    componentWillMount() {
        API.loadUserData().then(userData => {
            this.setState({user: userData})
            console.log(`-> AccountDetail: `, userData);
        }).catch(console.log)
    }

    // load account details from the id, then get transactions
    componentDidMount() {
        // query account data from the url params
        API.getAccountDetails(this.state.accountId).then(accdata => {
            this.setState({
                ...accdata
            })
            return API.loadAccountTransactions()
        }).then(transdata => {
            // add transactions to table
            this.addTransactions(transdata)
            console.log(`-> AccountDetail: `, this.state);
        }).catch(err => {
            console.log(err)
        });
    }

    // add transactions to table
    addTransactions(transactions) {
        let rows = [];
        transactions.forEach(trans => {
            this.state.user.gigs.forEach(gig => {
                if (trans.gigId == gig._id) {
                    trans.gig = gig.name
                }
            })
            rows.push(trans)
        })

        this.setState({transactions: rows})
    }

    // update a transaction
    transactionsUpdated(data) {
        let transdata = [];
        this.state.transactions.forEach(t => {
            if (t._id === data.id) {
                t[data.role] = data.value;
            }
            transdata.push(t)
        })

        this.setState({transactions: transdata})
    }

    renderCreditTable() {
        const avail = (this.state.limit - this.state.balance);
        return (<table className="account-balances">
            <tbody>
                <tr className="account-balance">
                    <td className="description">Balance:</td>
                    <td>{formatCurrencyValueJSX(this.state.balance)}</td>
                    <td className="stats">
                        <span className="new badge" data-badge-caption="% APR">{this.state.apr}</span>
                    </td>
                </tr>

                <tr className="account-avail">
                    <td className="description">Available:</td>
                    <td>{formatCurrencyValueJSX(avail)}</td>
                    <td></td>
                </tr>

                <tr className="account-limit">
                    <td className="description">Limit:</td>
                    <td>{formatCurrencyValueJSX(this.state.limit)}</td>
                    <td></td>
                </tr>

                {
                    this.state.fees != null
                        ? <tr className="account-fees">
                                <td className="description">Fees:</td>
                                <td>{formatCurrencyValueJSX(this.state.fees)}</td>
                                <td></td>
                            </tr>
                        : <tr></tr>
                }
            </tbody>
        </table>)
    }

    renderCheckingTable() {
        return (<table className="account-balances">
            <tbody>
                <tr className="account-balance">
                    <td className="description">Balance:</td>
                    <td>{formatCurrencyValueJSX(this.state.balance)}</td>
                </tr>
            </tbody>
        </table>)
    }

    renderGigDropdown() {
        if (this.state.user) {
            let buttonLabel = (this.state.gigName)
                ? this.state.gigName
                : 'Gig: ';
            return (<div>
                <a href="#!" className='acct-gig-menu-trigger btn' data-activates='acct-gig-menu'>{buttonLabel}</a>

                <ul id='acct-gig-menu' className='dropdown-content'>
                    {
                        this.state.user.gigs.map(gig => <li key={gig._id} data-value={gig._id}>
                            <a onClick={this.gigSelected.bind(this, gig._id, gig.name)} href="#!">{gig.name}</a>
                        </li>)
                    }
                </ul>
            </div>)
        }
        return (<div></div>)
    }

    render() {
        let accountDetails;
        let dueDate;
        if (this.state.accountType === 'credit') {
            accountDetails = this.renderCreditTable()
            dueDate = <h6 className="account-due">
                <span className='date-due'>Due: {<Moment format="MMMM DD, YYYY">{nextDueDate(this.state.dueDate).toDateString()}</Moment>}</span>
            </h6>
        } else {
            accountDetails = this.renderCheckingTable()
        }
        return (<div className="container fluid">
            <div className="card-panel account-detail">
                <div className="row valign-wrapper s12">
                    <div className="col l7">
                        <h4>
                            <i className="material-icons">credit_card</i>
                            <span className="account-header">
                                {this.state.name}</span>
                        </h4>
                        <h5 className="account-number">
                            {this.state.accountNum}</h5>
                        {dueDate}
                        {this.renderGigDropdown()}
                    </div>

                    <div className="col l5">
                        {accountDetails}
                    </div>
                </div>

                <br/>
                <br/>

                <div className="row account-transations">

                    <Table transactionsUpdated={this.transactionsUpdated.bind(this)} {...this.state}/>
                </div>
            </div>
        </div>);
    }
}

export default AccountDetail;
