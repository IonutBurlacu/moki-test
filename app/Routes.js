/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import NotFoundPage from './components/Pages/NotFoundPage';
import LoginPage from './components/Pages/LoginPage';
import PlayersPage from './components/Pages/PlayersPage';
import TeamsPage from './components/Pages/TeamsPage';
import ChallengesPage from './components/Pages/ChallengesPage';
import ReportsPage from './components/Pages/ReportsPage';
import SettingsPage from './components/Pages/SettingsPage';
import PairBandsPage from './components/Pages/PairBandsPage';
import AddPlayerPage from './components/Pages/AddPlayerPage';
import AddTeamPage from './components/Pages/AddTeamPage';
import AddChallengePage from './components/Pages/AddChallengePage';
import EditChallengePage from './components/Pages/EditChallengePage';
import EditTeamPage from './components/Pages/EditTeamPage';
import EditPlayerPage from './components/Pages/EditPlayerPage';
import ChallengePage from './components/Pages/ChallengePage';
import PlayerPage from './components/Pages/PlayerPage';
import TeamPage from './components/Pages/TeamPage';

export default () => (
  <App>
    <Switch>
      <Redirect from="/" exact to="/players" />
      <PrivateRoute path="/players" component={PlayersPage} exact />
      <PrivateRoute path="/players/add" component={AddPlayerPage} />
      <PrivateRoute path="/players/edit/:id" component={EditPlayerPage} />
      <PrivateRoute path="/players/view/:id" component={PlayerPage} />
      <PrivateRoute path="/bands/pair" component={PairBandsPage} />
      <PrivateRoute path="/teams" component={TeamsPage} exact />
      <PrivateRoute path="/teams/add" component={AddTeamPage} />
      <PrivateRoute path="/teams/edit/:id" component={EditTeamPage} />
      <PrivateRoute path="/teams/view/:id" component={TeamPage} />
      <PrivateRoute path="/challenges" component={ChallengesPage} exact />
      <PrivateRoute path="/challenges/add" component={AddChallengePage} />
      <PrivateRoute path="/challenges/edit/:id" component={EditChallengePage} />
      <PrivateRoute path="/challenges/view/:id" component={ChallengePage} />
      <PrivateRoute path="/reports" component={ReportsPage} />
      <PrivateRoute path="/settings" component={SettingsPage} />
      <PublicRoute path="/login" component={LoginPage} exact />
      <Route component={NotFoundPage} />
    </Switch>
  </App>
);
