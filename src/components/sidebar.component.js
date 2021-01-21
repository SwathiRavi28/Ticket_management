import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Sidebar extends Component {
	render() {
		return(
			<nav class="col-md-2 d-none d-md-block bg-dark sidebar">
	  			
	    		<ul class="nav flex-column">
	    			<li className="nav-item">
	    				<NavLink to="/" onlyActiveOnIndex={true} className="nav-link" activeClassName="active">
	    					<i class="fas fa-home"></i>
	    					Dashboard Home
	    				</NavLink>
	    			</li>
	    			<li>
                		<NavLink to="/tickets/create" className="nav-link" activeClassName="active">
                			<i class="fas fa-ticket-alt"></i>
                			Submit a Ticket
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="/manage-users" className="nav-link" activeClassName="active">
                			<i class="fas fa-users"></i>
                			Manage Users
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="/manage-agents" className="nav-link" activeClassName="active">
                			<i class="fas fa-folder"></i>
                			Manage Agents
                		</NavLink>
            		</li>
	    		</ul>
			</nav>
		);
	}
}
