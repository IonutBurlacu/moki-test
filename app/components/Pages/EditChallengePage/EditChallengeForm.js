import React, {Component} from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../../Header';
import { updateChallengeRequest } from '../../../actions/challenges';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import defaultAvatar from '../../../images/default_avatar.png';

export class EditChallengeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      ...props.challenge
    };
  }

  updateChallenge = () => {
    if (this.state.name === '' || this.state.target_steps === '') {
      this.props.showAlert('All fields are required.');
    } else {
      this.props.showLoader();
      this.props.updateChallengeRequest(this.state, this.props.id);
    }
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Header
          leftButton={
            <Link to={`/challenges/view/${this.props.id}`}>Cancel</Link>
          }
          rightButton={<button onClick={this.updateChallenge}>Save</button>}
        />
        <div className="challenge-form">
          <form action="">
            <div className="left-side">
              <img src={defaultAvatar} className="avatar" />
              <label htmlFor="avatar" className="edit-photo-button" />
              <input type="file" className="edit-photo-input" id="avatar" />
            </div>
            <div className="right-side">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="name"
                  name="name"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="targetSteps" className="form-label">
                  Distance
                </label>
                <input
                  type="number"
                  className="form-input"
                  id="targetSteps"
                  name="target_steps"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                  value={this.state.target_steps}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  challenge: state.challenges.challenge
});

const mapDispatchToProps = dispatch => ({
  updateChallengeRequest: (challenge, id) =>
    dispatch(updateChallengeRequest(challenge, id)),
  showLoader: () => dispatch(showLoader()),
  showAlert: message => dispatch(showAlert(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditChallengeForm);
