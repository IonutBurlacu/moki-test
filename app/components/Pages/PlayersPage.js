import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import { getPlayersRequest, viewPlayerRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIcon from '../../images/challenges_icon.png';
import teamsIcon from '../../images/teams_icon.png';

export class PlayersPage extends React.Component {
  componentWillMount() {
    this.props.showLoader();
    this.props.getPlayersRequest();
  }

  handleView = id => {
    this.props.viewPlayerRequest(id);
    this.props.showLoader();
    this.props.history.push(`/players/view/${id}`);
  };

  render() {
    return (
      <div className="container container-with-title">
        <Header
          leftButton={<Link to="/bands/pair">Pair Bands</Link>}
          rightButton={<Link to="/players/add">Add</Link>}
        />
        <PageTitle title="Players" />
        {!this.props.loading ? (
          <div className="table-wrapper">
            <table className="table">
              <tbody>
                {this.props.players.map(player => (
                  <tr
                    onClick={() => this.handleView(player.id)}
                    key={player.id}
                  >
                    <td style={{ width: '11vmin' }}>
                      <img src={defaultAvatar} className="avatar" />
                    </td>
                    <td>
                      <h1 className="title">
                        {`${player.first_name} ${player.last_name}`}
                      </h1>
                      <span className="subtitle">
                        Last Sync:{' '}
                        {player.last_sync_at === null
                          ? 'Never'
                          : moment(player.last_sync_at).format(
                              'DD/MM/YYYY \\at HH.mma'
                            )}
                      </span>
                    </td>
                    <td>
                      {player.challenges.length > 0 ? (
                        <img src={challengesIcon} className="icon" />
                      ) : (
                        ''
                      )}
                      <span className="icon-label">
                        {player.challenges
                          .reduce(
                            (string, item) => `${string + item.name}, `,
                            ''
                          )
                          .slice(0, -2)}
                      </span>
                    </td>
                    <td className="align-right">
                      {player.teams.length > 0 ? (
                        <img src={teamsIcon} className="icon" />
                      ) : (
                        ''
                      )}

                      <span className="icon-label">
                        {player.teams
                          .reduce(
                            (string, item) => `${string + item.name}, `,
                            ''
                          )
                          .slice(0, -2)}
                      </span>
                    </td>
                    <td className="negative align-right">
                      <span className="percentage-icon" />
                      <span className="percentage">18%</span>
                    </td>
                    <td className="align-right">
                      <h1 className="title">
                        {player.total_steps}
                        <small>steps</small>
                      </h1>
                    </td>
                  </tr>
                ))}
                {this.props.players.length === 0 ? (
                  <tr className="no-items-row">
                    <td>
                      <span>There are no players yet.</span>
                    </td>
                  </tr>
                ) : (
                  <tr />
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div />
        )}
        <Loader />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players.items,
  loading: state.players.loading
});

const mapDispatchToProps = dispatch => ({
  getPlayersRequest: () => dispatch(getPlayersRequest()),
  viewPlayerRequest: id => dispatch(viewPlayerRequest(id)),
  showLoader: () => dispatch(showLoader())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersPage);
