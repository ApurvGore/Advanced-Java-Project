import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap"; // Assuming you're using React Bootstrap for styling

export function ReadyToOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems } = location.state; // Retrieve the state passed from the Menu component

  const handlePlaceOrder = async () => {
    const employeeId = localStorage.getItem("employeeId"); // Retrieve employeeId from local storage
    // Ensure selectedItems is formatted as required by your backend
    const requestBody = selectedItems.map(item => ({
      order: { order_id: 0 },
      item_id: { item_id: item.itemId },
      quantity: item.count // Make sure the quantity matches the backend expectation
    }));

    try {
      const response = await fetch(`http://127.0.0.1:8088/placeOrder/${employeeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.statusText}`);
      }

      // Handle success response from the backend
      window.alert('Order placed successfully');
      navigate('/'); // Optionally, navigate to a success page or back to the menu
    } catch (error) {
      console.error('Error placing order:', error);
      window.alert('Failed to place order. Please try again later.');
    }
  };

  return (
    <div className="ready-to-order-container">
      <h2>Order Summary</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Item No.</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>{item.itemName}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handlePlaceOrder}>Place Order</Button>
    </div>
  );
}
