import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile.');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className='container py-5'>
      <div className='card shadow-sm p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <div>
            <h2 className='mb-1'>My Profile</h2>
            <p className='text-muted mb-0'>Your account details and role.</p>
          </div>
          <button className='btn btn-outline-secondary' onClick={handleLogout}>
            Logout
          </button>
        </div>

        {error && <div className='alert alert-danger'>{error}</div>}

        {user ? (
          <div className='row'>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input className='form-control' value={user.username || ''} disabled />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input className='form-control' value={user.email} disabled />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Role</label>
                <input className='form-control' value={user.role} disabled />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mb-3'>
                <label className='form-label'>Created</label>
                <input className='form-control' value={new Date(user.created_at).toLocaleString()} disabled />
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-5'>Loading profile…</div>
        )}
      </div>
    </div>
  );
}

export default Profile;
