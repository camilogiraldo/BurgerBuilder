import React, { Component } from "react";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({
      controls: updatedControls
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.authenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  render() {
    const formsElementsArray = [];
    for (let key in this.state.controls) {
      formsElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formsElementsArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
      {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success"> Submit </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
