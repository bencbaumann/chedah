import React from 'react';
import Moment from 'react-moment';
import {formatCurrencyValueJSX} from '../../utils/currency';
import { GigMenu } from '../../components/Menus'

const $ = require('jquery');


class Cell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,   // transaction id
            row: props.row,
            column: props.column,
            role: props.role,
            editable: props.editable || false,
            isEditing: false,
            isUpdated: false,
            align: props.align || 'left',
            autocomplete: props.autocomplete || []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    };

    componentDidMount() {
        let data = this.state.autocomplete.map(item => {
            return {[item.name]: null}
        })
    }

    ///  EVENT HANDLERS  ///

    // focus handler
    handleFocus(e) {
        e.target.select();
    };

    // click handler
    handleClick(e) {
        if (this.state.editable) {
            const row = e.target.getAttribute('row') || -1;
            const column = e.target.getAttribute('column') || -1;
            // console.log(`-> Cell clicked: [ ${row}, ${column} ]`);
            let autoComplete = {}
            this.state.autocomplete.forEach(item => {
                autoComplete[item.name] = null
            })
            this.setState({isEditing: !this.state.isEditing});
            console.log(`completion: `, autoComplete);
            window.$(this.refs.textInput).autocomplete({ data: autoComplete});
            window.$(`.autocomplete`).autocomplete({
              data: autoComplete
            });
        } else {
            return;
        }
    };

    // return an editor for the component (not currently used)
    get editor() {
        if (this.state.role === 'gig')  {
            return <GigMenu gigs={this.props.gigs}/>
        }
    }

    componentDidUpdate() {
        if (this.state.editable) {
            if (this.refs.textInput) {
                this.refs.textInput.select();
            }
        }
    }

    // callback to the parent row
    onBlur(role, e) {

        if (this.state.isEditing === true) {

            let oldValue = this.props.value;
            let newValue = e.target.value

            if (oldValue === newValue) {
                this.setState({
                    isEditing: false,
                    isUpdated: true
                })
                return
            }

            this.props.columnEdited({
                value: {
                    oldValue: oldValue,
                    newValue: newValue
                },
                role: this.state.role,
                location: {
                    row: e.target.getAttribute('row'),
                    column: e.target.getAttribute('column')
                }
            })

            this.setState({
                isEditing: false
            })

        }
    }

      onKeyPress(role, e) {
          if(e.key === 'Enter') {
              // console.log(`enter pressed`);
              this.onBlur(role, e);
          }
      }

      renderGigCell() {
          const isEditing = this.state.isEditing;
          let gigId = this.props.value;
          let gigName = 'no gig'
          return (
              <div
                  className='chip'
                  onClick={this.onClick}
                  >
                  {gigName}
              </div>
          )
      }


    render() {
        let alignment = (this.state.role === 'amount') ? 'right-align' : (this.state.role === 'gig') ? 'center-align' : 'left-align';
        const isEditing = this.state.isEditing;
        let currentVal = this.props.value;
        // format the date
        if (this.state.role === 'date') {
            currentVal =  <Moment format='lll'>{this.props.value}</Moment>
        };

        // format the gig column
        if (this.state.role === 'gig' && !this.state.isEditing)  {
            let gigName;
            this.props.autocomplete.forEach(gig => {
                if (gig.id == currentVal) {
                    gigName = gig.name;
                }
            })
            currentVal = <div className='chip'>{gigName}</div>;
        };

        // format the gig column
        if (this.state.role === 'amount')  {
            currentVal = currentVal.toFixed(2)
        };


        // editable input
        if (this.state.isEditing) {
            let cellId = `${this.props.id}-${this.props.row}-${this.props.column}`
            const autoComplete = (this.state.autocomplete.length > 0) ? 'custom-class editable-cell autocomplete' : 'custom-class editable-cell autocomplete'
            return(
                <td
                    id={cellId}
                    row={this.props.row}
                    column={this.props.column}
                    role={this.role}
                    data-value={this.state.value}
                    >
                    {/* <input type="text" id="autocomplete-input" class="autocomplete"> */}
                    {/* <div className="chips chips-autocomplete"> </div>*/}
                    <input
                        id={cellId}
                        row={this.props.row}
                        column={this.props.column}
                        role={this.role}
                        className={autoComplete}
                        hidden={false}
                        type='text'
                        ref='textInput'
                        defaultValue={currentVal}
                        onBlur={this.onBlur.bind(this, this.state.role)}
                        onKeyPress={this.onKeyPress.bind(this, this.state.role)}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                    />

                </td>
            );
        };

        // plain column
        return(
            <td
                row={this.props.row}
                column={this.props.column}
                className={alignment}
                role={this.role}
                onClick={this.handleClick}>
                {currentVal}
            </td>
        );
    };
};


export default Cell;
