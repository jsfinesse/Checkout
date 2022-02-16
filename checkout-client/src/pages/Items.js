import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import DefaultLayout from "../components/DefaultLayout";
import "../resources/item.css";

function Items() {
    const [itemsData, setItemsData] = useState([]);
    const [addEditModalVisible, setAddEditModalVisible] = useState(false);
    const dispatch = useDispatch();

    const getAllItems = async () => {
        dispatch({ type: "showLoading" });
        try {
            const res = await axios.get("/api/items/get-all-items");
            dispatch({ type: "hideLoading" });
            setItemsData(res.data);
        } catch (error) {
            dispatch({ type: "hideLoading" });
            console.log(error);
        }
    };

    useEffect(() => {
        getAllItems();
    });

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
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div className="d-flex">
                    <DeleteOutlined className="mx-2" />
                    <EditOutlined className="mx-2" />
                </div>
            ),
        },
    ];

    const onFinish = async (values) => {
        dispatch({ type: "showLoading" });
        try {
            const res = await axios.post("/api/items/add-item", values);
            dispatch({ type: "hideLoading" });
        } catch (error) {
            dispatch({ type: "hideLoading" });
            console.log(error);
        }
    };

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
            <Table columns={columns} dataSource={itemsData} bordered />

            <Modal
                onCancel={() => setAddEditModalVisible(false)}
                visible={addEditModalVisible}
                title="Add Item"
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price">
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Image URL">
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Category">
                        <Select>
                            <Select.Option value="fruits">Fruits</Select.Option>
                            <Select.Option value="vegetables">
                                Vegetables
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <div className="d-flex jutify-content-end">
                        <Button htmlType="submit" type="primary">
                            SAVE
                        </Button>
                    </div>
                </Form>
            </Modal>
        </DefaultLayout>
    );
}

export default Items;
