import React, { useState, useEffect } from 'react';
import Users from './Users';
import Pagination from './Pagination';
import axios from 'axios';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL);
      setUsers(res.data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredItems = users.filter(
    user =>
      user.name.toLocaleLowerCase().includes(filterText) ||
      user.email.toLocaleLowerCase().includes(filterText)
  );

  const itemsToDisplay = filterText ? filteredItems : users;

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = itemsToDisplay.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='search'>
      <h1 className='text-primary mb-3'>Contact List</h1>
      <input
        type="text"
        placeholder="Filter items by keyword"
        value={filterText}
        onChange={e => setFilterText(e.target.value.toLocaleLowerCase())}
      />
      <hr />
      {!filteredItems.length && (
        <div>There are no items to display adjust your filter criteria</div>
      )}
      <Users data={currentUsers} loading={loading} />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Search;
