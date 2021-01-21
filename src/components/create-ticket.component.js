import React, { Component } from 'react';
import axios from 'axios';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Resolved'];
const types = ['Bug/Error', 'Feature Request', 'Security', 'Other'];

export default class CreateTicket extends Component {
	constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeagentName = this.onChangeagentName.bind(this);
        this.onChangeAssignee = this.onChangeAssignee.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
      // set default values for state properties
      this.setState({
        priority: priorities[0],
        status: statuses[0],
        type: types[0]
      });

      // get list of users to set default assignee
      axios.get('http://localhost:5000/users/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.name),
                    assignee: res.data[0].name
                })
            }
        })
        .catch((error) => { console.log(error); })

        // get list of agents to set default agent
      axios.get('http://localhost:5000/agents/')
        .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    agents: res.data.map(agent => agent.name),
                    agentName: res.data[0].name
                })
            }
        })
        .catch((error) => { console.log(error); })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeagentName(e) {
        this.setState({
            agentName: e.target.value
        })
    }

    onChangeAssignee(e) {
        this.setState({
            assignee: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            agentName: this.state.agentName,
            assignee: this.state.assignee,
            priority: this.state.priority,
            status: this.state.status,
            type: this.state.type
        }

        axios.post('http://localhost:5000/tickets/create', ticket)
            .then(res => console.log(res.data))

        alert('Successfully created.');

        // clear form
        this.setState({ 
          title: '',
          description: '',
          priority: '',
          status: '',
          type: ''
        });
    }

	render() {
		return(
			<div>
				<h3>Submit a Ticket</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Title: </label>
            	<input type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
            	/>
					</div>
					<div className="form-group">
						<label>Description: </label>
            	<textarea style={{resize: 'none'}}
                  type="text"
                  maxLength="250"
                  rows="3"
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
            	></textarea>
					</div>
					<div className="form-group">
						<label>Agent Name: </label>
            	<select className="form-control"
                      value={this.state.agentName}
                      onChange={this.onChangeagentName}>
                      {
                          this.state.agents.map((agent) => {
                          return <option key={agent}
                                         value={agent}>{agent}
                                 </option>;
                          })
                      }
              </select>
					</div>
          <div className="form-group">
            <label>Assigned To: </label>
              <select className="form-control"
                      value={this.state.assignee}
                      onChange={this.onChangeAssignee}>
                      {
                        this.state.users.map((user) => {
                        return <option key={user}
                                       value={user}>{user}
                               </option>;
                        })
                      }
              </select>
          </div>
					<div className="form-group">
						<label>Priority: </label>
            	<select className="form-control"
                      value={this.state.priority}
                      onChange={this.onChangePriority}>
                      {
                          priorities.map((priority) => {
                          return <option key={priority}
                                         value={priority}>{priority}
                                 </option>;
                          })
                      }
              </select>
					</div>
					<div className="form-group">
						<label>Status: </label>
            	<select className="form-control"
                      value={this.state.status}
                      onChange={this.onChangeStatus}>
                      {
                          statuses.map((status) => {
                          return <option key={status}
                                         value={status}>{status}
                                 </option>;
                          })
                      }
              </select>
					</div>
					<div className="form-group">
						<label>Type: </label>
            	<select className="form-control"
                      value={this.state.type}
                      onChange={this.onChangeType}>
                      {
                          types.map((type) => {
                          return <option key={type}
                                         value={type}>{type}
                                 </option>;
                          })
                      }
              </select>
					</div>
					<div className="form-group">
              <input type="submit"
                   value="Submit Ticket"
                   className="btn btn-primary"
              />
          </div>
				</form>
			</div>
		);
	}
}