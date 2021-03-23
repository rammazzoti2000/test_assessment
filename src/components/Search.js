import React, { useState } from 'react';
import Users from '../containers/Users';
import Pagination from './Pagination';
import useFetch from '../hooks/useFetch';

const Search = () => {
  const [users, loading] = useFetch('users');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);

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
        <p>There are no items to display adjust your filter criteria</p>
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
