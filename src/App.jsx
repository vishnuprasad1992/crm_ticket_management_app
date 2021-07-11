import './App.css';
import Entry from './components/pages/entry/Entry.page';
// import DefaultLayout from './components/Layouts/DefaultLayout';
import Dashboard from './components/pages/entry/dashboard/Dashboard';
import AddTicket from './components/pages/addTicket/AddTicket';
import TicketLists from './components/pages/ticketlists/TicketLists';
import TicketDetails from './components/pages/ticketDetails/TicketDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import Registration from './components/pages/registration/Registration';
import PageNotFound from './components/pages/pageNotFound/PageNotFound';
import Verification from './components/pages/verificationPage/Verification';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Entry />
					</Route>
					<Route path="/registration">
						<Registration/>
					</Route>
					<PrivateRoute path="/dashboard">
						<Dashboard />
					</PrivateRoute>
					<PrivateRoute path="/add-tickets">
						<AddTicket />
					</PrivateRoute>
					<PrivateRoute path="/ticket-list">
						<TicketLists />
					</PrivateRoute>
					<PrivateRoute path="/ticket/:id">
						<TicketDetails />
					</PrivateRoute>
					<Route path="/verify_user/:id/:email">
						<Verification/>
					</Route>
					<Route component={PageNotFound} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
