import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment() 
    };
  }

  render() {
    return (
        <div>
        <DatePicker
            selected={this.state.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart.bind(this)}
            monthsShown={2}
            minDate={moment()}
        />
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd.bind(this)}
            monthsShown={2}
            minDate={moment()}
        />
        </div>
    );
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }
}

export default Calendar;
