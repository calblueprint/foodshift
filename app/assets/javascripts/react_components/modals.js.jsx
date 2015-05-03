/** @jsx React.DOM */

var BootstrapModalMixin = function() {
    var handlerProps = ['handleShow', 'handleShown', 'handleHide', 'handleHidden'];

    var bsModalEvents = {
        handleShow: 'show.bs.modal',
        handleShown: 'shown.bs.modal',
        handleHide: 'hide.bs.modal',
        handleHidden: 'hidden.bs.modal',
    };

    return {
        propTypes: {
            handleShow: React.PropTypes.func,
            handleShown: React.PropTypes.func,
            handleHide: React.PropTypes.func,
            handleHidden: React.PropTypes.func,
            backdrop: React.PropTypes.bool,
            keyboard: React.PropTypes.bool,
            show: React.PropTypes.bool,
            remote: React.PropTypes.string,
        },

        getDefaultProps: function() {
            return {
                backdrop: true,
                keyboard: true,
                show: true,
                remote: ''
            }
        },

        componentDidMount: function() {
            var $modal = $(this.getDOMNode()).modal({
                backdrop: this.props.backdrop,
                keyboard: this.props.keyboard,
                show: this.props.show,
                remote: this.props.remote,
            })
            _.map(handlerProps, function(prop){
                if (this[prop]) {
                    $modal.on(bsModalEvents[prop], this[prop]);
                }
                if (this.props[prop]) {
                    $modal.on(bsModalEvents[prop], this.props[prop]);
                }
            }.bind(this));
        },

        componentWillUnmount: function() {
            var $modal = $(this.getDOMNode());
            _.map(handlerProps, function(prop){
                if (this[prop]) {
                    $modal.off(bsModalEvents[prop], this[prop]);
                }
                if (this.props[prop]) {
                    $modal.off(bsModalEvents[prop], this.props[prop]);
                }
            }.bind(this));
        },

        hide: function() {
            $(this.getDOMNode()).modal('hide');
        },

        show: function() {
            $(this.getDOMNode()).modal('show');
        },

        toggle: function() {
            $(this.getDOMNode()).modal('toggle');
        },

        renderCloseButton: function() {
            return (
                <div className="modal-close-button"><a onClick={this.hide}>&#215;</a></div>
            );
        }
    }
}();

var Modal = React.createClass({
    mixins: [BootstrapModalMixin],
    render: function() {
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {this.renderCloseButton()}
                            <div className="modal-header-text">{this.props.header} &nbsp;</div>
                        </div>
                        <div className="modal-body">
                            {this.props.children} &nbsp;
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var ExampleApp = React.createClass({
    getInitialState: function() {
        return {
            logs: []
        }
    },
    render: function() {
        var logs = this.state.logs.map(function(log) {
            return <div className={'alert alert-' + log.type}>
                [<strong>{log.time}</strong>] {log.message}
            </div>
        });
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Demo</h3>
                </div>
                <div className="panel-body">
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleShowModal}>Show Modal</button>
                    <h3>Logs</h3>
                    {logs}
                </div>
                <Modal ref="modal"
                    show={false}
                    header="Example Modal"
                    handleShow={this.handleLog.bind(this, 'Modal about to show', 'info')}
                    handleShown={this.handleLog.bind(this, 'Modal showing', 'success')}
                    handleHide={this.handleLog.bind(this, 'Modal about to hide', 'warning')}
                    handleHidden={this.handleLog.bind(this, 'Modal hidden', 'danger')}
                >
                    <p>I'm the content.</p>
                    <p>That's about it, really.</p>
                </Modal>
            </div>
        );
    },
    handleShowModal: function() {
        this.refs.modal.show()
    },
    handleExternalHide: function() {
        this.refs.modal.hide()
    },
    handleDoingNothing: function() {
        this.handleLog("Remember I said I'd do nothing? ...I lied!", 'danger')
    },
    handleLog: function(message, type) {
        this.setState({
            logs: [{
                type: type,
                time: new Date().toLocaleTimeString(),
                message: message
            }].concat(this.state.logs.slice(0, 3))
        })
    }
});
