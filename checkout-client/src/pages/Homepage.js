import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import {Row, Col} from "antd";
import Item from "../components/Item";
import "../resources/item.css";

function Homepage() {
    const [itemsData, setItemsData] = useState([]);

    const getAllItems = async () => {
        try {
            const res = await axios.get("/api/items/get-all-items");
            setItemsData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <DefaultLayout>
            <Row gutter={20}>
                {itemsData.map((item) => {
                    return <Col xs={24} lg={6} md={12} sm={6}>
                        <Item item={item} />
                    </Col>
                })}
            </Row>
        </DefaultLayout>
    );
}

export default Homepage;
