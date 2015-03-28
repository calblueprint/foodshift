/** @jsx React.DOM */

var DonationModal = React.createClass({
    getInitialState: function() {
        return {
            email: null,
            userExists: false
        };
    },
    render: function() {
        return this.state.userExists ? this.renderSignIn() : this.renderRegister();
    },
    renderRegister: function() {
        return (
            <div className="panel panel-default">
                <Modal ref="modal"
                    show={false}
                    header="Example Modal"
                >
                    <p>Please Register.</p>
                    <a className="confirm-button" onClick={this.handleSubmit}>Confirm</a>
                </Modal>
            </div>
        );
    },
    renderSignIn: function(email) {
        return (
            <div className="panel panel-default">
                <Modal ref="modal"
                    show={false}
                    header="Example Modal"
                >
                    <p>Please Sign In.</p>
                    <a className="confirm-button" onClick={this.handleSubmit}>Confirm</a>
                </Modal>
            </div>
        );
    },
    renderFailure: function() {
        return (
            <div className="panel panel-default">
                <Modal ref="modal"
                    show={false}
                    header="Example Modal"
                >
                    <p>We're sorry, something went wrong. Please try again.</p>
                    <a className="confirm-button" onClick={this.handleSubmit}>Confirm</a>
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
    handleSubmit: function() {
        var data = $("#donor-form-fields").serialize();
        var dataArray = $("#donor-form-fields").serializeArray();
        var email = _.find(dataArray, function(field) {return field.name === "donation[email]"}).value;
        var password = "password";
        var password_confirmation = password;
        var beforeSend = function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        }
        console.log(this.state.email);
        console.log(password);
        console.log(data);

        this.state.userExists ? this.handleSignIn(this.state.email, password, beforeSend, data) : this.handleRegister(this.state.email, password, beforeSend, data);


        //this.refs.modal.hide();
    },
    handleDonation: function(data, beforeSend) {
        $.ajax({
            url: window.location.href,
            dataType: 'json',
            type: 'POST',
            beforeSend: beforeSend,
            data: data,
            success: function(data) {
                console.log("Submission success!");
                window.location.href = "/";
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
    },
    handleSignIn: function(email, password, beforeSend, donationData) {
        var data = {
            user: {
                email: email,
                password: password,
                remember_me: 1,
            }
        };
        $.ajax({
            url: '/users/sign_in',
            dataType: 'json',
            type: 'POST',
            beforeSend: beforeSend,
            data: data,
            success: function(data) {
                console.log("Signin success!");
                this.handleDonation(donationData, beforeSend);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
    },
    handleRegister: function(email, password, beforeSend, donationData) {
        var data = {
            user: {
                email: email,
                password: password,
                password_confirmation: password,
                type: 'Donor'
            }
        };
        $.ajax({
            url: '/users',
            dataType: 'json',
            type: 'POST',
            beforeSend: beforeSend,
            data: data,
            success: function(data) {
                console.log("Signup success!");
                this.handleDonation(donationData, beforeSend);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
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
