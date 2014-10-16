/** @jsx React.DOM */

var Dashboard = React.createClass({
    getInitialState: function() {
        var donations = this.getDonationsList()
        return {
            donations: donations,
            recipients: this.getRecipientsList(donations[0].id),
            currDonationIndex: 0
        };
    },
    getDonationsList: function() {
        // TODO: Write an AJAX version for this
        return [
            {
                id: 555,
                address: '620 3rd Street, San Francisco, CA, United States',
                foodTypes: ['Bread', 'Dairy'],
                quantity: '3 boxes',
                date: '1/1/2014',
                startTime: '1:00PM',
                endTime: '2:00PM',
                name: 'Joe Bloggs',
                organization: 'Blueprint',
                email: 'joe@bloggs.com',
                phone: '123-456-7890',
                additionalInfo: '  '
            },
            {
                id: 999,
                address: '420 4rd Street, San Francisco, CA, United States',
                foodTypes: ['Meat'],
                quantity: '1 tray',
                date: '10/10/2014',
                startTime: '10:00AM',
                endTime: '11:00AM',
                name: '2jun Jeong',
                organization: 'Greenprint',
                email: '2@jun.com',
                phone: '444-444-4444',
                additionalInfo: 'Here is some additional information about this donation.'
            }
        ]
    },
    getRecipientsList: function(donationId) {
        // TODO: Write an AJAX version for this
        return [
            {
                id: 1,
                donationId: 0,
                firstName: 'Joe',
                lastName: 'Bloggs',
                email: 'joe@bloggs.com',
                phone: '123-456-7890',
                organization: 'Blueprint',
                address: '2535 Chilton Way',
                orgNumber: '9000',
                callerId: donationId
            },
            {
                id: 2,
                donationId: 0,
                firstName: 'Moe',
                lastName: 'Recipient',
                email: 'moe@recipient.com',
                phone: '555-555-5555',
                organization: 'Redprint',
                address: '1235 Food St.',
                orgNumber: '5000',
                callerId: donationId
            }
        ]
    },
    getNextDonation: function() {
        var index = (this.state.currDonationIndex + 1) % _.size(this.state.donations)
        var recipients = this.getRecipientsList(this.state.donations[index].id);
        this.setState({
            currDonationIndex: index,
            recipients: recipients
        })
    },
    getPrevDonation: function() {
        var index = (this.state.currDonationIndex - 1) % _.size(this.state.donations)
        var recipients = this.getRecipientsList(this.state.donations[index].id);
        this.setState({
            currDonationIndex: index,
            recipients: recipients
        })
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="small-1 columns">
                        <div className="text-centered">
                            <a onClick={this.getNextDonation}><i className="fa fa-chevron-circle-left fa-3x"></i></a>
                        </div>
                    </div>
                    <div className="small-10 columns">
                        <DonationInfo donation={this.state.donations[this.state.currDonationIndex]} />
                    </div>
                    <div className="small-1 columns">
                        <div className="text-centered">
                            <a onClick={this.getNextDonation}><i className="fa fa-chevron-circle-right fa-3x"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 columns">
                        <DonationRecipients recipients={this.state.recipients} />
                    </div>
                </div>
            </div>
        );
    }
});

var DonationInfo = React.createClass({
    getDefaultProps: function() {
        return {
            donation: {
                id: 0,
                address: 'Test St.',
                foodTypes: ['TestFood1', 'TestFood2'],
                quantity: '1 Tray',
                date: '1/1/2014',
                startTime: '10:00AM',
                endTime: '11:00AM',
                name: 'Foodshift User',
                organization: 'Food Shift',
                email: 'food@shift.com',
                phone: '123-456-7890',
                additionalInfo: 'I\'m hungry'
            }
        }
    },
    render: function() {
        return (
            <div className="donation-info">
                <div className="row">
                    <div className="medium-4 columns">
                        <h1 className="donation-info-title">{this.props.donation.organization}</h1>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul">
                          <li><i className="fa-li fa fa-clock-o"></i>{this.props.donation.date}</li>
                          <li><i className="fa-li fa "></i>{this.props.donation.startTime} - {this.props.donation.endTime}</li>
                          <li><i className="fa-li fa fa-map-marker"></i>{this.props.donation.address}</li>
                        </ul>
                    </div>
                    <div className="medium-4 columns">
                        <ul className="fa-ul">
                          <li><i className="fa-li fa fa-user"></i>{this.props.donation.name}</li>
                          <li><i className="fa-li fa fa-envelope-o"></i>{this.props.donation.email}</li>
                          <li><i className="fa-li fa fa-phone"></i>{this.props.donation.phone}</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 columns">
                        <ul className="fa-ul">
                            <li>
                                <i className="fa-li fa fa-cutlery"></i>
                                {this.props.donation.quantity} of:
                                {this.renderFoodTypes()}
                            </li>
                        </ul>
                    </div>
                    <div className="medium-6 columns">
                        <ul className="fa-ul additional-info-list">
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
    renderFoodTypes: function() {
        var foodListItems = _.map(this.props.donation.foodTypes, function(foodType) {
            return (
                <li>{foodType}</li>
            );
        });
        return (
            <ul className="inline-list-food">
                {foodListItems}
            </ul>
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
            recipients: []
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
    render: function() {
        recipients =  _.map(this.props.recipients, function (recipient) {
            var isOpen = (recipient.id === this.state.openRecipientId);
            return (
                <Recipient recipient={recipient} isOpen={isOpen} handleClick={this.handleRecipientOpen} />
            );
        }.bind(this));
        return (
            <div className="donation-recipients">
                <div className="row">
                    <div className="small-12 columns">
                        {recipients}
                    </div>
                </div>
            </div>
        );
    }
});

var Recipient = React.createClass({
    getDefaultProps: function() {
        return {
            recipient: {
                id: 2,
                firstName: 'Test',
                lastName: 'Recipient',
                email: 'test@recipient.com',
                phone: '123-456-7890',
                organization: 'Greenprint',
                address: '123 BP St.',
                orgNumber: '9000',
            },
            isOpen: false,
            handleClick: undefined,
        }
    },
    handleClick: function() {
        this.props.handleClick({recipientId: this.props.recipient.id});
    },
    handleSubmit: function() {
        // TODO: Actually submit via AJAX this select
        console.log("Selected donation: " + this.props.recipient.donationId + " with recipient: " + this.props.recipient.firstName + " " + this.props.recipient.lastName);
    },
    render: function() {
        var content;
        if (this.props.isOpen) {
            content = this.renderOpen();
        } else {
            content =  this.renderClosed();
        }
        return (
            <div className="recipient" >
                <div className="recipient-title" onClick={this.handleClick}>
                    {this.props.recipient.organization} at {this.props.recipient.address}
                </div>
                <div className="recipient-content">
                    {content}
                </div>
            </div>
        )
    },
    renderOpen: function() {
        return (
            <div className="recipient-open">
                <div className="row">
                    <div className="small-12 columns">
                        <p>I am {this.props.recipient.id} from caller id {this.props.recipient.callerId} and open</p>
                        <a className="button" onClick={this.handleSubmit}>Match</a>
                    </div>
                </div>
            </div>
        );
    },
    renderClosed: function() {
        return (
            <div className="recipient">
                <div className="row">
                    <div className="small-12 columns">
                        <p>I am {this.props.recipient.id} {this.props.recipient.callerId} closed</p>
                    </div>
                </div>
            </div>
        );
    }
});

React.renderComponent(
    <Dashboard />,
    document.getElementById('dashboard-content')
);
