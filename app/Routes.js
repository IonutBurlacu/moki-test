/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import PublicRoute from './routers/PublicRoute';
import PrivateRoute from './routers/PrivateRoute';
import NotFoundPage from './components/Pages/NotFoundPage';
import LoginPage from './components/Pages/LoginPage';
import ForgotPasswordPage from './components/Pages/ForgotPasswordPage';
import PlayersPage from './components/Pages/PlayersPage';
import TeamsPage from './components/Pages/TeamsPage';
import ChallengesPage from './components/Pages/ChallengesPage';
import ReportsPage from './components/Pages/ReportsPage';
import PlayerAveragesPage from './components/Pages/PlayerAveragesPage';
import GroupAveragesPage from './components/Pages/GroupAveragesPage';
import TotalStepsPage from './components/Pages/TotalStepsPage';
import DownloadPdfPage from './components/Pages/DownloadPdfPage';
import DownloadCsvPage from './components/Pages/DownloadCsvPage';
import SettingsPage from './components/Pages/SettingsPage';
import PairBandsPage from './components/Pages/PairBandsPage';
import SyncBandsPage from './components/Pages/SyncBandsPage';
import ReadBatteryPage from './components/Pages/ReadBatteryPage';
import AddPlayerPage from './components/Pages/AddPlayerPage';
import AddTeamPage from './components/Pages/AddTeamPage';
import AddChallengePage from './components/Pages/AddChallengePage';
import EditChallengePage from './components/Pages/EditChallengePage';
import EditTeamPage from './components/Pages/EditTeamPage';
import EditPlayerPage from './components/Pages/EditPlayerPage';
import ChallengePage from './components/Pages/ChallengePage';
import PlayerPage from './components/Pages/PlayerPage';
import TeamPage from './components/Pages/TeamPage';
import NFCListener from './components/NFCListener';

export default () => (
    <App>
        <Switch>
            <Redirect from="/" exact to="/players" />
            <PrivateRoute path="/players" component={PlayersPage} exact />
            <PrivateRoute path="/players/add" component={AddPlayerPage} />
            <PrivateRoute path="/players/edit/:id" component={EditPlayerPage} />
            <PrivateRoute path="/players/view/:id" component={PlayerPage} />
            <PrivateRoute path="/bands/pair/:id?" component={PairBandsPage} />
            <PrivateRoute path="/bands/sync" component={SyncBandsPage} />
            <PrivateRoute path="/bands/read" component={ReadBatteryPage} />
            <PrivateRoute path="/teams" component={TeamsPage} exact />
            <PrivateRoute path="/teams/add" component={AddTeamPage} />
            <PrivateRoute path="/teams/edit/:id" component={EditTeamPage} />
            <PrivateRoute path="/teams/view/:id" component={TeamPage} />
            <PrivateRoute path="/challenges" component={ChallengesPage} exact />
            <PrivateRoute path="/challenges/add" component={AddChallengePage} />
            <PrivateRoute
                path="/challenges/edit/:id"
                component={EditChallengePage}
            />
            <PrivateRoute
                path="/challenges/view/:id"
                component={ChallengePage}
            />
            <PrivateRoute path="/reports" component={ReportsPage} exact />
            <PrivateRoute
                path="/reports/player_averages"
                component={PlayerAveragesPage}
            />
            <PrivateRoute
                path="/reports/group_averages"
                component={GroupAveragesPage}
            />
            <PrivateRoute
                path="/reports/total_steps"
                component={TotalStepsPage}
            />
            <PrivateRoute
                path="/reports/download_pdf"
                component={DownloadPdfPage}
            />
            <PrivateRoute path="/settings" component={SettingsPage} exact />
            <PrivateRoute
                path="/settings/download_csv"
                component={DownloadCsvPage}
            />
            <PublicRoute path="/login" component={LoginPage} exact />
            <PublicRoute
                path="/forgot_password"
                component={ForgotPasswordPage}
                exact
            />
            <Route component={NotFoundPage} />
        </Switch>
        <NFCListener />
    </App>
);
