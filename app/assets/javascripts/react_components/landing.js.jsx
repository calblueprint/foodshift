/** @jsx React.DOM */

var USER_DONOR = 'Donate', USER_RECIPIENT = 'Receive', USER_COORDINATOR = 'Deliver';

var LandingForm = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            userType: null
        };
    },
    getDefaultProps: function() {
        return {
            value: ''
        };
    },
    handleTypeSelect: function(event) {
        this.setState({userType: event.value});
    },
    render: function() {
        var userForm = "";
        if (this.state.userType === USER_DONOR) {
            userForm = <DonorForm />;
        } else if (this.state.userType === USER_RECIPIENT) {
            userForm = "";
        } else if (this.state.userType === USER_COORDINATOR) {
            userForm = "";
        }
        return (
            <div>
                <div className="user-select-block">
                    <div className="row">
                        <div className="small-12 small-centered columns">
                            <UserTypeSelect value={this.state.userType} onButtonClick={this.handleTypeSelect} />
                        </div>
                    </div>
                </div>
                {userForm}
            </div>
        );
    }
});

var UserTypeSelect = React.createClass({
    getDefaultProps: function() {
        return {
            onButtonClick: undefined,
            choices: [USER_DONOR, USER_RECIPIENT, USER_COORDINATOR],
            value: ''
        };
    },
    render: function() {
        var buttons = _.map(this.props.choices, function (name) {
            classes = React.addons.classSet({
                'tab-current': this.props.value === name
            });
            return (
                <li className={classes}>
                <ToggleButtonAnchor
                    name={name}
                    is_active={this.props.value === name}
                    onButtonClick={this.props.onButtonClick} />
                </li>
            );
        }.bind(this));
        return (
            <div className="tabs tabs-style-iconbox">
                <ul>
                    {buttons}
                </ul>
            </div>
        );
    }
});


React.renderComponent(
  <LandingForm />,
  document.getElementById('landing-form')
);
