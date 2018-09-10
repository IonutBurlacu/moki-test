import React, {Component} from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import Footer from '../Footer';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import Loader from '../Loader';
import {
  getChallengesRequest,
  viewChallengeRequest
} from '../../actions/challenges';
import { showLoader } from '../../actions/loader';
import defaultAvatar from '../../images/default_avatar.png';
import teamsIcon from '../../images/teams_icon.png';
import playersIconWide from '../../images/players_icon_wide.png';

export class ChallengesPage extends Component {
  componentWillMount() {
    this.props.showLoader();
    this.props.getChallengesRequest();
  }

  handleView = id => {
    this.props.viewChallengeRequest(id);
    this.props.showLoader();
    this.props.history.push(`/challenges/view/${id}`);
  };

  render() {
    return (
      <div className="container container-with-title">
        <Header
          leftButton={<Link to="/bands/pair">Pair Bands</Link>}
          rightButton={<Link to="/challenges/add">Add</Link>}
        />
        <PageTitle title="Challenges" />
        <div className="table-wrapper">
          <table className="table">
            <tbody>
              {this.props.challenges.map(challenge => (
                <tr
                  onClick={() => this.handleView(challenge.id)}
                  key={challenge.id}
                >
                  <td style={{ width: '11vmin' }}>
                    <img src={defaultAvatar} className="avatar" />
                  </td>
                  <td>
                    <h1 className="title">{challenge.name}</h1>
                    <span className="subtitle">
                      Last Sync:{' '}
                      {challenge.last_sync_at === null
                        ? 'Never'
                        : moment(challenge.last_sync_at).format(
                            'DD/MM/YYYY \\at HH.mma'
                          )}
                    </span>
                  </td>
                  <td className="align-right">
                    {challenge.type === 'player' ? (
                      <div>
                        <img src={playersIconWide} className="icon" />
                        <span className="icon-label">
                          {`${challenge.players_count} Player`}
                          {challenge.players_count > 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <img src={teamsIcon} className="icon" />
                        <span className="icon-label">
                          {`${challenge.teams_count} Team`}
                          {challenge.teams_count > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="negative align-right">
                    <span className="percentage-icon" />
                    <span className="percentage">18%</span>
                  </td>
                  <td className="align-right">
                    <h1 className="title">
                      {challenge.target_steps}
                      <small>steps</small>
                    </h1>
                  </td>
                </tr>
              ))}
              {this.props.challenges.length === 0 ? (
                <tr className="no-items-row">
                  <td>
                    <span>There are no challenges yet.</span>
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
  challenges: state.challenges.items
});

const mapDispatchToProps = dispatch => ({
  getChallengesRequest: () => dispatch(getChallengesRequest()),
  viewChallengeRequest: id => dispatch(viewChallengeRequest(id)),
  showLoader: () => dispatch(showLoader())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengesPage);
