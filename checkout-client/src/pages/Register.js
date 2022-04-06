import React, { useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../resources/authentication.css";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        dispatch({ type: "showLoading" });
        try {
            await axios.post("/api/users/register", values);
            dispatch({ type: "hideLoading" });
            message.success(
                "Registered successfully, please continue to login!"
            );
            navigate("/login");
        } catch (error) {
            dispatch({ type: "hideLoading" });
            message.error("Something went wrong :(");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("checkout-user")) {
            navigate("/home");
        }
    }, []);

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
                        <Form.Item name="userId" label="User ID">
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
