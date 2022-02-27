import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Button, Modal, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint, { useReactToPrint } from "react-to-print";

import DefaultLayout from "../components/DefaultLayout";

function Bills() {
    const componentRef = useRef();
    const [billsData, setBillsData] = useState([]);
    const [printBillModalVisible, setPrintBillModalVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const dispatch = useDispatch();

    const getAllBills = async () => {
        dispatch({ type: "showLoading" });
        try {
            const res = await axios.get("/api/bills/get-user-bills", {
                params: {
                    userId: JSON.parse(localStorage.getItem("checkout-user"))
                        ._id,
                },
            });
            dispatch({ type: "hideLoading" });
            setBillsData(res.data);
        } catch (error) {
            dispatch({ type: "hideLoading" });
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBills();
    }, []);

    const cartColumns = [
        {
            title: "Name",
            dataIndex: "name",
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
                    <b>{record.quantity}</b>
                </div>
            ),
        },
        {
            title: "Total",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <b>{record.quantity * record.price}</b>
                </div>
            ),
        },
    ];

    const columns = [
        {
            title: "Bill ID",
            dataIndex: "_id",
        },
        {
            title: "Subtotal",
            dataIndex: "subTotal",
        },
        {
            title: "Tax",
            dataIndex: "tax",
        },
        {
            title: "Total",
            dataIndex: "total",
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div className="d-flex">
                    <EyeOutlined
                        className="mx-2"
                        onClick={() => {
                            setSelectedBill(record);
                            setPrintBillModalVisible(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h3>Bills</h3>
            </div>
            <Table columns={columns} dataSource={billsData} bordered />

            {printBillModalVisible && (
                <Modal
                    onCancel={() => {
                        setPrintBillModalVisible(false);
                    }}
                    visible={printBillModalVisible}
                    title="Bill Details"
                    footer={false}
                    width={800}
                >
                    <div className="bill-modal p-3" ref={componentRef}>
                        <div className="d-flex justify-content-between bill-header pb-2">
                            <div>
                                <h2>
                                    <b>Checkout</b>
                                </h2>
                            </div>
                            <div>
                                <p>Mumbai</p>
                                <p>Contact Details: XXXXX-XXXXX</p>
                            </div>
                        </div>
                        <div className="bill-customer-details my-2">
                            <p>
                                <b>Bill ID:</b> {selectedBill._id}
                            </p>
                            <p>
                                <b>Date:</b>{" "}
                                {selectedBill.createdAt.toString().slice(0, 10)}
                            </p>
                        </div>
                        <Table
                            dataSource={selectedBill.cartItems}
                            columns={cartColumns}
                            pagination={false}
                        />

                        <div className="dotted-border mt-2 pb-2">
                            <p>
                                <b>Subtotal:</b> {selectedBill.subTotal}
                            </p>
                            <p>
                                <b>Tax:</b> {selectedBill.tax}
                            </p>
                        </div>

                        <div>
                            <h3>
                                <b>Total:</b> {selectedBill.total}
                            </h3>
                        </div>
                        <div className="dotted-border"></div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <Button type="primary" onClick={handlePrint}>
                            Print Bill
                        </Button>
                    </div>
                </Modal>
            )}
        </DefaultLayout>
    );
}

export default Bills;
