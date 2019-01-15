;(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("react"), require("prop-types"), require("create-react-class"));
  } else if (typeof define === "function" && define.amd) {
    define(["react", "prop-types"], factory);
  } else {
    root.SegmentedControl = factory(root.React, root.PropTypes);
  }
})(this, function (React, PropTypes, createReactClass) {
  "use strict";

  var SegmentedControl = createReactClass({displayName: "SegmentedControl",
    propTypes: {
      className: PropTypes.string,
      onChange: PropTypes.func,
      defaultValue: PropTypes.string,
      value: PropTypes.string,
      name: PropTypes.string.isRequired
    },

    getInitialState: function() {
      return {
        selected: this.props.value || this.props.defaultValue || 0
      };
    },

    render: function() {
      return (
        React.createElement("div",
                {className: 'segmented-control ' + this.props.className},
          this.props.children.map(function(child, index) {
            var selected = (child.props || {}).value === this.state.selected ||
                            index === this.state.selected;
            return (
              React.createElement("div", {
                className: 'label' + (selected ? ' selected' : ''),
                key: "sc-" + this.props.name + index},
                React.createElement("input", {
                  type: "radio",
                  name: "sc-" + this.props.name,
                  id: "sc-" + this.props.name + index,
                  value: (child.props || {}).value || index,
                  checked: selected,
                  onChange: this.handleChange}),
                React.createElement("label", {
                  htmlFor: "sc-" + this.props.name + index},
                  child)
              )
            );
          }.bind(this)),
          React.createElement("div", {className: "clearFix"})
        )
      );
    },

    handleChange: function(e) {
      var index = e.currentTarget.value;
      this.setState({
        selected: index
      }, function() {
        if (this.props.onChange) {
          this.props.onChange(index);
        }
      }.bind(this));
    },

    componentDidMount: function() {
      if (!this.props.defaultValue && this.props.onChange) {
        this.props.onChange(this.state.selected);
      }
    },

    componentWillReceiveProps: function(nextProps) {
      if (nextProps.value || nextProps.defaultValue !== this.props.defaultValue) {
        this.setState({selected: nextProps.value || nextProps.defaultValue});
      }
    }
  });

  return SegmentedControl;
});
