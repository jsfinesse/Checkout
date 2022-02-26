import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import DefaultLayout from "../components/DefaultLayout";
import "../resources/item.css";

function Bills() {
    const [billsData, setBillsData] = useState([]);
    const [addEditModalVisible, setAddEditModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
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
                    <EyeOutlined className="mx-2" onClick={() => {}} />
                </div>
            ),
        },
    ];

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h3>Items</h3>
                <Button
                    type="primary"
                    onClick={() => setAddEditModalVisible(true)}
                >
                    Add Item
                </Button>
            </div>
            <Table columns={columns} dataSource={billsData} bordered />

            {addEditModalVisible && (
                <Modal
                    onCancel={() => {
                        setEditingItem(null);
                        setAddEditModalVisible(false);
                    }}
                    visible={addEditModalVisible}
                    title={`${editingItem !== null ? "Edit Item" : "Add Item"}`}
                    footer={false}
                ></Modal>
            )}
        </DefaultLayout>
    );
}

export default Bills;
