import React, {Component} from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import { Header } from '../../Header';
import { updateTeamRequest } from '../../../actions/teams';
import { showLoader } from '../../../actions/loader';
import { showAlert } from '../../../actions/alert';
import defaultAvatar from '../../../images/default_avatar.png';

export class EditTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      ...this.props.team
    };
  }

  updateTeam = () => {
    if (this.state.name === '') {
      this.props.showAlert('All fields are required.');
    } else {
      this.props.showLoader();
      this.props.updateTeamRequest(this.state, this.props.id);
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
          leftButton={<Link to={`/teams/view/${this.props.id}`}>Cancel</Link>}
          rightButton={<button onClick={this.updateTeam}>Save</button>}
        />
        <div className="team-form">
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  team: state.teams.team
});

const mapDispatchToProps = dispatch => ({
  updateTeamRequest: (team, id) => dispatch(updateTeamRequest(team, id)),
  showLoader: () => dispatch(showLoader()),
  showAlert: message => dispatch(showAlert(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTeamForm);
