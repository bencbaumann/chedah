import React from 'react'
import API from '../../utils/API'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Multiselect } from '../Multiselect';

// add goal modal
class ModalAddGoal extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    userCategories: [],
    categories: [],
    name:'',
    budget:''
  }

  componentWillMount () {
    API.getUserCategories()
      .then(({data}) => {
        this.setState({userCategories: data})
      }).catch(err => {
      console.log('Error Categories')
      console.log(err)
    })
  }


  addGoalToGig () {
    const data = {}

    data.gigId = this.props.location.pathname.split('/')[2]
    data.name = this.state.name
    data.budget = this.state.budget
    data.categories = this.state.categories

    API.addGoalToGig(data).then(res => {
      this.setState({name: '', budget: ''})
      this.props.refresh()
    }).catch(err => {
      console.log("We were unable to add a goal to the gig, here's the returned error message from the server")
      console.log(err)
    })
  }

      // this bad larry is for the multiselect
      handleOnChange (value) {
        console.log('value: ', value)
        value ? this.setState({ multiValue: value }, ()=>{
          this.getCategories(this.state.multiValue)
        }) : null
    }

  handleChange = event=> {
      this.setState({[event.target.name]: event.target.value})
    }

  // this is for the multi select
  getCategories = categories => {
      this.setState({ categories: categories })
  }

  handleClick (val) {
    console.log(`selected: `, val)
  }

  render () {
    return (
      <div
        id='add-goal-modal'
        className='modal'
        // style={{height: '70%'}} 
        >
        <div className='modal-content'>
          <div className='modal-title'>
            <h4>Add a Goal</h4>
          </div>
          <div className='col input-field s12'>
            <input
              onChange={this.handleChange}
              type='text'
              name='name'
              id='input_1'
              value={this.state.name}
               />
            <label className='active' htmlFor='input_1'>
              Goal Name
            </label>
          </div>
          <div className='col input-field s12'>
            <input
              onChange={this.handleChange}
              type='number'
              name='budget'
              id='input_2'
              value={this.state.budget}
               />
            <label className='active' htmlFor='input_2'>
              Budget
            </label>
          </div>
          <div className='row'>
            <span>Select Expense Categories To Track:</span>
          </div>
          <div className='row'>
            <div className='col s12'>
            
              {/* <Multiselect categories= { this.state.userCategories } getCategories={ this.getCategories.bind(this) }/> */}

              <Select.Creatable
                multi={true}
                options={ this.state.userCategories.map(c => {
                              const newCat = {}
                              newCat.label = c.name
                              newCat.value = c._id
                              return newCat
                          }) || [] } // These are the options, the user can select from, these are supplied by us.
                onChange={this.handleOnChange.bind(this)}
                          value={this.state.multiValue} // This is the value we are trying update
              />
            </div>
            <div className='col s6'></div>
          </div>
          <div>
          {/* <div className='modal-footer'> */}
          <br/>
          <br/>
            <section className="right">
              <button className='btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text'>
                Cancel
              </button>
              &nbsp;
              <button onClick={ this.addGoalToGig.bind(this) } className='btn waves-effect waves-light modal-action modal-close teal'>
                Add A Goal
              </button>
            </section>
          <br/>
          <br/>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalAddGoal
