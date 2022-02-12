import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import {Row, Col} from "antd";
import Item from "../components/Item";

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
            <Row>
                {itemsData.map((item) => {
                    return <Col span={6}>
                        <Item item={item} />
                    </Col>
                })}
            </Row>
        </DefaultLayout>
    );
}

export default Homepage;
