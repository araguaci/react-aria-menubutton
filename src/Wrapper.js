const React = require('react');
const PropTypes = require('prop-types');
const createManager = require('./createManager');
const ManagerContext = require('./ManagerContext');
const { refType } = require("./propTypes");
const specialAssign = require('./specialAssign');

const checkedProps = {
  children: PropTypes.node.isRequired,
  forwardedRef: refType,
  onMenuToggle: PropTypes.func,
  onSelection: PropTypes.func,
  closeOnSelection: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  tag: PropTypes.string
};

class AriaMenuButtonWrapper extends React.Component {
  static propTypes = checkedProps;
  static defaultProps = { tag: 'div' };

  constructor(props) {
    super(props);
    this.manager = createManager({
      onMenuToggle: this.props.onMenuToggle,
      onSelection: this.props.onSelection,
      closeOnSelection: this.props.closeOnSelection,
      closeOnBlur: this.props.closeOnBlur,
      id: this.props.id
    });
  }

  render() {
    const wrapperProps = {};
    specialAssign(wrapperProps, this.props, checkedProps);

    return React.createElement(
      ManagerContext.Provider,
      { value: this.manager },
      React.createElement(
        this.props.tag,
        wrapperProps,
        this.props.children,
      ),
    );
  }
}

module.exports = React.forwardRef((props, ref) => {
  const wrapperProps = { forwardedRef: ref };
  specialAssign(wrapperProps, props, { children: checkedProps.children, forwardedRef: checkedProps.forwardedRef });
  specialAssign(wrapperProps, { forwardedRef: ref });
  return React.createElement(AriaMenuButtonWrapper, wrapperProps, props.children);
});
