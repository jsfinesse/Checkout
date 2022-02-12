import React from "react";

function Item({ item }) {
    return (
        <div className="item">
            <h4>{item.name}</h4>
            <img src={item.image} alt={item.name} height="100" width="100" />
            <h4><b>Price:</b> {item.price}</h4>
        </div>
    );
}

export default Item;
