import React from "react";
import Button from "./button";
import Checkbox from "./checkbox";
import Input from "./input";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        this.state.email = value;
        errors.email =
          value === "" || validEmailRegex.test(value)
            ? ""
            : "Email is not valid!";
        break;
      case "password":
        this.state.password = value;
        errors.password =
          value.length > 0 && value.length < 8
            ? "Password must be at least 8 characters long!"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      validateForm(this.state.errors) &&
      this.state.email !== null &&
      this.state.password !== null
    ) {
      let formData = {
        email: this.state.email,
        password: this.state.password,
      };

      fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="card">
        <label className="title">Sign in</label>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-control">
            <label className="text" htmlFor="email">
              Email
            </label>
            <Input
              type="email"
              name="email"
              className={
                "form-field " + (errors.email.length > 0 ? "error " : "")
              }
              onChange={this.handleChange}
              noValidate
            />
            {errors.email.length > 0 && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-control">
            <label className="text" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              className={
                "form-field " + (errors.password.length > 0 ? "error " : "")
              }
              onChange={this.handleChange}
              noValidate
            />
            {errors.password.length > 0 && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <div className="form-control">
            <Checkbox />
          </div>
          <Button
            label="Sign in"
            onClick={this.handleSubmit}
            className={
              errors.email !== "" || errors.password !== "" ? "disabled" : ""
            }
          />
        </form>
        <p>
          <a>Forgot your password?</a>
        </p>
        <p>
          Do you have an account? <a className="signup"> Sign up</a>
        </p>
        <p>
          <a>Resend email configuration</a>
        </p>
      </div>
    );
  }
}
export default SignIn;
