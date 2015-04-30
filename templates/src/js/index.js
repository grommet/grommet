require("../scss/index.scss");

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Section = require('grommet/components/Section');
var Donut = require('grommet/components/Donut');
var Table = require('grommet/components/Table');
var Status = require('grommet/components/icons/Status');

function getLabel(label, count, colorIndex) {
	return {
    "label": label,
    "value": count,
    "units": count > 1 ? "Tasks" : 'Task',
    "colorIndex": colorIndex
  };
}

var TodoAppDashboard = React.createClass({

  render: function () {
  	
	  var tasksMap = {
	  	error: 0,
	  	ok: 0,
	  	warning: 0
	  };

  	var items = this.props.tasks.map(function(task) {
  		
  		tasksMap[task.type] += 1;

  		return (
  			<tr>
  			  <td><Status value={task.type} small={true} /></td>
  				<td>{task.item}</td>
  			</tr>
  		);
  	});

    return (
      <Tiles>
      	<Tile>
      		<Section centered={true}>
      			<Donut series={[
      				getLabel('Fix Now', tasksMap.error, "error"),
      				getLabel('Remember', tasksMap.warning, "warning"),
      				getLabel('Enjoy', tasksMap.ok, "ok")
						]} />
      		</Section>
      	</Tile>
      	<Tile>
      		<Header><h3>My Tasks:</h3></Header>
	        <Table>
	        	<tbody>
	        		{items}
	        	</tbody>
	        </Table>
      	</Tile>
      </Tiles>
    );
  }
});

var App = React.createClass({
	getInitialState: function() {
		return {
			tasks: [
		  	{
		  		type: 'error',
		  		item: 'The coffee pot needs to be cleaned.'
		  	},
		  	{
		  		type: 'ok',
		  		item: 'It\'s going to be a sunny day tomorrow.'
		  	},
		  	{
		  		type: 'warning',
		  		item: 'Don\'t forget your anniversary in two weeks.'
		  	},
		  	{
		  		type: 'warning',
		  		item: 'Pay my late bills.'
		  	},
		  	{
		  		type: 'ok',
		  		item: 'Go to the Sharks game tomorrow.'
		  	},
		  	{
		  		type: 'ok',
		  		item: 'Go to Santa Cruz, it\'s summer time.'
		  	},
	  	]
		};
	},
  render: function() {
    return (
      <App centered={false}>
        <Header primary={true}>
          <Title><%= appTitle %></Title>
        </Header>
        <TodoAppDashboard tasks={this.state.tasks} />
      </App>
    );
  }
});

var element = document.getElementById('content');
React.render(React.createElement(App), element);

document.body.classList.remove('loading');