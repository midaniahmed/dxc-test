import React, { Component } from "react";
import { Alert } from "react-bootstrap";

import "./CustomAlert.scss";

export default class CustomAlert extends Component {
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss() {
    this.props.onDismiss();
  }

  render() {
    if(!this.props.isOpen) return null;
    return (
      <div className="CustomAlert">
        <Alert bsStyle={this.props.type} onDismiss={this.handleDismiss}>
          <strong>{this.props.title}</strong> {this.props.message}
        </Alert>
      </div>
    );
  }
}
