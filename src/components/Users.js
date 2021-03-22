import React from 'react';

const Users = ({ data, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='list-group mb-4'>
      {data.map(user => (
        <div className='list-group mb-4' key={user.name}>
          <h4 className="user-name">{ user.name }</h4>
          <p>
            Address:
            {' '}
            { Object.entries(user.address).map(([key, value]) =>
                <span key={value}>{ key == 'geo' ? '' : `${value}, ` }</span>
            )}
          </p>
          <p>Email: { user.email },</p>
          <p>Website: { user.website }</p>
          <hr />
        </div>

      ))}
    </div>
  );
};

export default Users;
