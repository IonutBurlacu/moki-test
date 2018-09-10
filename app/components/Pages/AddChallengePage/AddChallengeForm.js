import React, {Component} from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../../Header';
import { insertChallengeRequest } from '../../../actions/challenges';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import defaultAvatar from '../../../images/default_avatar.png';

export class AddChallengeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      name: '',
      type: 'player',
      target_steps: ''
    };
  }

  insertChallenge = () => {
    if (this.state.name === '' || this.state.target_steps === '') {
      this.props.showAlert('All fields are required.');
    } else {
      this.props.showLoader();
      this.props.insertChallengeRequest(this.state);
    }
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const options = [
      { value: 'player', label: 'Player' },
      { value: 'team', label: 'Team' }
    ];
    return (
      <div>
        <Header
          leftButton={<Link to="/challenges">Cancel</Link>}
          rightButton={<button onClick={this.insertChallenge}>Create</button>}
        />
        <div className="challenge-form">
          <form action="">
            <div className="left-side">
              <img src={defaultAvatar} className="avatar" />
              <label htmlFor="avatar" className="edit-photo-button">
                Edit Photo
              </label>
              <input type="file" className="edit-photo-input" id="avatar" />
            </div>
            <div className="right-side">
              <div className="form-group">
                <label htmlFor="name" className="form-label required">
                  Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="name"
                  name="name"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Type" className="form-label">
                  Type
                </label>
                <Select
                  defaultValue={options[0]}
                  isClearable={false}
                  isSearchable={false}
                  options={options}
                  className="form-input-select"
                  classNamePrefix="form-select"
                  onChange={val => {
                    this.handleInputChange({
                      target: {
                        name: 'type',
                        value: val.value
                      }
                    });
                  }}
                  name="type"
                />
              </div>
              <div className="form-group">
                <label htmlFor="targetSteps" className="form-label required">
                  Distance
                </label>
                <input
                  type="number"
                  className="form-input"
                  id="targetSteps"
                  name="target_steps"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  insertChallengeRequest: challenge =>
    dispatch(insertChallengeRequest(challenge)),
  showLoader: () => dispatch(showLoader()),
  showAlert: message => dispatch(showAlert(message))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddChallengeForm);
