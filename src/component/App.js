// @flow

import React, { PropTypes } from 'react';

const styles = {
  app: {
    display: 'flex',
    height: '100%',
  },
};

const App = ({ children }: { children: any }) => (
  <div style={styles.app}>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
