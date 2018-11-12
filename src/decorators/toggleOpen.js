import React, { Component } from 'react';

export default OriginalComponent => class WrappedComponent extends Component {
    state = {
      isOpen: false,
    };

    toggleOpen = () => {
      const { isOpen } = this.state;
      this.setState({
        isOpen: !isOpen,
      });
    };

    render() {
      const { isOpen } = this.state;
      return <OriginalComponent {...this.props} isOpen={isOpen} toggleOpen={this.toggleOpen} />;
    }
};
