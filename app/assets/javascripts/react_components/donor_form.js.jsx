/** @jsx React.DOM */

var FOOD_BREAD = 'Bread', FOOD_BULK = 'Bulk', FOOD_DAIRY = 'Dairy', FOOD_JUICE = 'Juice', FOOD_MEAT = 'Meat',
FOOD_MIXED = 'Mixed', FOOD_PREPARED = 'Prepared', FOOD_PRODUCE = 'Produce';

var TYPE_BOX = 'box', TYPE_PACK = 'pack', TYPE_POUND = 'pound', TYPE_TRAY = 'tray';

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
            email: "food@shift.com",
            additionalInfo: "Info info info",
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
    onAddressChange: function(event) {
        var address = event.target.value;
        this.setState({address: address});
    },
    onContactPhoneChange: function(event) {
        var contactPhone = event.target.value;
        this.setState({contactPhone: contactPhone});
    },
    onEmailChange: function(event) {
        var email = event.target.value;
        this.setState({email: email});
    },
    onAdditionalInfoChange: function(event) {
        var additionalInfo = event.target.value;
        this.setState({additionalInfo: additionalInfo});
    },
    render: function() {
        return (
            <div>
                <div className="donor-form-food-block">
                    <div className="row">
                        <div className="small-12 columns">
                            <h3 className="text-center block-title">What can you donate?</h3>
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
                </div>
                <div className="donor-form-time-block">
                    <div className="row">
                        <div className="small-12 columns">
                            <h3 className="text-center block-title">When is this available?</h3>
                            <div className="row collapse">
                                <div className="large-2 small-3 columns">
                                    <span className="prefix">Date</span>
                                </div>
                                <div className="large-2 small-9 columns">
                                    <DateField value={this.state.pickupDate} handleChange={this.onPickupDateChange}/>
                                </div>
                                <div className="large-1 large-offset-1 small-3 columns">
                                    <span className="prefix">From</span>
                                </div>
                                <div className="large-2 small-9 columns">
                                    <TimeField value={this.state.pickupStartTime} handleChange={this.onPickupStartTimeChange}/>
                                </div>
                                <div className="large-1 large-offset-1 small-3 columns">
                                    <span className="prefix">To</span>
                                </div>
                                <div className="large-2 small-9 columns">
                                    <TimeField value={this.state.pickupEndTime} handleChange={this.onPickupEndTimeChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="donor-form-location-block">
                    <div className="row">
                        <div className="small-12 columns">
                            <h3 className="text-center block-title">Where should we pick this up?</h3>
                            <div className="row">
                                <div className="medium-6 columns">
                                    <TextField label="Address" value={this.state.address} handleChange={this.onAddressChange}/>
                                </div>
                                <div className="medium-6 columns contact-padding">
                                    <div className="row collapse">
                                        <div className="small-2 columns">
                                            <span className="prefix">Phone</span>
                                        </div>
                                        <div className="small-10 columns">
                                            <InputField value={this.state.contactPhone} handleChange={this.onContactPhoneChange}/>
                                        </div>
                                    </div>
                                    <div className="row collapse">
                                        <div className="small-2 columns">
                                            <span className="prefix">Email</span>
                                        </div>
                                        <div className="small-10 columns">
                                            <InputField value={this.state.email} handleChange={this.onEmailChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="donor-form-submit-block">
                    <div className="row">
                        <div className="small-12 columns">
                            <h3 className="text-center block-title">Anything else we should know about your donation?</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="small-12 medium-8 medium-centered columns">
                            <TextField label="Additional Info" value={this.state.additionalInfo} handleChange={this.onAdditionalInfoChange}/>
                        </div>
                    </div>
                    <div className="row add-form-padding">
                        <div className="small-12 columns">
                            <div className="text-center">
                                <a className="button">Donate!</a>
                            </div>
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
