//Dependencies
import React, { Component } from 'react';
//Styles
import './App.scss';
//Components
import Calendar from './components/calendar';
//Utilities
import get_data from "./util/get_data";
import months_names from "./util/months";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      months: []
    }

    this.reset_months = this.reset_months.bind(this);
    this.select_month = this.select_month.bind(this);
    this.add_month = this.add_month.bind(this);
  }
  
  componentDidMount(){
    //Load initial data
    const months = get_data();
    months.then(months => {
      //Get the hight value among the items
      const high = months.reduce( (acc, el) => acc > el.importo ? acc : el.importo, 0 );
      //Patch months to aggregate additional infos
      const mapped_months = months.map( (el, index )=> {        
        el.percent = ((el.importo * 100) / high).toFixed(1);
        el.name = months_names[index];
        return el;
      });

      this.setState({
        months: mapped_months
      })
    })
  }

  reset_months(){
    //Reset all elements to unselected
    const months = this.state.months.map(el => ({...el, selected: false}));
    this.setState({months})
  }

  select_month(month_name){
    //Reset all elements but the clicked one
    const months = this.state.months.map(el => {
      if(el.name === month_name) {
        return {...el, selected: true};
      } else {
        return {...el, selected: false};
      }
    });
    this.setState({months});
  }

  add_month(month_name) {
    //Add the month without resetting
    const months = this.state.months.map(el => {
      if(el.name === month_name) {
        return {...el, selected: true};
      }
      return el;
    });
    this.setState({months});
  }

  render() {
    return (
      <div className="App">
        <h1>
          Andamento Mensile
        </h1>
        <Calendar months={this.state.months} reset_months={this.reset_months} select_month={this.select_month} add_month={this.add_month}/>
      </div>
    );
  }
}

export default App;
