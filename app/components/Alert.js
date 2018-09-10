import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { hideAlert } from '../actions/alert';

export class Alert extends React.Component {
	render() {
		return this.props.show ? (
			<Modal
				isOpen={this.props.show}
				className="modal modal-alert"
				overlayClassName="overlay"
				ariaHideApp={false}
			>
				<div className="modal-wrapper">
					<div className="modal-header">
						<span>Alert</span>
					</div>
					<div className="modal-body">
						<p className="message">{this.props.message}</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={this.props.hideAlert}
							className="cancel-button"
						>
							Ok
						</button>
					</div>
				</div>
			</Modal>
		) : (
			<div />
		);
	}
}

const mapStateToProps = state => ({
	show: state.alert.show,
	message: state.alert.message
});

const mapDispatchToProps = dispatch => ({
	hideAlert: () => dispatch(hideAlert())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Alert);
