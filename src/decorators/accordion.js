import React, { Component } from 'react';

export default OriginalComponent => class Accordion extends Component {
    state = {
      openItemId: null,
    };

    toggleOpenItem = (id) => {
      const { openItemId } = this.state;
      this.setState({
        openItemId: id === openItemId ? null : id,
      });
    };

    render() {
      const { openItemId } = this.state;
      return (
        <OriginalComponent
          {...this.props}
          toggleOpenItem={this.toggleOpenItem}
          openItemId={openItemId}
        />
      );
    }
};
