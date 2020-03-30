import React,{useState, useEffect,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import noImage from './../Assets/img/noImage.png'
import profileImage from './../Assets/img/profileImage.png'
import refresh from './../Assets/img/Refresh.png'
import redArrow from './../Assets/img/arrow_red.png'
function AllPending(props) {
    console.log("in all pending" , localStorage.getItem('userId'))
    const [data , setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios('http://localhost:3007/get_pending_by_user?userId='+localStorage.getItem('userId'));
          console.log('result in pending,',result)
          setData(result.data);
        };
        fetchData();
      }, []);
    return(
       
        <div className="pendingOrderList">
           
           <ul className="pendingOrders" >
           {data.map((item, idx) => {
               if(item.image == null){
                  return (<li className="pendingOrder" key={idx}>
                         
                              <div className='prodImage'>
                                  <img src={noImage} />
                              </div>
                              <div className='pendingDetail'>
                                 <div className='pendingTitle'>
                                <p className="pendingStatus">Status:{item.status}</p>
                                    {item.role == 'buyer' ? (
                                        <p className="pendingRoleBuyer">{item.role}</p>
                                    ):(
                                        <p className="pendingRoleSeller">{item.role}</p>
                                    )}
                                 </div>
                                 <div className='pendingContent'>
                                 {item.role == 'buyer' ? (
                                     <React.Fragment>
                                        <div className="buyerInfo">
                                            <p className="roleTitle">Buyer</p>
                                            <div className="buyerDetail"> 
                                                <img src={profileImage}/><p>{item.reserved_by_user.username}</p>
                                            </div>
                                            <p className="roleEmail">{item.reserved_by_user.email}</p>
                                            <p className="roleProd">Item Name:{item.wish}</p>
                                            <p className="roleAmt">Amount:{item.wish_amt}</p>
                                        </div>
                                        <img className="redarrow" src={redArrow}/>
                                        <div className="sellerInfo">
                                            <p className="roleTitle">Seller</p>
                                            <div className="sellerDetail"> 
                                                <img src={profileImage}/><p>{item.user.username}</p>
                                            </div>
                                            <p className="roleEmail">{item.user.email}</p>
                                            <p className="roleProd">Item Name:{item.prod}</p>
                                            <p className="roleAmt">Amount:{item.amt}</p>
                                        </div>
                                     </React.Fragment>
                                         
                                    ) : (
                                     <React.Fragment>
                                        <div className="sellerInfo">
                                            <p className="roleTitle">Seller</p>
                                            <div className="sellerDetail"> 
                                                <img src={profileImage}/><p>{item.user.username}</p>
                                            </div>
                                            <p className="roleEmail">{item.user.email}</p>
                                            <p className="roleProd">Item Name:{item.prod}</p>
                                            <p className="roleAmt">Amount:{item.amt}</p>
                                        </div>
                                        <img className="redarrow" src={redArrow}/>
                                        <div className="buyerInfo">
                                            <p className="roleTitle">Buyer</p>
                                            <div className="buyerDetail"> 
                                                <img src={profileImage}/><p>{item.reserved_by_user.username}</p>
                                            </div>
                                            <p className="roleEmail">{item.reserved_by_user.email}</p>
                                            <p className="roleProd">Item Name:{item.wish}</p>
                                            <p className="roleAmt">Amount:{item.wish_amt}</p>
                                        </div>
                                     </React.Fragment>
                                    )}
                                    
                                 </div>
                                 <div className='pendingResult'>
                                 {item.role == 'buyer' ? (
                                     <div className='waiting'>Waiting for Seller</div>
                                 ):(
                                    <React.Fragment>
                                     <button className="cancelBtn" >Cancel</button>
                                     <button className="acceptBtn">Accept</button>
                                    </React.Fragment>
                                 )}
                                 </div>
                              </div>
                         
                          
                      </li>
                  )
               }else{
                  return (<li className="order">
                      <div className='prodImage'>
                          <img src={noImage} />
                      </div>
                      <div className='orderDetail'>
                          <img className='profileImage' src={profileImage}/>
                          <p>{item.user.username}</p>
                          <p>An hour ago</p>
                          <p>{item.prod}</p>
                          </div>
                      </li>
                  )
               }
               
           })}
           </ul>
        </div>

  )

}

export default withRouter(AllPending);