/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

Number.prototype.mod = function(n) { return ((this % n) + n) % n; }

var DeliverDashboard = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="small-12 columns">
                    <div className="dashboard-wrap">
                        <p>HI</p>
                    </div>
                </div>
            </div>
        );
    },
});

React.renderComponent(
    <DeliverDashboard />,
    document.getElementById('deliver-content')
);
