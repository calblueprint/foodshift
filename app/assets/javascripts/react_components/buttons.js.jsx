/** @jsx React.DOM */

var ToggleButton = React.createClass({
    getDefaultProps: function() {
        return {is_active: false};
    },
    handleClick: function(event) {
        this.props.onButtonClick({value: this.props.name});
    },
    render: function() {
        classes = React.addons.classSet({
            'button-pressed': this.props.is_active
        });
        return (
            <button className={classes} onClick={this.handleClick}>{this.props.name}</button>
        );
    }
});

var ButtonGroupMultiSelect = React.createClass({
    getDefaultProps: function() {
        return {
            onButtonClick: undefined,
            names: ['Button'],
            values: []
        };
    },
    render: function() {
        var buttons = _.map(this.props.names, function (name) {
            return (
                <li><ToggleButton
                    name={name}
                    is_active={_.contains(this.props.values, name)}
                    onButtonClick={this.props.onButtonClick} /></li>
            );
        }.bind(this));
        return (
            <ul className="stack-for-small button-group">
                {buttons}
            </ul>
        );
    }
});

var ButtonGroupSingleSelect = React.createClass({
    getDefaultProps: function() {
        return {
            onButtonClick: undefined,
            choices: ['Button'],
            value: ''
        };
    },
    render: function() {
        var buttons = _.map(this.props.choices, function (name) {
            return (
                <li><ToggleButton
                    name={name}
                    isActive={this.props.value === name}
                    onButtonClick={this.props.onButtonClick} /></li>
            );
        }.bind(this));
        return (
            <ul className="stack-for-small button-group">
                {buttons}
            </ul>
        );
    }
});

var ToggleButtonAnchor = React.createClass({
    getDefaultProps: function() {
        return {isActive: false};
    },
    handleClick: function(event) {
        this.props.onButtonClick({value: this.props.name});
    },
    render: function() {
        return (
            <a className={this.props.className} onClick={this.handleClick}><span>{this.props.name}</span></a>
        );
    }
});

var ToggleButtonAnchorIcon = React.createClass({
    getDefaultProps: function() {
        return {
            isActive: false,
            classes: {
                'transparent-button': true,
            },
            iconClass: null
        };
    },
    handleClick: function(event) {
        this.props.onButtonClick({value: this.props.name});
    },
    render: function() {
        classes = React.addons.classSet(
            _.extend({
                'button-pressed': this.props.isActive
            }, this.props.classes)
        );
        return (
            <a className={classes} onClick={this.handleClick}><i className={this.props.iconClass}></i><span>{this.props.name}</span></a>
        );
    }
});

