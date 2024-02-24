import React, { useEffect, useState } from "react";
import './Menu.css';
import { useNavigate } from "react-router-dom";

export function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8088/item/fetch');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (itemId, change) => {
    const newOrderList = [...orderList];
    const itemIndex = newOrderList.findIndex(item => item.itemId === itemId);
    if (itemIndex > -1) {
      const newItemQuantity = (newOrderList[itemIndex].count || 0) + change;
      if (newItemQuantity > 0) {
        newOrderList[itemIndex].count = newItemQuantity;
      } else {
        newOrderList.splice(itemIndex, 1); // Remove item from order list if quantity is 0
      }
    } else if (change > 0) {
      newOrderList.push({ itemId, count: change });
    }
    setOrderList(newOrderList);
  };

  const handleReadyToOrder = () => {
    navigate('/ReadyToOrder', { state: { selectedItems: orderList } });
  };

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Item Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.itemName}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.itemId, -1)}>-</button>
                {orderList.find(orderItem => orderItem.itemId === item.itemId)?.count || 0}
                <button onClick={() => handleQuantityChange(item.itemId, 1)}>+</button>
              </td>
              <td>Rs {item.itemPrice.toFixed(2)}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.itemId, 1)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleReadyToOrder}>Ready to Order</button>
    </div>
  );
};
