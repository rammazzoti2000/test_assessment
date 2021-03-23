import React from 'react';
import UserCard from '../components/UserCard';

const Users = ({ data, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='list-group mb-4'>
      {data.map(user => (
        <UserCard
          user={user}
          key={user.id}
        />
      ))}
    </div>
  );
};

export default Users;
