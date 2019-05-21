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
        this.props.getPlayersRequest('today');
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
                                                            {`${
                                                                player.first_name
                                                            } ${
                                                                player.last_name
                                                            }`}
                                                        </h1>
                                                        {this.props
                                                            .selectedPlayerId ===
                                                        player.id ? (
                                                            <span className="subtitle cyan">
                                                                Tap Band on
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
                                                    <td>
                                                        {player.challenges
                                                            .length > 0 ? (
                                                            <img
                                                                src={
                                                                    challengesIconWide
                                                                }
                                                                className="icon"
                                                                alt="icon"
                                                            />
                                                        ) : (
                                                            ''
                                                        )}
                                                        <span className="icon-label">
                                                            {player.challenges
                                                                .reduce(
                                                                    (
                                                                        string,
                                                                        item
                                                                    ) =>
                                                                        `${string +
                                                                            item.name}, `,
                                                                    ''
                                                                )
                                                                .slice(0, -2)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {player.teams.length >
                                                        0 ? (
                                                            <img
                                                                src={
                                                                    teamsIconWide
                                                                }
                                                                className="icon"
                                                                alt="icon"
                                                            />
                                                        ) : (
                                                            ''
                                                        )}

                                                        <span className="icon-label">
                                                            {player.teams
                                                                .reduce(
                                                                    (
                                                                        string,
                                                                        item
                                                                    ) =>
                                                                        `${string +
                                                                            item.name}, `,
                                                                    ''
                                                                )
                                                                .slice(0, -2)}
                                                        </span>
                                                    </td>
                                                    {player.previous_steps -
                                                        player.current_steps !==
                                                    0 ? (
                                                        <td
                                                            className={
                                                                player.previous_steps >
                                                                player.current_steps
                                                                    ? 'negative align-right'
                                                                    : 'positive align-right'
                                                            }
                                                        >
                                                            <span className="percentage-icon" />
                                                            <span className="percentage">
                                                                {player.current_steps >
                                                                player.previous_steps
                                                                    ? player.previous_steps >
                                                                      0
                                                                        ? Math.round(
                                                                              (player.current_steps *
                                                                                  100) /
                                                                                  player.previous_steps -
                                                                                  100
                                                                          )
                                                                        : player.current_steps
                                                                    : player.current_steps >
                                                                      0
                                                                    ? Math.round(
                                                                          ((player.previous_steps -
                                                                              player.current_steps) *
                                                                              100) /
                                                                              player.previous_steps
                                                                      )
                                                                    : 100}
                                                                %
                                                            </span>
                                                        </td>
                                                    ) : (
                                                        <td className="positive align-right">
                                                            <span className="percentage-icon" />
                                                            <span className="percentage">
                                                                0%
                                                            </span>
                                                        </td>
                                                    )}
                                                    <td className="align-right">
                                                        <h1 className="title">
                                                            {player.current_steps.toLocaleString()}
                                                            <small>steps</small>
                                                        </h1>
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
        filterByValues: [],
        sortBy: 'name_asc'
    }),
    loading: state.players.loading,
    selectedPlayerId: state.bands.selectedPlayerId
});

const mapDispatchToProps = dispatch => ({
    pairModeOn: () => dispatch(pairModeOn()),
    pairModeOff: () => dispatch(pairModeOff()),
    getPlayersRequest: dateByType => dispatch(getPlayersRequest(dateByType)),
    playerSelected: id => dispatch(playerSelected(id)),
    showLoader: () => dispatch(showLoader())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PairBandsPage);
