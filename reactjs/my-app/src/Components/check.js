import { Col, Row, Select, Tooltip, Form, Space, Button, Input } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Header from "../../layouts/Header";
import {
  MinusCircleOutlined,
  CheckOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { createJob } from "../../../actions/jobAction";
import { getDelievryAgents } from "../../../actions/DeliveryAgent";
import { getVehicleNumber } from "../../../actions/VehicleNumber";
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
    this.onSubmit = this.onSubmit.bind(this);
  }
  getData = (name) => {
    if (name == "agent") this.props.getDelievryAgents();
    if (name == "vehicle") this.props.getVehicleNumber();
  };

  handleChangeAgent = (key, value) => {
    let agentId = value.value;
    let agentName = value.name;
    this.setState({
      agentId: agentId,
      agentName: agentName,
    });
  };

  handleChangeVehicle = (key, value) => {
    let vehicalId = value.value;
    let vehicalNumber = value.name;
    this.setState({
      vehicalId: vehicalId,
      vehicalNumber: vehicalNumber,
    });
  };

  onChangestopPoint = (deliveryPoints) => {
    console.log("in the on change point ", deliveryPoints);
    this.setState({ deliveryPoint: deliveryPoints }, () => {});
  };

  ondeliveryPointAdd = (deliveryPoints) => {
    console.log("in the on change point ", deliveryPoints);
    // this.setState({ deliveryPointL: deliveryPoints }, () => {});
    this.setState({
      coordinate: [...this.state.coordinate, deliveryPoints],
    });
  };

  onChange(event, b) {
    console.log("done done", JSON.stringify(b));
    this.setState({ [event.target.name]: event.target.value });
  }

  onCoordinateChange(event) {
    if (event.checkSearchBar1 == "true") {
      console.log("hello in the onchage checkbar");
      this.setState({
        checkSearchBar1: true,
        checkSearchBar: false,
        checkSearchBar2: false,
      });

      this.setState({ [event.e.target.name]: event.e.target.value });
      this.handleScriptLoad();
    }
    if (event.checkSearchBar == "true") {
      console.log("hello in the onchage checkbar");
      this.setState({
        checkSearchBar: true,
        checkSearchBar1: false,
        checkSearchBar2: false,
      });
      this.setState({ [event.e.target.name]: event.e.target.value });
      this.handleScriptLoad();
    }
  }

  onDeliveryPoint = (event) => {
    console.log("delivery event", event);
    console.log("this.state.query", this.state.querydelivery);
    if (event.checkSearchBar2 == "true") {
      console.log("hello in the onchage checkbar2", event.e);
      this.setState({
        checkSearchBar: false,
        checkSearchBar1: false,
        checkSearchBar2: true,
      });
      this.setState({ [event.e.target.name]: event.e.target.value });
      this.handleScriptLoad(event.restField.fieldKey);
    }
  };

  onSubmit(values) {
    var deliveryPoints = [];
    console.log("values.stopPoint", values.deliveryPoints);
    // if (values.stopPoint) {
    //   const promises = values.stopPoint.map(async (element) => {
    //     const stopPoint = await getLatLng(element.location);
    //     return stopPoint;
    //   });

    //   stopPoints = await Promise.all(promises);
    // }
    let deliveryPoint = values.deliveryPoints;
    let coordinat = this.state.coordinate;
    for (let i = 0; i < deliveryPoint.length; i++) {
      deliveryPoint[i].deliveryPoint = coordinat[i];
    }
    console.log("#the final delivery points", deliveryPoint);
    console.log("#state", this.state);
    let newTrackerObj = {
      agentName: this.state.agentName,
      vehicleNumber: this.state.vehicalNumber,
      startLocation: this.state.source,
      endLocation: this.state.destination,
      jobCompletionStatus: false,
      deliveryPoints: deliveryPoint,
    };
    console.log("#newTrackerObj", newTrackerObj);
    this.props.createJob(newTrackerObj);
  }

  handleScriptLoad = (id) => {
    // Declare Options For Autocomplete
    const options = {
      types: ["(regions)"],
      componentRestrictions: { country: "in" },
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors

    console.log(
      "handleScriptLoad call checkSearchBar1",
      this.state.checkSearchBar1
    );
    console.log(
      "handleScriptLoad call checkSearchBar ",
      this.state.checkSearchBar
    );
    console.log(
      "handleScriptLoad call checkSearchBar2 ",
      this.state.checkSearchBar2
    );
    if (this.state.checkSearchBar == true) {
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
    }
    console.log("id", id);
    if (this.state.checkSearchBar1 == true) {
      console.log("handlescript checkSearchBar1");
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocompletee"),
        options
      );
      this.setState({
        fillQuery: false,
      });
      // this.setState({checkSearchBar1:false})
      this.autocomplete.setFields(["address_components", "formatted_address"]);

      // Fire Event when a suggested name is selected
      this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    }

    if (this.state.checkSearchBar2 == true) {
      // console.log("autocomplete",document.getElementById('autocomplete'))
      console.log("in the handelscript and id is  ", id);
      this.autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("id" + id),
        options
      );

      // this.setState({
      //   fillQuery: true,
      // });
      // this.setState({checkSearchBar:false})
      this.autocomplete.setFields(["address_components", "formatted_address"]);

      // Fire Event when a suggested name is selected
      this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
    }

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
  };

  handlePlaceSelect = async (id) => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    //  alert("handle call");
    // Check if address is valid
    console.log("address obj", addressObject);
    console.log("this.state.checkSearchBar", this.state.checkSearchBar);
    console.log("this.state.checkSearchBar2", this.state.checkSearchBar2);
    console.log("this.state.checkSearchBar1", this.state.checkSearchBar1);
    if (addressObject) {
      const address = addressObject.address_components;
      if (address && this.state.checkSearchBar) {
        // Set State

        this.setState({
          city: address[0].long_name,
          querySource: addressObject.formatted_address,
        });
        console.log(await this.callfun(address));
      }
      if (address && this.state.checkSearchBar1) {
        // Set State
        this.setState(
          {
            city: address[0].long_name,
            queryDestination: addressObject.formatted_address,
          },
          console.log(this.callfun(address))
        );
      }

      if (address && this.state.checkSearchBar2) {
        // Set State
        let deliveryNamee = "deliveryName" + id;
        this.setState({
          city: address[0].long_name,
          querydelivery: addressObject.formatted_address,
        });
        console.log(
          await this.callfun(address, addressObject),
          "in this checkbar set state",
          this.state.querydelivery
        );
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

        if (this.state.checkSearchBar) {
          console.log(" in this checkbar");
          this.setState({
            source: {
              lat: json.results[0].geometry.location.lat,
              lng: json.results[0].geometry.location.lng,
            },
            checkSearchBar2: false,
            checkSearchBar: false,
            checkSearchBar1: false,
          });
        } else if (this.state.checkSearchBar1) {
          console.log(" in this else");
          this.setState({
            destination: {
              lat: json.results[0].geometry.location.lat,
              lng: json.results[0].geometry.location.lng,
            },
            checkSearchBar2: false,
            checkSearchBar: false,
            checkSearchBar1: false,
          });
        } else if (this.state.checkSearchBar2) {
          console.log(" in this checkbar2");
          this.setState(
            {
              deliveryPoint: {
                lat: json.results[0].geometry.location.lat,
                lng: json.results[0].geometry.location.lng,
              },
              checkSearchBar2: false,
              checkSearchBar: false,
              checkSearchBar1: false,
            },
            () => {
              this.ondeliveryPointAdd(this.state.deliveryPoint);
            }
          );
        }
      });
  };

  render() {
    const initialValues = {
      deliveryPoints: [
        { deliveryPoint: undefined }, // undefined will render the placeholder
      ],
    };

    let agentOptions = this.props.deliveryAgents.map((agent) => {
      return (
        <Option name={agent.userName} value={agent._id}>
          {agent.userName}
        </Option>
      );
    });
    let vehicleOptions = this.props.vehicleNumbers.map((vehicle) => {
      return (
        <Option name={vehicle.vehicleNumber} value={vehicle._id}>
          {vehicle.vehicleNumber}
        </Option>
      );
    });

    return (
      <div>
        <Header />
        <div className="add-job">
          <div className="container-fluid">
            <Row className="title-row">
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="page-header mx-4 mt-4">Create Job</div>
              </Col>
            </Row>
            <div className="card mx-4 mt-4">
              <div className="card-body" style={{ marginBottom: "-30px" }}>
                <Form
                  name="add"
                  className="add"
                  onFinish={this.onSubmit}
                  initialValues={initialValues}
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Tooltip title="Delivery Agent">
                        <Form.Item
                          name="agent"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Delivery Point !",
                            },
                          ]}
                        >
                          <Select
                            name="agentName"
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select Delivery Agent"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                              optionA.children
                                .toLowerCase()
                                .localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={this.handleChangeAgent}
                            onClick={() => this.getData("agent")}
                            onInputKeyDown={() => this.getData("agent")}
                          >
                            {agentOptions}
                          </Select>
                        </Form.Item>
                      </Tooltip>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Tooltip title="Vechical Number">
                        <Form.Item
                          name="vehicalNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Vehical Number!",
                            },
                          ]}
                        >
                          <Select
                            name="vehicalNumber"
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select Vechical Number"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                              optionA.children
                                .toLowerCase()
                                .localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={this.handleChangeVehicle}
                            onClick={() => this.getData("vehicle")}
                            onInputKeyDown={() => this.getData("vehicle")}
                          >
                            {vehicleOptions}
                          </Select>
                        </Form.Item>
                      </Tooltip>
                    </Col>
                  </Row>
                  <Row gutter={[16, 0]}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Tooltip title="Delivery Agent">
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
                              checkSearchBar: "true",
                            });
                          }}
                        />
                      </Tooltip>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Tooltip title="Destination">
                        <Input
                          id="autocompletee"
                          placeholder="Search Destination City"
                          value={this.state.queryDestination}
                          name="queryDestination"
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            this.onCoordinateChange({
                              e,
                              checkSearchBar1: "true",
                            })
                          }
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                  <Form.List name="deliveryPoints">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Row key={key} gutter={[16, 0]} className="mt-3">
                            <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                              {(() => {
                                if (key == 0) {
                                  return <CheckCircleOutlined />;
                                } else {
                                  return (
                                    <MinusCircleOutlined
                                      onClick={() => {
                                        remove(name);
                                      }}
                                    />
                                  );
                                }
                              })()}
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                              <Form.Item
                                {...restField}
                                name={[name, "deliveryPoint"]}
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Missing location name",
                                //   },
                                // ]}
                              >
                                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBeKyA0aoZcYav1X1sVt1tJLPehRPDhXs&libraries=places" />
                                <Input
                                  id={"id" + restField.fieldKey}
                                  placeholder="Select a Destination address"
                                  style={{ width: "100%" }}
                                  name="deliveryName"
                                  // value={this.state.querydelivery+restField.fieldKey}
                                  // value={
                                  //   this.state[
                                  //     "deliveryName" + "" + restField.fieldkey
                                  //   ]
                                  // }
                                  value={
                                    this.state.querydelivery == ""
                                      ? this.state.querydelivery
                                      : this.state[
                                          "deliveryName" + restField.key
                                        ]
                                  }
                                  allowClear
                                  onChange={(e) => {
                                    this.onDeliveryPoint({
                                      e,
                                      checkSearchBar2: "true",
                                      restField,
                                    });
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                              <Form.Item
                                {...restField}
                                name={[name, "itemName"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter Item Name",
                                  },
                                ]}
                              >
                                <Input
                                  id={restField.key}
                                  placeholder="Enter Item Name"
                                  name="itemName"
                                  value={this.state["itemName" + restField.key]}
                                  onChange={(e) => this.onChange(e, restField)}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                              <Form.Item
                                {...restField}
                                name={[name, "quantity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter Quantity",
                                  },
                                ]}
                              >
                                <Input
                                  id={restField.key}
                                  placeholder="Enter Quantity"
                                  name="quantity"
                                  value={this.state["quantity" + restField.key]}
                                  onChange={(e) =>
                                    this.onChange(e, "quantity" + restField.key)
                                  }
                                  type="number"
                                  min="0"
                                  step="1"
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                              <Form.Item
                                {...restField}
                                name={[name, "address"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Enter Address",
                                  },
                                ]}
                              >
                                <Input
                                  id={restField.key}
                                  placeholder="Enter Address"
                                  name="address"
                                  value={this.state["address" + restField.key]}
                                  onChange={(e) =>
                                    this.onChange(e, "address" + restField.key)
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            className="mt-3"
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            block
                          >
                            Add Delivery Points
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="close-modal"
                          block
                        >
                          Create Job Card
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TestJob.propTypes = {
  createJob: PropTypes.func.isRequired,
  getDelievryAgents: PropTypes.func.isRequired,
  getVehicleNumber: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => (
  console.log("state", state),
  {
    deliveryAgents: state.deliveryAgentData.deliveryAgents,
    vehicleNumbers: state.vehicleNumberData.vehicleNumbers,
  }
);
export default connect(mapStateToProps, {
  createJob,
  getDelievryAgents,
  getVehicleNumber,
})(TestJob);
