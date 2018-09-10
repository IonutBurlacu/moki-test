import React from 'react';
import Autosuggest from 'react-autosuggest';

export default class AutoSuggest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			suggestions: [],
			label: this.props.defaultLabel || '',
			value: this.props.defaultValue || ''
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
						inputValue
			  );
	};

	getSuggestionValue = suggestion => {
		return suggestion.label;
	};

	renderSuggestion = suggestion => {
		return <span data-value={suggestion.value}>{suggestion.label}</span>;
	};

	onChange = (event, { newValue, method }) => {
		let item = this.props.items.find(item => item.label === newValue);
		let id = 0;
		if (item) {
			id = item.value;
		}
		this.props.handleChange({
			name: this.props.name,
			id: id,
			value: newValue
		});

		this.setState({
			label: newValue,
			value: event.target.dataset.value
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

	render() {
		const inputProps = {
			placeholder: '',
			value: this.state.label,
			onChange: this.onChange
		};
		return (
			<Autosuggest
				suggestions={this.state.suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={inputProps}
			/>
		);
	}
}
