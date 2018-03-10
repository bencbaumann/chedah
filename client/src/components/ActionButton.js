import React, { Component } from 'react';

// actions for the current page
const actions = {
    dashboard: [
        {
            title: 'Add Gig',
            icon: 'account_circle',
            id: 'action-add-gig',
            color: 'teal lighten-1',
            modal: 'add-gig-modal'
        },
        {
            title: 'Add Goal',   // TODO: needs gig menu
            icon: 'work',
            id: 'action-add-goal',
            color: 'teal darken-3',
            modal: 'add-goal-modal'
        },
        {
            title: 'Add Category',
            icon: 'insert_comment',
            id: 'action-add-category',
            color: 'teal darken-4',
            modal: 'add-category-modal'
        }
    ],
    accounts: [
        {
            title: 'Edit Account',
            icon: 'account_balance',
            id: 'action-edit-account',
            color: 'teal lighten-1',
            modal: 'edit-account-modal'
        }, {
            title: 'Add Gig',
            icon: 'account_circle',
            id: 'action-add-gig',
            color: 'teal darken-3',
            modal: 'add-gig-modal'
        },
        {
            title: 'Add Category',
            icon: 'insert_comment',
            id: 'action-add-category',
            color: 'teal darken-4',
            modal: 'add-category-modal'
        }
    ],
    gigs: [
        {
            title: 'Add Goal',
            icon: 'work',
            id: 'action-add-goal',
            color: 'teal lighten-1',
            modal: 'add-goal-modal'
        }, {
            title: 'Edit Gig',
            icon: 'account_circle',
            id: 'action-edit-gig',
            color: 'teal darken-3',
            modal: 'edit-gig-modal'
        },
        {
            title: 'Add Category',
            icon: 'insert_comment',
            id: 'action-add-category',
            color: 'teal darken-4',
            modal: 'add-category-modal'
        }
    ]
}


// materialize floating action button
class ActionButton extends Component {

    constructor(props) {
        super(props);

        let pathname = this.props.location.pathname || '/';
        let paths = pathname.split('/').filter(item => { return (item !== '')})

        this.state = {
            path: (paths.length) ? paths[0] : 'home',
            commands: actions
        };

        this.handleClick.bind(this)
    };

    // return commands for the current page
    getCommands() {
        return this.state.commands[this.state.path] || []
    }

    handleClick(cmd) {
        console.log(`-> action clicked: `, cmd.target.id);
    }

    render() {
        const currentCommands = this.getCommands()
        if (!currentCommands.length) {
            return (
                <div className="fixed-action-btn" style={{bottom: '24px', right: '24px'}}>
                    <a className="btn-floating btn-large dashboard-action-btn disabled">
                        <i className="large material-icons">add</i>
                    </a>
                </div>
            )
        }

        const listItems = currentCommands.map((command, i) =>
            <li key={i}>
                <a data-target={command.modal} onClick={this.handleClick} id={command.id} className={"btn-floating modal-trigger " + command.color}>
                    <i id={command.id} className="material-icons">{command.icon}</i>
                </a>
                <a data-target={command.modal} onClick={this.handleClick} id={command.id} className="btn-floating modal-trigger mobile-fab-tip">{command.title}</a>
            </li>)

        return (
            <div className="fixed-action-btn" style={{bottom: '24px', right: '24px'}}>
                <a className="btn-floating btn-large dashboard-action-btn">
                    <i className="large material-icons">add</i>
                </a>
                <ul className="main-actions">
                    {listItems}
                </ul>
            </div>
        )
    };
};


export default ActionButton;
