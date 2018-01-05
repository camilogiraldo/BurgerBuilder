import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('[Order summary will update]');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      igElement => (
        <li key={igElement}>
          <span style={{ textTransform: "capitalize" }}>{igElement}</span>:{" "}
          {this.props.ingredients[igElement]}
        </li>
      )
    );

    return (
      <Aux>
        <h3>Your Order details</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout ?</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
