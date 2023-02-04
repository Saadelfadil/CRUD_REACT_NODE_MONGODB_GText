import './App.css';
import Table from './components/datatable';
import AddContact from './components/addContact';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users").then(async (res) => {
      const userss = await res.json();
      setUsers(userss);
    });
  }, []);


  return (
    <div className='flex h-screen justify-around'>
      <div className='flex justify-around items-center gap-16'>
        <AddContact />
        <Table usersData={users}/>
      </div>
    </div>
  );
}

export default App;
