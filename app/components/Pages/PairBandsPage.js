import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import moment from 'moment';
import { pairModeOn, pairModeOff, playerSelected } from '../../actions/bands';
import Footer from '../Footer';
import { getPlayersRequest } from '../../actions/players';
import { showLoader } from '../../actions/loader';
import { Header } from '../Header';
import { PageTitle } from '../PageTitle';
import getFilteredPlayers from '../../selectors/players';
import defaultAvatar from '../../images/default_avatar.png';
import challengesIconWide from '../../images/challenges_icon_wide.png';
import teamsIconWide from '../../images/teams_icon_wide.png';
import TopFilters from './PairBandsPage/TopFilters';
import duration from '../../utils/duration';
import gradeIcon from '../../utils/gradeIcon';

const s3URL = 'https://s3-eu-west-1.amazonaws.com/moki-avatars/';

export class PairBandsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: null
        };
    }

    componentWillMount() {
        this.props.pairModeOn();
        this.props.showLoader();
        this.props.getPlayersRequest(
            this.props.dateByType,
            this.props.dateByStartDate,
            this.props.dateByEndDate
        );
        this.state.playerId = this.props.match.params.id
            ? parseInt(this.props.match.params.id, 10)
            : null;
    }

    componentWillUnmount() {
        this.props.pairModeOff();
    }

    markAsSelected = id => {
        this.props.playerSelected(id);
    };

    render() {
        const { loading, players } = this.props;
        return (
            <div className="container">
                <Header
                    leftButton={<div />}
                    rightButton={<Link to="/players">Done</Link>}
                />
                <PageTitle title="Pair Bands" isGreen />
                <TopFilters />
                {!loading ? (
                    <div className="content">
                        <div className="table-wrapper">
                            <table className="table">
                                <tbody>
                                    {players
                                        .filter(
                                            player =>
                                                this.state.playerId === null ||
                                                player.id ===
                                                    this.state.playerId
                                        )
                                        .map(player => {
                                            const imageSource = player.avatar
                                                ? `${s3URL}${player.avatar}`
                                                : defaultAvatar;
                                            return (
                                                <tr
                                                    onClick={() =>
                                                        this.markAsSelected(
                                                            player.id
                                                        )
                                                    }
                                                    key={player.id}
                                                    className={
                                                        this.props
                                                            .selectedPlayerId ===
                                                        player.id
                                                            ? 'selected'
                                                            : ''
                                                    }
                                                >
                                                    <td>
                                                        <div
                                                            className="avatar"
                                                            style={{
                                                                backgroundImage: `url('${imageSource}')`
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <h1 className="title">
                                                            {`${player.first_name} ${player.last_name}`}
                                                        </h1>
                                                        {this.props
                                                            .selectedPlayerId ===
                                                        player.id ? (
                                                            <span className="subtitle cyan">
                                                                Hold Band on
                                                                Reader to Pair
                                                            </span>
                                                        ) : player.band ===
                                                          null ? (
                                                            player.current_steps ===
                                                                0 &&
                                                            player.previous_steps ===
                                                                0 ? (
                                                                <span className="subtitle grey">
                                                                    Last Paired:
                                                                    Never
                                                                </span>
                                                            ) : (
                                                                <span className="subtitle grey">
                                                                    Last Paired:
                                                                    Not
                                                                    Currently
                                                                    Paired
                                                                </span>
                                                            )
                                                        ) : moment()
                                                              .utc()
                                                              .local()
                                                              .diff(
                                                                  moment
                                                                      .utc(
                                                                          player
                                                                              .band
                                                                              .last_pair_at
                                                                      )
                                                                      .local(),
                                                                  'minutes'
                                                              ) > 10 ? (
                                                            <span className="subtitle red">
                                                                Last Paired:{' '}
                                                                {moment
                                                                    .utc(
                                                                        player
                                                                            .band
                                                                            .last_pair_at
                                                                    )
                                                                    .local()
                                                                    .format(
                                                                        'DD/MM/YYYY \\at HH.mma'
                                                                    )}
                                                            </span>
                                                        ) : (
                                                            <span className="subtitle green">
                                                                Last Paired:
                                                                Just Now
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="">
                                                        <h1 className="title">
                                                            <small>
                                                                Player Daily
                                                                Average
                                                            </small>
                                                        </h1>
                                                    </td>
                                                    <td className="align-right">
                                                        <h1 className="title">
                                                            {duration(
                                                                player.mvpa_minutes_current
                                                            )}
                                                            <small>MVPA</small>
                                                        </h1>
                                                    </td>
                                                    <td className="align-right">
                                                        <h1 className="title">
                                                            {player.daily_steps_current.toLocaleString()}
                                                            <small>steps</small>
                                                        </h1>
                                                    </td>
                                                    <td
                                                        className={
                                                            player.grade_score_current <
                                                            player.grade_score_previous
                                                                ? 'negative align-right'
                                                                : 'positive align-right'
                                                        }
                                                    >
                                                        <span className="percentage-icon" />
                                                        <span className="percentage">
                                                            {player.percentage !==
                                                            -1
                                                                ? `${Math.abs(
                                                                      player.percentage
                                                                  )}%`
                                                                : 'NA'}
                                                        </span>
                                                    </td>
                                                    <td className="align-right">
                                                        <img
                                                            src={gradeIcon(
                                                                player.grade_current
                                                            )}
                                                            className="grade"
                                                            alt="grade"
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    {players.length === 0 ? (
                                        <tr className="no-items-row">
                                            <td>
                                                <span>
                                                    There are no players yet.
                                                </span>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr />
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="content" />
                )}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    players: getFilteredPlayers(state.players.items, {
        filterByValues: state.players.listFilterValues,
        sortBy: state.players.listSort
    }),
    loading: state.players.loading,
    dateByType: state.players.dateByType,
    dateByStartDate: state.players.dateByStartDate,
    dateByEndDate: state.players.dateByEndDate,
    selectedPlayerId: state.bands.selectedPlayerId
});

const mapDispatchToProps = dispatch => ({
    getPlayersRequest: (dateByType, dateByStartDate, dateByEndDate) =>
        dispatch(getPlayersRequest(dateByType, dateByStartDate, dateByEndDate)),
    pairModeOn: () => dispatch(pairModeOn()),
    pairModeOff: () => dispatch(pairModeOff()),
    playerSelected: id => dispatch(playerSelected(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(PairBandsPage);
