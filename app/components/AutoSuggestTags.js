import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

export default class AutoSuggestTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            tags: this.props.tags || [],
            label: this.props.defaultLabel || ''
        };
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0
            ? []
            : this.props.items.filter(
                  suggestion =>
                      suggestion.label.toLowerCase().slice(0, inputLength) ===
                          inputValue &&
                      !this.state.tags.find(
                          tag => tag.name === suggestion.label
                      )
              );
    };

    getSuggestionValue = suggestion => {
        this.setState(prevState => ({
            tags: [
                ...prevState.tags,
                { id: suggestion.value, name: suggestion.label }
            ],
            label: '',
            suggestions: []
        }));

        this.props.handleChange([
            ...this.state.tags,
            { id: suggestion.value, name: suggestion.label }
        ]);

        return '';
    };

    renderSuggestion = suggestion => (
        <span data-value={suggestion.value}>{suggestion.label}</span>
    );

    onChange = (event, { newValue }) => {
        this.setState({
            label: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onKeyPress = event => {
        if (event.key === 'Enter') {
            if (this.state.tags.find(tag => tag.name === this.state.label)) {
                // If the tag already exists in the list below, don't do anything.
                this.setState(() => ({
                    label: '',
                    suggestions: []
                }));
            } else if (
                this.props.items.find(tag => tag.label === this.state.label)
            ) {
                // If the tag is in the suggestions, insert it from there.
                this.setState(prevState => ({
                    tags: [
                        ...prevState.tags,
                        {
                            id: this.props.items.find(
                                tag => tag.label === prevState.label
                            ).value,
                            name: prevState.label
                        }
                    ],
                    label: '',
                    value: '',
                    suggestions: []
                }));
                this.props.handleChange([
                    ...this.state.tags,
                    {
                        id: this.props.items.find(
                            tag => tag.label === this.state.label
                        ).value,
                        name: this.state.label
                    }
                ]);
            } else {
                this.setState(prevState => ({
                    tags: [...prevState.tags, { name: prevState.label }],
                    label: '',
                    value: '',
                    suggestions: []
                }));
                this.props.handleChange([
                    ...this.state.tags,
                    { name: this.state.label }
                ]);
            }
        }
    };

    removeTag = tagIndex => {
        this.setState(prevState => ({
            tags: prevState.tags.filter((tag, index) => index !== tagIndex)
        }));
        this.props.handleChange(
            this.state.tags.filter((tag, index) => index !== tagIndex)
        );
    };

    render() {
        const inputProps = {
            placeholder: 'Enter a tag...',
            value: this.state.label,
            onChange: this.onChange,
            onKeyPress: event => this.onKeyPress(event)
        };
        return (
            <div>
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                    }
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
                {this.state.tags.length ? (
                    <ul className="tags-list">
                        {this.state.tags.map((item, index) => (
                            <li key={index} className="tag-item">
                                {item.name}
                                <button
                                    type="button"
                                    className="tag-remove"
                                    onClick={() => this.removeTag(index)}
                                >
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    ''
                )}
            </div>
        );
    }
}
