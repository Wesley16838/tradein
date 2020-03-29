import React,{useState, useEffect,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import noImage from './../Assets/img/noImage.png'
import profileImage from './../Assets/img/profileImage.png'
import refresh from './../Assets/img/Refresh.png'
function GlobalOrder(props) {
    
    return(
       
          <div className="orderList">
             
             <ul className="orders" >
             {props.order.map((item, idx) => {
                 if(item.image == null){
                    return (<li className="order" key={idx}>
                           
                                <div className='prodImage'>
                                    <img src={noImage} />
                                </div>
                                <div className='upperdetail'>
                                    <div className='orderDetail'>
                                        <div className="userInfo">
                                            <img className='profileImage' src={profileImage}/>
                                            <div className='detail'>
                                                <p className='prodUsername'>{item.user.username}</p>
                                                <p className='prodTime'>An hour ago</p>
                                            </div>
                                        </div>
                                        <div className='tradeContent'>
                                            <div className='tradeRequest'>
                                                <p className='prodName'>{item.prod}</p>
                                                <p className='prodAmount'>Amount: {item.amt}</p>
                                            </div>
                                            <img src={refresh}/>
                                            <div className='wishProd'>
                                                <p className='prodName'>{item.prod}</p>
                                                <p className='prodAmount'>Amount: {item.amt}</p>
                                            </div>
                                        </div>
                                        <p>{item.description}</p>
                                    </div>
                                    <button className='basicBtn'>Help</button>
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
export default withRouter(GlobalOrder);

