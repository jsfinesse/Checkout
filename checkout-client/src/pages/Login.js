import React from "react";
import { Button, Form, Input, message, Row, Col } from "antd";
import { Link } from "react-router-dom";

import "../resources/authentication.css";

function Login() {
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <div className="authentication">
            <Row>
                <Col lg={8} xs={22}>
                    <Form layout="vertical" onFinish={onFinish}>
                        <h2>
                            <b>Checkout</b>
                        </h2>
                        <hr />
                        <h4>Login</h4>
                        <Form.Item name="userid" label="User ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type="password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/register">
                                New user? Click here to register
                            </Link>
                            <Button htmlType="submit" type="primary">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
