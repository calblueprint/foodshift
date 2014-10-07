/** @jsx React.DOM */

var FOOD_BREAD = 'Bread', FOOD_BULK = 'Bulk', FOOD_DAIRY = 'Dairy', FOOD_JUICE = 'Juice', FOOD_MEAT = 'Meat',
FOOD_MIXED = 'Mixed', FOOD_PREPARED = 'Prepared', FOOD_PRODUCE = 'Produce';

var TYPE_BOX = 'box', TYPE_PACK = 'pack', TYPE_POUND = 'pound', TYPE_TRAY = 'tray';

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

var DonorForm = React.createClass({
    getInitialState: function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var todayStr = mm + '/' + dd + '/' + yyyy;
        return {
            selectedFood: [],
            quantity: 1,
            quantityType: "box",
            pickupDate: todayStr,
            pickupStartTime: "1:00pm",
            pickupEndTime: "2:00pm",
            locationButton: "currentLocation",
            address: "123 Berkeley",
            contactPhone: "123-456-1345",
            hasDefaultPickupInfo: true
        };
    },
    getDefaultProps: function() {
        return {
            foodTypes: [
                FOOD_BREAD,
                FOOD_BULK,
                FOOD_DAIRY,
                FOOD_JUICE,
                FOOD_MEAT,
                FOOD_MIXED,
                FOOD_PREPARED,
                FOOD_PRODUCE
            ],
            quantityChoices: [
                {name: TYPE_BOX, value: TYPE_BOX},
                {name: TYPE_PACK, value: TYPE_PACK},
                {name: TYPE_POUND, value: TYPE_POUND},
                {name: TYPE_TRAY, value:TYPE_TRAY},
            ]
        };
    },
    onFoodButtonClick: function(event) {
        var foodType = event.value;
        var values = this.state.selectedFood;
        if (_.contains(values, foodType)) {
            values = _.without(values, foodType)
        } else {
            values.push(foodType);
        }
        this.setState({selectedFood: values});
    },
    onQuantityChange: function(event) {
        var quantity = event.target.value;
        this.setState({quantity: quantity});
    },
    onQuantityTypeChange: function(event) {
        var quantityType = event.value;
        this.setState({quantityType: quantityType});
    },
    onPickupDateChange: function(event) {
        var pickupDate = event.target.value;
        this.setState({pickupDate: pickupDate});
    },
    onPickupStartTimeChange: function(event) {
        var pickupStartTime = event.target.value;
        this.setState({pickupStartTime: pickupStartTime});
    },
    onPickupEndTimeChange: function(event) {
        var pickupEndTime = event.target.value;
        this.setState({pickupEndTime: pickupEndTime});
    },
    onAddressChange:  function(event) {
        var address = event.target.value;
        this.setState({address: address});
    },
    onContactPhoneChange:  function(event) {
        var contactPhone = event.target.value;
        this.setState({contactPhone: contactPhone});
    },
    render: function() {
        return (
            <div>
                <div className="donor-form-food-block">
                    <div className="row">
                        <div className="small-12 columns">
                            <h3 className="text-center">I want to <strong>donate</strong>...</h3>
                            <FoodTypeMultiSelect choices={_.initial(this.props.foodTypes, 4)} values={this.state.selectedFood} onButtonClick={this.onFoodButtonClick}/>
                            <FoodTypeMultiSelect choices={_.rest(this.props.foodTypes, 4)} values={this.state.selectedFood} onButtonClick={this.onFoodButtonClick}/>
                        </div>
                    </div>
                    <div className="row collapse add-form-padding">
                        <div className="small-3 small-offset-3 columns">
                            <NumberField value={this.state.quantity} min={0} handleChange={this.onQuantityChange}/>
                        </div>
                        <div className="small-3 columns">
                            <SelectBox choices={this.props.quantityChoices} value={this.state.quantityType} onSelect={this.onQuantityTypeChange}/>
                        </div>
                        <div className="small-3 columns">
                        </div>
                    </div>
                    <div className="row add-form-padding">
                        <div className="small-12 columns">
                            <div className="text-center">
                                <a className="button">Continue</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="donor-form-pickup-block">
                    <div className="row">
                        <div className="small-12 columns">
                            <DateField label="Date" value={this.state.pickupDate} handleChange={this.onPickupDateChange}/>
                            <TimeField value={this.state.pickupStartTime} handleChange={this.onPickupStartTimeChange}/>
                            <TimeField value={this.state.pickupEndTime} handleChange={this.onPickupEndTimeChange}/>

                            <p>At:</p>
                            <InputField label="Address" value={this.state.address} handleChange={this.onAddressChange}/>
                            <InputField label="Phone" value={this.state.contactPhone} handleChange={this.onContactPhoneChange}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var FoodTypeMultiSelect = React.createClass({
    getDefaultProps: function() {
        return {
            onButtonClick: undefined,
            choices: ['Button'],
            values: []
        };
    },
    render: function() {
        var buttons = _.map(this.props.choices, function (name) {
            classes = React.addons.classSet({
                'tab-current': _.contains(this.props.values, name)
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
            <div className="tabs tabs-style-circle">
                <ul className="tabs-row">
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
