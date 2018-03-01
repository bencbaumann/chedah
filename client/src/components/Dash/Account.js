import React, { Component } from 'react';
import { Badge, Chip } from 'react-materialize';
import { formatCurrencyValueJSX } from '../../utils/currency';


// materialize account preview
// TODO: need to differentiate between checking & credit
class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            accountType: props.accountType || 'checking',
            total: props.total,
            balance: props.balance || 0,
            gigs: props.gigs || []
        };
    };

    renderGigs() {
        return (this.state.gigs.map((gig, i) => <div key={i} className='chip'>{gig}</div>));
    };

    renderChecking() {
        const gigs = this.renderGigs();
        const checkingTotal = formatCurrencyValueJSX(this.state.total);
        const accountHref = `accounts/${this.state.id}`;
        return (
            <div className='row collapsible-body'>
                <div className='col s8'>
                    <p className='collections-title'>
                        <i className='material-icons inflex'>attach_money</i> <a href={accountHref}>{this.state.name}</a></p>
                        {gigs}
                </div>
                <div className='col s4 account-total'>
                    <p>
                        <span>{checkingTotal}</span>
                    </p>
                </div>
            </div>
        );
    };

    renderCredit() {
        const gigs = this.renderGigs();
        const creditTotal = formatCurrencyValueJSX(this.state.total);
        const creditBalance = formatCurrencyValueJSX(this.state.balance);
        const accountHref = `accounts/${this.state.id}`;
        return (
            <div className='row collapsible-body'>
                <div className='col s8'>
                    <p className='collections-title'>
                        <i className='material-icons inflex'>credit_card</i> <a href={accountHref}>{this.state.name}</a></p>
                    {gigs}
                </div>
                <div className='col s4 account-total'>
                    <p>
                        <span>{creditTotal}</span>
                    </p>
                    <p>
                        <span>{creditBalance}</span>
                    </p>
                </div>
            </div>
        );
    };

    render() {
        let result;

        if (this.state.accountType === 'checking') {
            result = this.renderChecking();
        } else {
            result = this.renderCredit();
        }

        return (result);
    }
}

export default Account;
