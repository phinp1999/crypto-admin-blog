import React from "react";
import Tilt from "react-tilt";
import { Input, Button, Form } from "antd";
import { useHistory } from "react-router-dom";
import Logo from "../../images/login/logo-2.png";
import { connect } from "react-redux";
import { loginUser } from "redux/actions/user";
import {Loader } from "components/UI";
import { IAppState } from "redux/store/types";
interface ILoginProps {
  loginUser: (value: any, history: any) => void;
  auth:any
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const [value, setValue] = React.useState({ email: "", password: "" });
  const onChange = (e) => {
    let { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let history: any = useHistory();
  const submit = (e) => {
    e.preventDefault();
    if (value.email != "" && value.password != "") {
      props.loginUser(value, history);
    }
  };
  return (
    <React.Fragment>
      <Loader spinning={props.auth.isLoading} statusOpacity={true} />
      <div className="login-wolves">
        <div className="container">
          <div className="wrapper">
            <Tilt
              className="logo-wolves Tilt"
              options={{ scale: 1.1, perspective: 500, max: 25 }}
            >
              <img className="Tilt-inner" src={Logo} alt="logo" />
            </Tilt>
            <Form className="login-form">
              <span className="login-form-title">Member Login</span>
              <div className="wrap-input">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true,type: 'email', message: "Please input your email!" },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Email" name="email" onChange={onChange} />
                </Form.Item>
              </div>
              <div className="wrap-input">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                  />
                </Form.Item>
              </div>
              <Form.Item className="container-login-form-btn">
                <Button
                  onClick={submit}
                  className="login-form-btn"
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
              <div className="wrap-login-form-forgot">
                <span>Forgot </span>
                <a className="forgot-text" href="true">
                  Username / Password?
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state: IAppState) => ({
  auth: state.user,
});

export default connect(mapStateToProps, {
  loginUser,
})(Login);
