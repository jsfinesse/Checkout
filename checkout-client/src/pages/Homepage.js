import React, { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";

function Homepage() {
    const getAllItems = async () => {
        try {
            const res = await axios.get("/api/items/get-all-items");
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <DefaultLayout>
            <div>Homepage</div>
        </DefaultLayout>
    );
}

export default Homepage;
