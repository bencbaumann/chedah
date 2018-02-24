import React, { Component } from "react";


class GigSummary extends Component {

    state = {
            gig: { 
              gigName: "Uber",  
              moneyIn: 7200.25,
              moneyOut: 1875.11,
              net: 4575.22,
            }

    };

    render() {
        return (

            <ul class="collection with-header">
            <li class="collection-header blue-grey darken-4 white-text"><h6><i className="small material-icons teal-text">track_changes</i> GIG SUMMARY</h6></li>
          <li class="collection-item">MONEY IN:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyIn}</span>}</span></li>
          <li class="collection-item">EXPENSES:<span className="right">{<span><sup>$</sup>{this.state.gig.moneyOut}</span>}</span></li>
          <li class="collection-item">NET:<span className="right">{<span><sup>$</sup>{this.state.gig.net}</span>}</span></li>
        </ul>

);
    };
}

export default GigSummary;