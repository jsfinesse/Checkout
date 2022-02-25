import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";

import DefaultLayout from "../components/DefaultLayout";

function CartPage() {
    const { cartItems } = useSelector((state) => state.rootReducer);
    const [subTotal, setSubTotal] = useState(0);
    const [billChargeModal, setBillChargeModal] = useState(false);
    const dispatch = useDispatch();

    const increaseQuantity = (record) => {
        dispatch({
            type: "updateCart",
            payload: { ...record, quantity: record.quantity + 1 },
        });
    };

    const decreaseQuantity = (record) => {
        if (record.quantity !== 1) {
            dispatch({
                type: "updateCart",
                payload: { ...record, quantity: record.quantity - 1 },
            });
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => (
                <img src={image} alt="" height="60" width="60" />
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Quantity",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <PlusCircleOutlined
                        className="mx-2"
                        onClick={() => increaseQuantity(record)}
                    />
                    <b>{record.quantity}</b>
                    <MinusCircleOutlined
                        className="mx-2"
                        onClick={() => decreaseQuantity(record)}
                    />
                </div>
            ),
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <DeleteOutlined
                    onClick={() =>
                        dispatch({ type: "deleteFromCart", payload: record })
                    }
                />
            ),
        },
    ];

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp += item.price * item.quantity;
        });
        setSubTotal(temp);
    }, [cartItems]);

    const onFinish = (values) => {
        const requestObject = {
            ...values,
            subTotal,
            cartItems,
            tax: Number((subTotal / 20).toFixed(2)),
            total: Number((subTotal + subTotal / 20).toFixed(2)),
            userId: JSON.parse(localStorage.getItem("checkout-user"))._id,
        };

        console.log(requestObject);
    };

    return (
        <DefaultLayout>
            <h3>Cart</h3>
            <Table columns={columns} dataSource={cartItems} bordered />
            <hr />
            <div className="d-flex justify-content-end flex-column align-items-end">
                <div className="subtotal">
                    <h3>Subtotal: {subTotal}</h3>
                </div>

                <Button type="primary" onClick={() => setBillChargeModal(true)}>
                    Confirm
                </Button>
            </div>

            <Modal
                title="Checkout"
                visible={billChargeModal}
                footer={false}
                onCancel={() => setBillChargeModal(false)}
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="paymentMode" label="Payment Mode">
                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="upi">UPI</Select.Option>
                            <Select.Option value="card">
                                Credit/Debit Card
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <div className="bill-amount">
                        <h5>Subtotal: {subTotal}</h5>
                        <h5>Tax: {(subTotal / 20).toFixed(2)}</h5>
                        <hr />
                        <h3>Total: {(subTotal + subTotal / 20).toFixed(2)}</h3>
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button htmlType="submit" type="primary">
                            Checkout
                        </Button>
                    </div>
                </Form>
            </Modal>
        </DefaultLayout>
    );
}

export default CartPage;
