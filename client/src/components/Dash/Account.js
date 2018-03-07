import React, {Component} from 'react';
import {Badge, Chip} from 'react-materialize';
import {formatCurrencyValueJSX} from '../../utils/currency';


// materialize account preview widget
class Account extends Component {

    constructor(props) {
        super(props);
        console.log(`-> Account: `, props);
    };

    renderGigs() {
        const gigList = (this.props.gigs) || []
        return (gigList.map((gig, i) => <div key={i} className='chip'>{gig}</div>));
    };

    renderChecking() {
        const gigs = this.renderGigs();
        const checkingTotal = formatCurrencyValueJSX(this.props.balance);
        const accountHref = `accounts/${this.props._id}`;
        return (
                <div className='row collapsible-body'>
                <div className='row'>
                    <div className='col s8'>
                        <i className='material-icons inflex'>attach_money</i>
                        <a className="side-headers" href={accountHref}> {this.props.name}</a>
                    </div>
                    <div className='col s4 account-total'>{checkingTotal}</div>
                </div>

                <div className='row pl-1'>

                    <div className='col s12'>
                        <div className='chip'>No Gig</div>
                    </div>

                </div>
            </div>
        );
    };

    renderCredit() {
        const gigs = this.renderGigs();
        const creditTotal = formatCurrencyValueJSX(this.props.limit);
        const creditBalance = formatCurrencyValueJSX(this.props.balance);
        const accountHref = `accounts/${this.props._id}`;
        return (

                <div className='row collapsible-body'>
                <div className='row'>
                    <div className='col s8'>
                        <i className='material-icons inflex'>credit_card</i>
                        <a className="side-headers" href={accountHref}> {this.props.name}</a>
                    </div>
                    <div className='col s4 account-total'>{creditBalance}</div>
                </div>

                <div className='row pl-1'>

                    <div className='col s8'>
                        <div className='chip'>No Gig</div>
                    </div>
                    <div className='col s4 account-total right-align'>
                        <div>{creditTotal}</div>
                    </div>

                </div>
            </div>

        )
    };

    render() {
        let result;

        if (this.props.accountType === 'checking') {
            result = this.renderChecking();
        } else {
            result = this.renderCredit();
        }

        return (result);
    }
}

export default Account;
