import { Col, Row, Select, Tooltip, Form, Space, Button, Input } from "antd";
import React, { Component } from "react";

import Script from "react-load-script";
const { Option } = Select;

class TestJob extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      deliveryPoints: {
        lat: "",
        lng: "",
      },
      destination: {
        lat: "",
        lng: "",
      },
      source: {
        lat: "",
        lng: "",
      },
      quantity: "",
      address: "",
      itemName: "",
      agentName: "",
      agentId: "",
      vehicalNumber: "",
      vehicalRegistration: "",
      vehicalId: "",
      checkSearchBar: false,
      checkSearchBar1: false,
      checkSearchBar2: false,
      querySource: "",
      queryDestination: "",
      querydelivery: "false",
      deliveryName: "",
      deliveryPoint: "",
      fillQuery: false,
      coordinate: [],
      deliveryPointName: [],
    };
    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event, b) {
    console.log("done done", JSON.stringify(b));
    this.setState({ [event.target.name]: event.target.value });
  }

  onCoordinateChange(event) {
    this.setState({ [event.e.target.name]: event.e.target.value });
    this.handleScriptLoad();
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(regions)"],
      componentRestrictions: { country: "in" },
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors

    // console.log("autocomplete",document.getElementById('autocomplete'))
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );
    this.setState({
      fillQuery: true,
    });
    // this.setState({checkSearchBar:false})
    this.autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
  };

  handlePlaceSelect = async () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    //  alert("handle call");
    // Check if address is valid
    console.log("address obj", addressObject);

    if (addressObject) {
      const address = addressObject.address_components;
      if (address) {
        // Set State

        this.setState({
          city: address[0].long_name,
          querySource: addressObject.formatted_address,
        });
        console.log(await this.callfun(address));
      }
    } else {
      console.log("please Select the place ");
    }
  };

  callfun = async (address) => {
    // alert("hello");
    await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address[0].long_name +
        "&key=" +
        "AIzaSyBBeKyA0aoZcYav1X1sVt1tJLPehRPDhXs"
    )
      .then((res) => res.json())
      .then(async (json) => {
        console.log(json.results[0].geometry.location);
      });
  };

  render() {
    return (
      <div>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBeKyA0aoZcYav1X1sVt1tJLPehRPDhXs&libraries=places" />
        <Input
          id="autocomplete"
          placeholder="Search Source City"
          style={{ width: "100%" }}
          value={this.state.querySource}
          name="querySource"
          onChange={(e) => {
            this.onCoordinateChange({
              e,
            });
          }}
        />
      </div>
    );
  }
}

export default TestJob;
