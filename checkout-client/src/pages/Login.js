import React, { useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, message, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../resources/authentication.css";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        dispatch({ type: "showLoading" });
        try {
            const res = await axios.post("/api/users/login", values);
            dispatch({ type: "hideLoading" });
            message.success("Login successfull");
            localStorage.setItem("checkout-user", JSON.stringify(res.data));
            navigate("/home");
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
                        <h4>Login</h4>
                        <Form.Item name="userId" label="User ID">
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
