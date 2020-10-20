import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";

class Delselect extends Component {
  render() {
    return (
      <Row>
        <Button type={this.props.type} size="lg" variant="outline-dark">
          {this.props.value}
        </Button>
      </Row>
    );
  }
}

export default Delselect;
