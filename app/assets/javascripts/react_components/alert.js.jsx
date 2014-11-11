/** @jsx React.DOM */

var Alert = React.createClass({
    getDefaultProps: function() {
        return {
            handleClose: undefined,
            delay: 2000
        };
    },
    getInitialState: function() {
        return {
            visible: true
        };
    },
    componentWillReceiveProps: function(nextProps) {
        // reset the timer if children are changed
        if (nextProps.children !== this.props.children) {
          this.setTimer();
          this.setState({visible: true});
        }
    },
    componentDidMount: function() {
        this.setTimer();
    },
    setTimer: function(){
        // clear any existing timer
        _.isNull(this._timer) ? null : clearTimeout(this._timer);

        // hide after `delay` milliseconds
        this._timer = setTimeout(function() {
            this.setState({visible: false});
            this._timer = null;
        }.bind(this), this.props.delay);
    },
    render: function() {
        var content = this.state.visible ? this.renderOpen() : this.renderClosed();
        return content;
    },
    renderOpen: function() {
        return (
            <div className="react-alert-box">
                {this.props.children}
                <a onClick={this.handleClose} className="close">&times;</a>
            </div>
        );
    },
    renderClosed: function() {
        return (
            <span />
        );
    },
    handleClose: function(event) {
        this._timer = null;
        this.setState({visible: false});
        this.props.handleClose();
    }
});
