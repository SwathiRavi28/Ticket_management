import React, { Component } from 'react';
import axios from 'axios';

export default class MarkButton extends React.Component {
	constructor(props) {
		super(props);

        this.handleClick = this.handleClick.bind(this);

		this.state = { 
            title: '',
            description: '',
            agentName: '',
            assignee: '',
            priority: '',
            status: '',
            type: '',
            users: [],
            agents: []
        };
	}

	componentDidMount() {
        // default state of ticket
        axios.get('http://localhost:5000/tickets/'+this.props._id)
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    agentName: res.data.agentName,
                    assignee: res.data.assignee,
                    priority: res.data.priority,
                    status: res.data.status,
                    type: res.data.type
                })
            })
            .catch((error) => { console.log(error); })

        // get list of users to select from
        axios.get('http://localhost:5000/users/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name)
                })
            }
        })
        .catch((error) => { console.log(error); })

        // get list of agents to select from
        axios.get('http://localhost:5000/agents/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    agents: res.data.map(agent => agent.name)
                })
            }
        })
        .catch((error) => { console.log(error); })
    }

    handleClick(e) {
        e.preventDefault();

        this.state.status !== 'Resolved' ?
        this.setState({status: 'Resolved'}) : 
        this.setState({status: 'Open'})

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            agentName: this.state.agentName,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type
        }

        axios.post('http://localhost:5000/tickets/update/' + this.props._id, ticket)
            .then(res => console.log(res.data));
            
        alert('Successfully updated.');
    }
	
	render() {
		return(
            <div></div>        
		);
	}
}