import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import DefaultLayout from "../components/DefaultLayout";

function Items() {
    const [itemsData, setItemsData] = useState([]);
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
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Category",
            dataIndex: 'category'
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

    return <DefaultLayout>
        <h3>Items</h3>
        <Table columns={columns} dataSource={itemsData} bordered />
    </DefaultLayout>;
}

export default Items;
