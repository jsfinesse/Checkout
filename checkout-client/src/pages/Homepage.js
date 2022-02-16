import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";

import DefaultLayout from "../components/DefaultLayout";
import Item from "../components/Item";
import "../resources/item.css";

function Homepage() {
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
    });

    return (
        <DefaultLayout>
            <Row gutter={20}>
                {itemsData.map((item) => {
                    return (
                        <Col xs={24} lg={6} md={12} sm={6}>
                            <Item item={item} />
                        </Col>
                    );
                })}
            </Row>
        </DefaultLayout>
    );
}

export default Homepage;
