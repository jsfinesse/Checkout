import React from "react";
import { Button, Form, Input, message, Row, Col } from "antd";
import { Link } from "react-router-dom";

import "../resources/authentication.css";

function Register() {
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
                        <h4>Register</h4>
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="userid" label="User ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type="password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/login">
                                Already register? Click here to login
                            </Link>
                            <Button htmlType="submit" type="primary">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Register;