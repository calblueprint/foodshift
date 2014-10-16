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
                address: '2535 Chilton Way',
                foodTypes: ['Bread', 'Dairy'],
                quantity: '3 Boxes',
                date: '1/1/2014',
                startTime: '1:00PM',
                endTime: '2:00PM',
                name: 'Joe Bloggs',
                organization: 'Blueprint',
                email: 'joe@bloggs.com',
                phone: '123-456-7890',
                additionalInfo: 'yo'
            },
            {
                id: 999,
                address: '123 Hello St.',
                foodTypes: ['Meat'],
                quantity: '1 Tray',
                date: '10/10/2014',
                startTime: '10:00AM',
                endTime: '11:00AM',
                name: '2jun Jeong',
                organization: 'Greenprint',
                email: '2@jun.com',
                phone: '444-444-4444',
                additionalInfo: 'boooooooooooooop'
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
                            <a onClick={this.getNextDonation}><i className="fa fa-chevron-circle-left"></i></a>
                        </div>
                    </div>
                    <div className="small-10 columns">
                        <DonationInfo donation={this.state.donations[this.state.currDonationIndex]} />
                    </div>
                    <div className="small-1 columns">
                        <div className="text-centered">
                            <a onClick={this.getNextDonation}><i className="fa fa-chevron-circle-right"></i></a>
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
                    <div className="small-12 columns">
                        <h1 className="donation-info-title">{this.props.donation.address}</h1>
                        <h2 className="donation-info-date">{this.props.donation.date}: {this.props.donation.startTime} - {this.props.donation.endTime}</h2>
                        <div className="donation-info-conent">
                            <h3>Donation</h3>
                            <p>{this.props.donation.quantity} of {this.props.donation.foodTypes}</p>
                            <h3>Contact</h3>
                            <p>{this.props.donation.name}</p>
                            <p>{this.props.donation.phone}</p>
                            <p>{this.props.donation.email}</p>
                            <h3>Additional Info</h3>
                            <p>{this.props.donation.additionalInfo}</p>
                        </div>
                    </div>
                </div>
            </div>
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
