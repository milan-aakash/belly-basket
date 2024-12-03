import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [newShop, setNewShop] = useState({
    name: '',
    email: '',
    shopName: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [deliveryBoy, setDeliveryBoy] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    const fetchShops = async () => {
      const response = await axios.get('http://localhost:8000/api/shop');
      setShops(response.data);
    };
    fetchShops();
  }, []);

  const handleCreateShop = async () => {
    if (newShop.password !== newShop.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/shop/create', newShop);
      alert('Shop created successfully');
      setNewShop({
        name: '',
        email: '',
        shopName: '',
        location: '',
        password: '',
        confirmPassword: '',
      });
      // Fetch updated list of shops
      const response = await axios.get('http://localhost:8000/api/shop');
      setShops(response.data);
    } catch (error) {
      alert('Error creating shop');
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/shop/delete/${shopId}`);
      alert('Shop deleted successfully');
      // Fetch updated list of shops
      const response = await axios.get('http://localhost:8000/api/shop');
      setShops(response.data);
    } catch (error) {
      alert('Error deleting shop');
    }
  };

  const handleCreateDeliveryBoy = async () => {
    try {
      await axios.post('http://localhost:8000/api/admin/create-delivery-boy', deliveryBoy);
      alert('Delivery boy created successfully');
      setDeliveryBoy({ name: '', email: '', password: '', phone: '' });
    } catch (error) {
      alert('Error creating delivery boy');
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      
      <h2>Create Shop</h2>
      <input
        type="text"
        value={newShop.name}
        placeholder="Owner Name"
        onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
      />
      <input
        type="email"
        value={newShop.email}
        placeholder="Owner Email"
        onChange={(e) => setNewShop({ ...newShop, email: e.target.value })}
      />
      <input
        type="text"
        value={newShop.shopName}
        placeholder="Shop Name"
        onChange={(e) => setNewShop({ ...newShop, shopName: e.target.value })}
      />
      <input
        type="text"
        value={newShop.location}
        placeholder="Shop Location"
        onChange={(e) => setNewShop({ ...newShop, location: e.target.value })}
      />
      <input
        type="password"
        value={newShop.password}
        placeholder="Password"
        onChange={(e) => setNewShop({ ...newShop, password: e.target.value })}
      />
      <input
        type="password"
        value={newShop.confirmPassword}
        placeholder="Confirm Password"
        onChange={(e) => setNewShop({ ...newShop, confirmPassword: e.target.value })}
      />
      <button onClick={handleCreateShop}>Create Shop</button>

      <h2>Shops</h2>
      <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            {shop.shopName} - {shop.location}
            <button onClick={() => handleDeleteShop(shop._id)}>Delete Shop</button>
          </li>
        ))}
      </ul>

      <h2>Create Delivery Boy</h2>
      <input
        type="text"
        value={deliveryBoy.name}
        placeholder="Name"
        onChange={(e) => setDeliveryBoy({ ...deliveryBoy, name: e.target.value })}
      />
      <input
        type="email"
        value={deliveryBoy.email}
        placeholder="Email"
        onChange={(e) => setDeliveryBoy({ ...deliveryBoy, email: e.target.value })}
      />
      <input
        type="password"
        value={deliveryBoy.password}
        placeholder="Password"
        onChange={(e) => setDeliveryBoy({ ...deliveryBoy, password: e.target.value })}
      />
      <input
        type="text"
        value={deliveryBoy.phone}
        placeholder="Phone"
        onChange={(e) => setDeliveryBoy({ ...deliveryBoy, phone: e.target.value })}
      />
      <button onClick={handleCreateDeliveryBoy}>Create Delivery Boy</button>
    </div>
  );
};

export default AdminPanel;
