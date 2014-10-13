/** @jsx React.DOM */

var FOOD_BREAD = 'Bread', FOOD_BULK = 'Bulk', FOOD_DAIRY = 'Dairy', FOOD_JUICE = 'Juice', FOOD_MEAT = 'Meat',
FOOD_MIXED = 'Mixed', FOOD_PREPARED = 'Prepared', FOOD_PRODUCE = 'Produce';

var TYPE_BOX = 'box', TYPE_PACK = 'pack', TYPE_POUND = 'pound', TYPE_TRAY = 'tray';

var DonorForm = React.createClass({
    getInitialState: function() {
        return {
            selectedFood: [],
            quantity: 1,
            quantityType: "box",
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
    render: function() {
        return (
            <div>
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
  <DonorForm />,
  document.getElementById('donor-form')
);
