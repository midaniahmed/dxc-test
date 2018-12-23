import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProducts } from "../../../actions/productActions";
import { clearAlert } from "../../../actions/notificationActions";
import CustomAlert from "../../shared/CustomAlert";
import { CustomButton } from "../../shared/CustomButton";
import { CustomSpinner } from "../../shared/CustomSpinner";
import Product from "../Product";

import "./ProductsContext.scss";

const actions = { loadProducts, clearAlert };
class ProductsContext extends Component {
  componentWillMount() {
    this.props.loadProducts();
  }

  render() {
    const { isLoading, products, alert } = this.props;
    return (
      <div className="ProductsContext">
        <CustomAlert
          onDismiss={this.props.clearAlert}
          type={(alert && alert.type) || "info"}
          isOpen={(alert && alert.isOpen) || false}
          title={(alert && alert.title)}
          message={(alert && alert.message)}
        />
        <CustomSpinner isLoading={isLoading} />
        {!isLoading && (
          <div>
            <div className="display-flex-center">
              <CustomButton
                label="Refresh"
                icon="refresh"
                onClick={this.props.loadProducts}
              />
            </div>
            <div className="products-container">
              {products.map((product, index) => (
                <Product key={index + 1} item={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.products.loading,
    products: state.products.all,
    error: state.products.error,
    alert: state.notifications.alert,
  };
}
export default connect(mapStateToProps, actions)(ProductsContext);
