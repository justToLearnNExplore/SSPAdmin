import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { getUsers, deleteUser } from '../../redux/actions/authActions';
import './AdminHome.css';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkAuthentication = () => {
      const localUser = JSON.parse(localStorage.getItem('user_info'));
      if (!localUser) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await dispatch(getUsers());
        setUsers(data);
        setLoading(false);
      } catch (error) {
       
        setLoading(false);
      }
    };

    checkAuthentication(); // Check if the user is authenticated
    fetchUsers(); // Fetch users if authenticated
  }, [dispatch, navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      
      alert(`Error deleting user: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-home">
      <h1>User Details</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Raised Enquiries</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  {user.raiseEnquiry.length > 0 ? (
                    <ul>
                      {user.raiseEnquiry.map((enquiry, i) => (
                        <li key={i}>
                          <p>Game Name: {enquiry.gamename}</p>
                          <p>Category: {enquiry.gamecategory}</p>
                          <p>Name: {enquiry.name}</p>
                          <p>Email: {enquiry.email}</p>
                          <p>Phone: {enquiry.phone}</p>
                          <p>Message: {enquiry.message}</p>
                          <p>Date: {new Date(enquiry.date).toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No enquiries</p>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHome;
