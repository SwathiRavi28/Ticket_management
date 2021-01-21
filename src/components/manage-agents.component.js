import React, { Component } from 'react';
import axios from 'axios';

import Createagent from "./create-agent.component";

const Agent = props => (
   
    <tr>
        <td>{props.agent.name}</td>
        <td>
            <a href="#" onClick={() => { 
                 console.log("answer:",props);
                if(window.confirm('Are you sure you want to delete this agent?')) 
                    props.deleteagent(props.agent._id) 
            }} 
            className="badge badge-danger">Delete</a>
        </td>
    </tr>
);

export default class Manageagents extends Component {
	constructor(props) {
		super(props);

		this.deleteagent = this.deleteagent.bind(this);

		this.state = { agents: [] };
	}

    componentDidMount() {
        axios.get('http://localhost:5000/agents/')
            .then(res => {
                this.setState({ agents: res.data },()=> console.log("agents",this.state.agents))
               
            })
            .catch(error => console.log(error));
    }

    componentDidUpdate() {
        axios.get('http://localhost:5000/agents/')
            .then(res => {
                this.setState({ agents: res.data })
            })
            .catch(error => console.log(error));
    }

    deleteagent(id) {
	    axios.delete('http://localhost:5000/agents/'+id)
	        .then(res => { console.log(res.data)});

	    // update tickets array to all agents without matching id
	    this.setState({
	        agents: this.state.agents.filter(el => el._id !== id)
	    })
	}

    getagents() {
        return this.state.agents.map(currentagent => {
            return <Agent
            			agent={currentagent} 
            			deleteagent={this.deleteagent}
                        key={currentagent._id}
                    />;
        })
	}

	render() {
		return(
			<div>
				<table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.getagents() }
                    </tbody>
                </table>
                <br></br>
                <Createagent />
			</div>
		);
	}
}