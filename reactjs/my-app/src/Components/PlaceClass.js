import { Component, createRef } from "react";

class YourComponent extends Component {
  constructor(props) {
    super(props);
    this.autoCompleteRef = createRef();
    this.inputRef = createRef();
    this.options = {
      componentRestrictions: { country: "In" },
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["(regions)"],
    };
  }

  componentWillUnmount() {
    // do something
    this.autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      this.inputRef.current,
      this.options
    );
  }

  render() {
    return (
      <div>
        <label>enter address :</label>
        <input ref={this.inputRef} />
      </div>
    );
  }
}

export default YourComponent;
