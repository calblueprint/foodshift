/** @jsx React.DOM */

var DonationModal = React.createClass({
    getInitialState: function() {
        return {
            email: '',
            password: '',
            userExists: false
        };
    },
    render: function() {
        var validPassword = this.state.password.length >= 8;
        var buttonClasses = React.addons.classSet({
            'success-button': true,
            'disabled': !validPassword
        });
        var passwordClasses = React.addons.classSet({
            'error': !validPassword
        });
        var passwordError = validPassword ? null : (
            <small className="error">Password must be at least 8 characters long.</small>
        );
        var modalHeader = this.state.userExists ? 'Sign In' : 'Register';
        var modalText = this.state.userExists ? (
            <p>We saw that you've donated food before using an account with this email address. Sign in to finish submitting the donation.</p>
        ) : (
            <p>It looks like this is your first time donating. Create an account to finish submitting the donation.</p>
        );

        return (
            <div className="panel panel-default">
                <Modal ref="modal"
                    show={false}
                    header={modalHeader}
                >
                    {modalText}
                    <div className="row collapse">
                        <div className="small-3 large-2 columns">
                          <span className="prefix">Email</span>
                        </div>
                        <div className="small-9 large-10 columns">
                          <input type="text" value={this.state.email} readOnly/>
                        </div>
                    </div>
                    <div className="row collapse">
                        <div className="small-3 large-2 columns">
                          <span className="prefix">Password</span>
                        </div>
                        <div className="small-9 large-10 columns">
                          <input type="password" className={passwordClasses} value={this.state.password} onChange={this.handlePasswordChange}/>
                          {passwordError}
                        </div>
                    </div>
                    <div className="text-center">
                        <a className={buttonClasses} onClick={validPassword ? this.handleSubmit : null}>Confirm</a>
                    </div>
                </Modal>
            </div>
        );

    },
    handlePasswordChange: function(event) {
        this.setState({password: event.target.value});
    },
    handleShowModal: function() {
        this.refs.modal.show()
    },
    handleExternalHide: function() {
        this.refs.modal.hide()
    },
    handleSubmit: function() {
        var beforeSend = function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
        }
        if (this.state.userExists) {
            this.handleSignIn(this.state.email, this.state.password, beforeSend);
        } else {
            this.handleRegister(this.state.email, this.state.password, beforeSend);
        }
    },
    handleDonation: function(beforeSend) {
        var data = new FormData($("#donor-form-fields"));
        console.log(data);
        $.ajax({
            url: window.location.href,
            type: 'POST',
            beforeSend: beforeSend,
            data: data,
            success: function(data) {
                toastr.success('Submission success!');
                window.location.href = '/';
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
                toastr.error(xhr.responseJSON.error);
            }.bind(this)
        });
    },
    handleSignIn: function(email, password, beforeSend) {
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
                this.handleDonation(beforeSend);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
                toastr.error(xhr.responseJSON.error);
            }.bind(this)
        });
    },
    handleRegister: function(email, password, beforeSend) {
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
                this.handleDonation(beforeSend);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
                toastr.error(xhr.responseJSON.error);
            }.bind(this)
        });
    }
});

var donationModalInstance = React.render(
    <DonationModal />,
    document.getElementById('donation-modal')
);
