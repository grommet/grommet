import '../scss/index.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import TodoAppDashboard from './components/TodoAppDashboard';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" large={true}
          pad={{horizontal: 'medium'}}>
          <Title><%= appTitle %></Title>
        </Header>
        <TodoAppDashboard />
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!
          </p>
        </Footer>
      </App>
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
