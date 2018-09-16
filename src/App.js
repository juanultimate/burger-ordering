import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import burgerBuilder from './containers/BurgerBuilder'


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <burgerBuilder></burgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
