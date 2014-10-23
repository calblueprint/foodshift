/** @jsx React.DOM */

var SelectBox = React.createClass({
    getDefaultProps: function() {
        return {
            choices: [{name: "------------------", value: ''}],
            onSelect: undefined,
            value: ''
        };
    },
    handleChange: function(event) {
        this.props.onSelect({value: event.target.value});
    },
    render: function() {
        var choices = _.map(this.props.choices, function (choice) {
            return (
                <option value={choice.value}>{choice.name}</option>
            );
        });
        return (
            <select value={this.props.value} onChange={this.handleChange}>
                {choices}
            </select>
        );
    }
});

var InputField = React.createClass({
    getDefaultProps: function() {
        return {
            error: null,
            label: "",
            handleChange: undefined
        }
    },
    render: function() {
        var hasError = !(_.isNull(this.props.error))
        classes = React.addons.classSet({
           'error': hasError
        });
        var errorElement = hasError ? <InputFieldError errorText={this.props.error}/> : null ;
        return (
            <div>
                <label>{this.props.label}
                    <input type="text" className={classes} value={this.props.value} onChange={this.props.handleChange} />
                </label>
                {errorElement}
            </div>
        );
    }
});

var DateField = React.createClass({
    getDefaultProps: function() {
        return {
            error: null,
            minDate: null,
            value: null,
            handleChange: undefined
        }
    },
    render: function() {
        var hasError = !(_.isNull(this.props.error))
        classes = React.addons.classSet({
           'error': hasError
        });
        var errorElement = hasError ? <InputFieldError errorText={this.props.error}/> : "";
        return (
            <div>
                <label>{this.props.label}
                    <input type="date" className={classes} value={this.props.value} min={this.props.minDate} onChange={this.props.handleChange} />
                </label>
                {errorElement}
            </div>
        );
    }
});

var TimeField = React.createClass({
    getDefaultProps: function() {
        return {
            error: null,
            handleChange: undefined
        }
    },
    render: function() {
        var hasError = !(_.isNull(this.props.error))
        classes = React.addons.classSet({
           'error': hasError
        });
        var errorElement = hasError ? <InputFieldError errorText={this.props.error}/> : "";
        return (
            <div>
                <label>{this.props.label}
                    <input type="time" className={classes} value={this.props.value} onChange={this.props.handleChange} />
                </label>
                {errorElement}
            </div>
        );
    }
});

var NumberField = React.createClass({
    getDefaultProps: function() {
        return {
            error: null,
            handleChange: undefined,
            max: null,
            min: null,
            step: null,
            value: 0
        }
    },
    render: function() {
        var hasError = !(_.isNull(this.props.error))
        classes = React.addons.classSet({
           'error': hasError
        });
        var errorElement = hasError ? <InputFieldError errorText={this.props.error}/> : "";
        return (
            <div>
                <label>{this.props.label}
                    <input type="number" min={this.props.min} max={this.props.max} step={this.props.step}
                        className={classes} value={this.props.value} onChange={this.props.handleChange} />
                </label>
                {errorElement}
            </div>
        );
    }
});

var TextField = React.createClass({
    getDefaultProps: function() {
        return {
            error: null,
            label: "",
            handleChange: undefined,
            rows: 5
        }
    },
    render: function() {
        var hasError = !(_.isNull(this.props.error))
        classes = React.addons.classSet({
           'error': hasError
        });
        var errorElement = hasError ? <InputFieldError errorText={this.props.error}/> : null ;
        return (
            <div>
                <label>{this.props.label}
                    <textarea className={classes} rows={this.props.rows} value={this.props.value} onChange={this.props.handleChange} />
                </label>
                {errorElement}
            </div>
        );
    }
});

var InputFieldError = React.createClass({
    getDefaultProps: function() {
        return {
            errorText: "Error."
        }
    },
    render: function() {
        return (
            <small className="error">{this.props.errorText}</small>
        );
    }
});
