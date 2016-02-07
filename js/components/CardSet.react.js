var React = require('react');
var Card = require('./Card.react');
var AdBtnCard = require('./AdBtnCard.react');
var CardSearch = require('./CardSearch.react');
var assign = require('object-assign');

var CardSet = React.createClass({
	getInitialState: function() {
		return {
			filterValue: ''
		}
	},

	render: function() {
		var cards = this.props.cards;
		var cardComponents = [];
		for(key in cards) {
			var card = cards[key];
			if(this.state.filterValue == ''
					// TODO: fix case sesitive search
					|| card.text.indexOf(this.state.filterValue) !== -1
					|| card.title.indexOf(this.state.filterValue) !== -1) {
				cardComponents.push(
					<div className="col-xs-6 col-md-3">
						<Card
							id={card.id}
							text={card.text}
							title={card.title} 
							/>
						</div>
				);
			}
		}

		cardComponents.splice(0, 0,
			<div className="col-xs-6 col-md-3">
				<AdBtnCard handleClick={this._handleAdBtnCardClick}/>
			</div>
		);

		return (
				<div className="container">
				<h1>Recipe Book</h1>
				<CardSearch onSearchFilterChange={this._onSearchFilterChange}/>
					<div className="row">
							{cardComponents}
					</div>
				</div>
		);
	},

	_handleAdBtnCardClick: function() {
		this.props.handleStartNewRecipeNav();
	},

	_onSearchFilterChange: function(filterValue) {
		console.log('filtering cards..' + filterValue);
		this.setState(assign({}, this.state, {filterValue: filterValue}));
	}
});

module.exports = CardSet;