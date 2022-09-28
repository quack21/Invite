import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';


function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [over, setOver] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error while getting users');
      });
    setLoading(false);
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  return (
    <div className="App">
      {!over && (
        <Users
          users={users}
          isLoading={isLoading}
          setOver={setOver}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          setInvites={setInvites}
          onClickInvite={onClickInvite}
        />
      )}
      {over && <Success count={invites.length} setOver={setOver} />}
    </div>
  );
}

export default App;
