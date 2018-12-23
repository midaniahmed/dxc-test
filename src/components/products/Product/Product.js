import moment from "moment";
import React, { Component } from "react";
import { CustomCard } from "../../shared/CustomCard";
import Metrics from "../Metrics";

import "./Product.scss";

export default class Product extends Component {
  getDimensions(lease) {
    let columns = [];
    let rows = [];
    let data = [];
    lease.forEach(it => {
      columns.push(it.name);
      it.model.forEach(item => {
        if (item.price)
          data.push({
            amount: item.price.amount,
            model: item.name,
            duration: it.name,
          });
        if (!rows.includes(item.name)) {
          rows.push(item.name);
        }
      });
    });

    return { columns, rows, data };
  }

  render() {
    const item = this.props.item;
    return (
      <div className="Product">
        <CustomCard
          title={item.name}
          time={moment(item.offerTime).format("DD.MM.YYYY")}
        >
          <Metrics
            lease={item.lease}
            dimensions={this.getDimensions(item.lease)}
          />
        </CustomCard>
      </div>
    );
  }
}
