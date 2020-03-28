import React,{useState,useEffect} from 'react';
import firebase from '../../firebase'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
function Homepage() {
  const [data, setData] = useState({ orders: [] });
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3007/get_all_orders',
      );
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <ul>
    {data.orders.map(item => (
      <li key={item._id}>
        <h1>{item.prod}</h1>
        <p>{item.amt}</p>
        <p>{item.wish}</p>
        <p>{item.wish_amt}</p>
        <p>By {item.user.username}</p>
      </li>
    ))}
  </ul>
  );
}
export default withRouter(Homepage)