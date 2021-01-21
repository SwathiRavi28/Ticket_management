import React, { Component } from 'react';
import axios from 'axios';

export default class Createagent extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            agents: [],
            name: ''
        }
    }

    componentDidMount() {
        // get list of agents to set default agent
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const agent = {
            name: this.state.name
        }

        console.log(agent);

        axios.post('http://localhost:5000/agents/create', agent)
            .then(res => console.log(res.data));

        // clear form
        this.setState({ name: ''});
    }

    render() {
        return (
            <div>
                <h3>Create New agent</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                               value="Create agent"
                               className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
