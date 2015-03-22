/** @jsx React.DOM */

var DonationModal = React.createClass({
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

                    <a className="confirm-button" onClick={this.handleSubmit2}>Confirm</a>
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
    handleSubmit: function() {
        var data = $("#donor-form-fields").serialize();
        $.ajax({
            url: window.location.href,
            dataType: 'json',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            },
            data: data,
            success: function(data) {
                console.log("Submission success!");
                window.location.href = "/";
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
        this.refs.modal.hide();
    },
    handleSubmit2: function() {
        var data = {
            user: {
                email: 'donor@donor.com',
                password: 'password',
                remember_me: 1,
                commit: 'Log in'
            }
        };
        $.ajax({
            url: '/users/sign_in',
            dataType: 'json',
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
            },
            data: data,
            success: function(data) {
                console.log("login success!");
                window.location.href = "/";
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
        this.refs.modal.hide();
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

var donationModalInstance = React.render(
    <DonationModal />,
    document.getElementById('donation-modal')
);
