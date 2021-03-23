import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className='list-group mb-4' key={user.name}>
      <h4 className="user-name">{ user.name }</h4>
      <p>
        Address:
        {' '}
        { Object.entries(user.address).map(([key, value]) => // eslint-disable-next-line
            <span key={value}>{ key == 'geo' ? '' : `${value}, ` }</span>
        )}
      </p>
      <p>Email: { user.email },</p>
      <p>Website: { user.website }</p>
      <hr />
    </div>
  )
}

export default UserCard;
