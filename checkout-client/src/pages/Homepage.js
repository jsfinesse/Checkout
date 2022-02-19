import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";

import DefaultLayout from "../components/DefaultLayout";
import Item from "../components/Item";
import "../resources/item.css";

function Homepage() {
    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("fruits");
    const categories = [
        {
            name: "fruits",
            imageURL:
                "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2021%2F11%2F03%2F61129_Prep_Smoothies_030_preview-2000.jpg&q=60",
        },
        {
            name: "vegetables",
            imageURL:
                "https://cdn.mos.cms.futurecdn.net/XM8scaSf7gWsiN9jjowikf.jpg",
        },
    ];
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

    return (
        <DefaultLayout>
            <div className="d-flex">
                {categories.map((category) => {
                    return (
                        <div
                            onClick={() => setSelectedCategory(category.name)}
                            className={`d-flex category ${
                                selectedCategory === category.name &&
                                "selected-category"
                            }`}
                        >
                            <h4>{category.name}</h4>
                            <img
                                src={category.imageURL}
                                alt="category icon"
                                height="60"
                                width="80"
                            />
                        </div>
                    );
                })}
            </div>
            <Row gutter={20}>
                {itemsData
                    .filter((i) => i.category === selectedCategory)
                    .map((item) => {
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
