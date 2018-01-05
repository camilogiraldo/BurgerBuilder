import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BuilderBuilder from './containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <BuilderBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
