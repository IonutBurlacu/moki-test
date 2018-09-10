import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import { getTeamsRequest, viewTeamRequest } from '../../actions/teams';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIcon from '../../images/challenges_icon.png';
import playersIconWide from '../../images/players_icon_wide.png';

export class TeamsPage extends React.Component {
  componentWillMount() {
    this.props.showLoader();
    this.props.getTeams();
  }

  handleView = id => {
    this.props.viewTeamRequest(id);
    this.props.showLoader();
    this.props.history.push(`/teams/view/${id}`);
  };

  render() {
    return (
      <div className="container container-with-title">
        <Header
          leftButton={<Link to="/bands/pair">Pair Bands</Link>}
          rightButton={<Link to="/teams/add">Add</Link>}
        />
        <PageTitle title="Teams" />
        <div className="table-wrapper">
          <table className="table">
            <tbody>
              {this.props.teams.map(team => (
                <tr onClick={() => this.handleView(team.id)} key={team.id}>
                  <td style={{ width: '11vmin' }}>
                    <img src={defaultAvatar} className="avatar" />
                  </td>
                  <td>
                    <h1 className="title">{team.name}</h1>
                    <span className="subtitle">
                      Last Sync:{' '}
                      {team.last_sync_at === null
                        ? 'Never'
                        : moment(team.last_sync_at).format(
                            'DD/MM/YYYY \\at HH.mma'
                          )}
                    </span>
                  </td>
                  <td>
                    {team.challenges.length > 0 ? (
                      <img src={challengesIcon} className="icon" />
                    ) : (
                      ''
                    )}
                    <span className="icon-label">
                      {team.challenges
                        .reduce((string, item) => `${string + item.name}, `, '')
                        .slice(0, -2)}
                    </span>
                  </td>
                  <td className="align-right">
                    <img src={playersIconWide} className="icon" />{' '}
                    <span className="icon-label">
                      {team.players_count} Player
                      {team.players_count != 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="negative align-right">
                    <span className="percentage-icon" />
                    <span className="percentage">18%</span>
                  </td>
                  <td className="align-right">
                    <h1 className="title">
                      {team.total_steps}
                      <small>steps</small>
                    </h1>
                  </td>
                </tr>
              ))}
              {this.props.teams.length === 0 ? (
                <tr className="no-items-row">
                  <td>
                    <span>There are no teams yet.</span>
                  </td>
                </tr>
              ) : (
                <tr />
              )}
            </tbody>
          </table>
        </div>
        <Loader />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.items
});

const mapDispatchToProps = dispatch => ({
  getTeams: () => dispatch(getTeamsRequest()),
  viewTeamRequest: id => dispatch(viewTeamRequest(id)),
  showLoader: () => dispatch(showLoader())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsPage);
