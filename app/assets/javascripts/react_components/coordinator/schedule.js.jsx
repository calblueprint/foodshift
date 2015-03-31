/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Number.prototype.mod = function(n) { return ((this % n) + n) % n; }

var ScheduleDashboard = React.createClass({
    getInitialState: function() {
        var donations = this.getDonationsList()
        return {
            donations: donations,
            recipients: _.isEmpty(donations) ? [] : this.getRecipientsList(donations[0].id),
            currDonationIndex: 0,
            transitionClass: "slide-right",
        };
    },
    getDefaultProps: function() {
        return {};
    },
    getDonationsList: function() {
        return gon.donations
    },
    getRecipientsList: function(donationId) {
        return _.filter(gon.recipients, function(recipient) {
            return recipient.donation_id === donationId;
        });
    },
    getNextDonation: function() {
        var index = (this.state.currDonationIndex + 1).mod( _.size(this.state.donations))
        this.setState({
            currDonationIndex: index,
            recipients: this.getRecipientsList(this.state.donations[index].id),
            transitionClass: "slide-left"
        })
    },
    getPrevDonation: function() {
        var index = (this.state.currDonationIndex - 1).mod(_.size(this.state.donations))
        this.setState({
            currDonationIndex: index,
            recipients: this.getRecipientsList(this.state.donations[index].id),
            transitionClass: "slide-right"
        })
    },
    handleSubmit: function(event) {
        var donations = _.reject(this.state.donations, function(donation) {
            return donation.id === event.donationId;
        });
        var index = 0;
        var recipients = []
        if (!(_.isEmpty(donations))) {
            recipients = this.getRecipientsList(donations[index].id);
        }
        this.setState({
            donations: donations,
            currDonationIndex: index,
            recipients: recipients,
            transitionClass: "slide-right",
        })
    },
    render: function() {
        var content = _.isEmpty(this.state.donations) ? this.renderEmpty() : this.renderHasDonations();
        return (
            <div className="row">
                <div className="small-12 columns">
                    <div className="dashboard-wrap">
                        <ReactCSSTransitionGroup transitionName={this.state.transitionClass}>
                            {content}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    },
    renderHasDonations: function() {
        var currDonation = this.state.donations[this.state.currDonationIndex];
        var recipientsWithInterests = _.map(this.state.recipients, function(interest) {
            return _.extend(interest.recipient, {interestId: interest.id});
        });
        var recipientProfilesList = _.map(recipientsWithInterests, function(recipient) {
            return recipient.recipient_profile;
        });
        return (
            <div key={currDonation.id} className="dashboard">
                <div className="card-header">
                    <div className="row">
                        <div className="small-12 columns">
                            <span className="card-header-arrow-left">
                                <a onClick={this.getPrevDonation}><i className="fa fa-chevron-left fa-lg"></i></a>
                            </span>
                            <span className="card-header-title">
                                Donation {this.state.currDonationIndex + 1} of {_.size(this.state.donations)}
                            </span>
                            <span className="card-header-arrow-right">
                                <a onClick={this.getNextDonation}><i className="fa fa-chevron-right fa-lg"></i></a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-donation">
                    <div className="row">
                        <div className="small-12 columns">
                            <DonationInfo donation={currDonation} />
                        </div>
                    </div>
                </div>
                <div className="donation-recipients">
                    <div className="row">
                        <div className="medium-6 columns no-right-pad">
                            <DonationRecipients
                                recipients={recipientsWithInterests}
                                donation={currDonation}
                                handleSubmit={this.handleSubmit}
                            />
                        </div>
                        <div className="medium-6 columns no-left-pad">
                            <GoogleMap
                                donation={currDonation}
                                recipients={recipientProfilesList}
                                longitude={Number(currDonation.longitude)}
                                latitude={Number(currDonation.latitude)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    renderEmpty: function() {
        return (
            <div className="dashboard-empty">
                <div className="fa-stack fa-3x">
                    <i className="fa fa-spin fa-sun-o fa-stack-1x fa-thin"></i>
                    <i className="fa fa-spin fa-smile-o fa-stack-1x fa-thin"></i>
                </div>
                <p>No pending donations! Please enjoy your day.</p>
            </div>
        );
    }
});

var DonationInfo = React.createClass({
    getDefaultProps: function () {
        return {
            format: 'h:mm:ss a'
        }
    },
    render: function() {
        var time = moment(this.props.donation.window_start).format(this.props.format);
        return (
            <div className="donation-info">
                <div className="row">
                    <div className="medium-4 columns">
                        <h1 className="donation-info-title">{this.props.donation.organization}</h1>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul">
                            <li><i className="fa-li fa fa-clock-o"></i>{time}.</li>
                            
                            <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.address}</li>
                        </ul>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul">
                            <li><i className="fa-li fa fa-user"></i>{this.props.donation.person}</li>
                            <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.email}</li>
                            <li><i className="fa-li fa fa-phone"></i>{this.props.donation.phone}</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-7 medium-offset-1 columns">
                        <p>{this.props.donation.description}</p>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul additional-info-list">
                            {this.props.donation.can_dropoff && <li><i className="fa fa-car"></i><p>This donor can drop off the donation!</p></li>}
                            <li>
                                <i className="fa-li fa fa-info-circle"></i>
                                <p>{this.renderAdditionalInfo()}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    },
    renderAdditionalInfo: function() {
        var info = this.props.donation.additionalInfo;
        if (_(info).isBlank()) {
            info = "No additional info about this donation."
        }
        return (
            <p className="additional-info">
                {info}
            </p>
        );

    }
});

var DonationRecipients = React.createClass({
    getInitialState: function() {
        return {
            openRecipientId: null
        };
    },
    getDefaultProps: function() {
        return {
            recipients: [],
            donation: null,
            handleSubmit: undefined
        }
    },
    handleRecipientOpen: function(event) {
        var recipientId = event.recipientId;
        if (this.state.openRecipientId === recipientId) {
            // If we click on an open recipient, we want to close it
            recipientId = null;
        }
        this.setState({openRecipientId: recipientId});
    },
    computeTravelTime: function(donation, recipient, directionsService) {
        var travelTime;
        var request = {
            origin: new google.maps.LatLng(Number(donation.latitude), Number(donation.longitude)),
            destination: new google.maps.LatLng(Number(recipient.recipient_profile.latitude), Number(recipient.recipient_profile.longitude)),
            travelMode: google.maps.TravelMode.TRANSIT
        };
        directionsService.route(request, function(result, status){
            if (status == google.maps.DirectionsStatus.OK) {
                // Since this is just an estimate, take the first route found
                // The routes will only have 1 "leg" in every case because there is just 1 src and 1 dest
                travelTime = result.routes[0].legs[0].duration.text;
            } else {
                console.log(result);
            }
        });
        return travelTime;

    },
    render: function() {
        var directionsService = new google.maps.DirectionsService();
        var recipients =  _.map(this.props.recipients, function(recipient) {
            var isOpen = (recipient.id === this.state.openRecipientId);

            return (
                <Recipient
                    key={recipient.id}
                    donation={this.props.donation}
                    recipient={recipient}
                    isOpen={isOpen}
                    handleClick={this.handleRecipientOpen}
                    handleSubmit={this.props.handleSubmit}
                    travelTime={this.computeTravelTime(this.props.donation, recipient, directionsService)}
                />
            );
        }.bind(this));
        return (
            <div>
                <div className="recipients-list-title">
                    Recipient Requests
                </div>
                <div className="recipients-list">
                    {recipients}
                </div>
            </div>
        );
    }
});


var Recipient = React.createClass({
    handleClick: function() {
        this.props.handleClick({recipientId: this.props.recipient.id});
    },
    handleSubmit: function() {
        this.submitMatch(this.props.recipient.interestId, this.props.donation.id, this.props.recipient.id);
        this.props.handleSubmit({donationId: this.props.donation.id});
        this.refs.modal.hide()
    },
    submitMatch: function(interestId, donationId, recipientId) {
        $.ajax({
            url: window.location.href,
            dataType: 'json',
            type: 'POST',
            data: {interest_id: interestId, donation_id: donationId, recipient_id: recipientId},
            success: function(data) {
                console.log("Submission success!");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(window.location.href, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var content;
        var titleClasses = React.addons.classSet({
            'recipient-title': true,
            'active': this.props.isOpen
        });
        var iconClasses = React.addons.classSet({
            'fa': true,
            'fa-chevron-down': true,
            'active': this.props.isOpen,
        });
        if (this.props.isOpen) {
            content = this.renderOpen();
        } else {
            content =  this.renderClosed();
        }
        return (
            <div className="recipient" >
                <div className={titleClasses} onClick={this.handleClick}>
                    <div className="row">
                        <div className="medium-8 columns">
                            {this.props.recipient.recipient_profile.address}
                        </div>
                        <div className="small-11 medium-3 columns">
                            {this.props.travelTime}
                        </div>
                        <div className="small-1 medium-1 end columns">
                            <a className="expand-icon" ><i className={iconClasses}></i></a>
                        </div>
                    </div>
                </div>
                <ReactCSSTransitionGroup transitionName="recipient-slide">
                    {content}
                </ReactCSSTransitionGroup>
            </div>
        )
    },
    renderOpen: function() {
        return (
            <div key={_.join("-", this.props.recipient.id, "open")} className="recipient-open">
                <div className="row">
                    <div className="medium-6 columns">
                        <div className="recipient-details">
                            <p className="organization">{this.props.recipient.recipient_profile.organization}</p>
                            <ul className="fa-ul">
                                <li><i className="fa-li fa fa-user"></i>{this.props.recipient.recipient_profile.contact_person}</li>
                                <li><i className="fa-li fa fa-envelope-o"></i>{this.props.recipient.email}</li>
                                <li><i className="fa-li fa fa-phone"></i>{this.props.recipient.recipient_profile.contact_person_phone}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="medium-6 columns">
                        <div className="recipient-confirm">
                            <a className="match-button" onClick={this.handleShowModal}>Schedule</a>
                        </div>
                    </div>
                </div>
                <Modal ref="modal"  show={false} header="Confirm Match">
                    <div className="confirm-modal">
                        <div className="donation-row">
                            <div className="medium-5 columns">
                                <ul className="fa-ul">
                                    <li><i className="fa-li fa fa-users"></i>{this.props.donation.organization}</li>
                                    <li><i className="fa-li fa fa-user"></i>{this.props.donation.person}</li>
                                </ul>
                            </div>
                            <div className="medium-7 columns">
                                <ul className="fa-ul">
                                    <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.address}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="delivery-row">
                            <div className="small-2 medium-1 columns">
                                <i className="fa fa-long-arrow-down fa-5x delivery-arrow"></i>
                            </div>
                            <div className="small-10 medium-4 columns">
                                <ul className="fa-ul">
                                    <li><i className="fa-li fa fa-clock-o"></i>{this.props.donation.window_start}</li>
                                    <li><i className="fa-li fa "></i>{this.props.donation.window_start}- {this.props.donation.window_end}</li>
                                </ul>
                            </div>
                            <div className="small-10 small-offset-2 medium-7 medium-offset-0 columns">
                                <ul className="fa-ul">
                                    <li>
                                        <i className="fa-li fa fa-cutlery"></i>
                                        {this.props.donation.description}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="recipient-row">
                            <div className="medium-5 columns">
                                <ul className="fa-ul">
                                    <li><i className="fa-li fa fa-users"></i>{this.props.recipient.recipient_profile.organization}</li>
                                    <li><i className="fa-li fa fa-user"></i>{this.props.recipient.recipient_profile.contact_person}</li>
                                </ul>
                            </div>
                            <div className="medium-7 columns">
                                <ul className="fa-ul">
                                    <li><i className="fa-li fa fa-map-marker"></i>{this.props.recipient.recipient_profile.address}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="button-row">
                            <div className="small-12 columns">
                                <a className="confirm-button" onClick={this.handleSubmit}>Confirm</a>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    },
    renderClosed: function() {
        return (
            <div key={_.join("-", this.props.recipient.id, "closed")} className="recipient-closed">
            </div>
        );
    },
    handleShowModal: function() {
        this.refs.modal.show()
    },
    handleExternalHide: function() {
        this.refs.modal.hide()
    },
});

React.render(
    <ScheduleDashboard />,
    document.getElementById('schedule-content')
);
