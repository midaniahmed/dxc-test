import React, { Component } from "react";

import "./MainLayout.scss";

class MainLayout extends Component {
  render() {
    return (
      <div className="MainLayout">
        <div className="header-container">
          <header className="header">
            <div className="flex-1" />
            <div className="flex-1 display-flex-center">
              <div className="header-text">smartphones offers</div>
            </div>
            <div className="flex-1 display-flex-end">
              <div className="header-text mr-3">
                <i className="material-icons">smartphone</i>
              </div>
            </div>
          </header>
        </div>
        <div className="main-container">
          <div className="content" style={{ height: "calc(100% - 120px)" }}>
            <div className="m-2">{this.props.children}</div>
          </div>
        </div>
        <div className="footer-container">
          <footer className="footer">
            <div className="footer-text">© Credits 2099</div>
          </footer>
        </div>
      </div>
    );
  }
}

export default MainLayout;
