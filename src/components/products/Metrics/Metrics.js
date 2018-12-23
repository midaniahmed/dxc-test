import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { ProductCell } from "../ProductCell";

import "./Metrics.scss";

export default class Metrics extends Component {
  findProduct(array, value) {
    return array.find(list => list.name === value);
  }

  getBestproduct(data) {
    const minAmount =  data.reduce((min, p) => (p.amount < min ? p.amount : min), data[0]);
    const minAmountList = data.filter(it => { return it.amount === minAmount });
    if (minAmountList.length) {
      return minAmountList[minAmountList.length - 1];
    } else return null;
  }

  render() {
    const lease = this.props.lease;
    const dimensions = this.props.dimensions;
    const best = this.getBestproduct(dimensions.data);
    return (
      <div className="Metrics">
        <Row>
          <Col md={3} />
          <Col md={9} className="display-flex-start">
            {dimensions.columns.map((c, i) => {
              return (
                <div key={i + 1} className="flex-1 text-center">
                  {c}
                </div>
              );
            })}
          </Col>
        </Row>
        {dimensions.rows.map((r, j) => {
          return (
            <Row key={j + 1}>
              <Col md={3}>{r}</Col>
              <Col md={9} className="display-flex-start">
                {Array(dimensions.columns.length)
                  .fill()
                  .map((_, idx) => {
                    const col = this.findProduct(
                      lease,
                      dimensions.columns[idx]
                    );
                    const product = this.findProduct(
                      col.model,
                      dimensions.rows[j]
                    );
                    return (
                      <div key={idx + 1} className="flex-1">
                        <ProductCell key={j + 1} item={product} best={best} model={dimensions.rows[j]} duration={dimensions.columns[idx]} />
                      </div>
                    );
                  })}
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
