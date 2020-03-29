import React,{useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import profileImage from './../Assets/img/profileImage.png'
import $ from 'jquery'
function PostRequest() {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        console.log(values);
    };
    
  return (
    <form className='requestForm' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label htmlFor='description' className='reqDescription'></label>
            <input
                type='text'
                name="description"
                autoComplete='off'
                placeholder='What&apos;s your request'
                ref={register({
                required: 'Required',
                pattern: {
                    message: "invalid words"
                }
                })}
            />
            {errors.description && errors.description.message}
        </div>
        <div className='extraContent'>
            <div className='reqProdGroup'>
                <div className="form-group">
                    <label htmlFor='product' >Product:</label>
                    <input
                        name="product"
                        ref={register({
                        required: 'Required',
                        pattern: {
                            message: "invalid product name"
                        }
                        })}
                    />
                    {errors.product && errors.product.message}
                </div>
                
                <div className="form-group">
                    <label htmlFor='prodAmount' >Amount:</label>
                    <input
                        type='number'
                        name="prodAmount"
                        ref={register({
                        min: {
                            value: 1,
                            message: 'Should be larger than 0'
                            },
                        required: 'Required'
                    
                        })}
                    />
                    {errors.prodAmount && errors.prodAmount.message}
                </div>
            </div> 
            <div className='wishProdGroup'>
                <div className="form-group">
                    <label htmlFor='wishProduct' >Wish Product:</label>
                    <input
                        type='text'
                        name="wishProduct"
                        ref={register({
                        required: 'Required',
                        pattern: {
                            message: "invalid product name"
                        }
                        })}
                    />
                    {errors.wishProduct && errors.wishProduct.message}
                </div>
                
                <div className="form-group">
                    <label htmlFor='wishAmount' >Amount:</label>
                    <input
                        name="wishAmount"
                        type='number'
                        ref={register({
                        min: {
                            value: 1,
                            message: 'Should be larger than 0'
                            },
                        required: 'Required',
                        
                        })}
                    />
                    {errors.wishAmount && errors.wishAmount.message}
                </div>
            </div> 
    
          
        </div>
        <button className='basicBtn' type="submit">Submit</button>
    </form>
  );
  
}
export default withRouter(PostRequest);

