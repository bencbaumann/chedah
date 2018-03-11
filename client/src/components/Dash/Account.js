import React from 'react'
import { formatCurrencyValueJSX } from '../../utils/currency'

// materialize account preview widget
class Account extends React.Component {

  renderGigs () {
    const gigList = (this.props.gigs) || []
    return (gigList.map((gig, i) => <div key={i} className='chip'>
                                      {gig}
                                    </div>))
  // console.log('this.props.user.gigs')
  // console.log(this.props.user.gigs)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({...nextProps})
  }

  renderType (accountType) {
    // const gigs = this.renderGigs()
    const balance = formatCurrencyValueJSX(this.props.balances.current)
    const accountHref = `accounts/${this.props._id}`
    console.log(`gig name: `, this.props.defaultGigId)
    return (
      // This is buggy, fix it then add it back after
      // <div className='row collapsible-body'>
      <div className='row'>
        <div className='row'>
          <div className='col s8'>
            <i className='material-icons inflex'>{accountType}</i>
            <a className='side-headers' href={accountHref}>
              {this.props.name}
            </a>
          </div>
          <div className='col s4 account-total'>
            {balance}
          </div>
        </div>
        <div className='row pl-1'>
          <div className='col s8'>
            <div className='chip'>
              {this.props.defaultGigName}
            </div>
          </div>
          {accountType === 'credit_card' && (<div className='col s4 account-total right-align'>
                                               {formatCurrencyValueJSX(this.props.balances.limit)}
                                             </div>)}
        </div>
      </div>
    )
  }

  render () {
    return (<div>
              {this.props.type === 'credit' && this.renderType('credit_card')}
              {this.props.type !== 'credit' && this.renderType('attach_money')}
            </div>)
  }
}

export default Account
