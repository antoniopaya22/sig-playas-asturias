/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li><a href="https://github.com/dcabalfe">Daniel Cabal</a></li>
              <li><a href="https://github.com/antonioalfa22">Antonio Payá</a></li>
              <li><a href="https://github.com/albact7">Alba Cotarelo</a></li>
            </ul>
          </nav>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
