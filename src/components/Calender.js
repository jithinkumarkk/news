import React from "react"; 
import './calender.css'; 
import { Form } from "semantic-ui-react";
import {
  DateInput 
} from "semantic-ui-calendar-react";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: new Date()
    };
  }
 
  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ 
        [name]: value,
        searchDate :value
      });
      //alert(value);
      this.props.searchByDate(value);
      //alert(this.state.searchDate);
    }
  };
   
  render() {
    return (
      <Form>
        <DateInput
          name="date"
          placeholder="Date"
          value={this.state.date}
          iconPosition="left"
          onChange={this.handleChange}
        />
      </Form>
    );
  }
}
