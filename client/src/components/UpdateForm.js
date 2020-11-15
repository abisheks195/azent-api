import React, { useState } from 'react'
import Success from './Success';

import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function UpdateForm(props) {
  
  // Data from home page update button
  const uni = props.location.state;

  const { register, handleSubmit, errors } = useForm();

  // Defining state for each value of a university to update
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [alpha_two_code, setAlphaTwoCode] = useState('');
  const [domain, setDomain] = useState('');
  const [web_page, setWebPage] = useState('');
  const [success, setSuccess] = useState(false);

  // Updating the item in Mongodb and elasticsearch
  const onSubmit = () => {
    const item = {
      _id: uni._id,
      alpha_two_code: alpha_two_code,
      country: country,
      domain: domain,
      name: name,
      web_page: web_page
    }
    
    axios.post('http://www.localhost:8000/uni/:id/update', item)
      .then(res => {
        console.log(res.data);
        if(res.data.success){
          setSuccess(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      { 
        (success)
        ? 
        <div>
          <Route path='/success' render={() => <Success/>}/>
          <Redirect push to='/success' />
        </div>
        :
        <div>
          <h2 className="my-5">Update {uni.name}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
            <div className="container">

              {/* Name of the University */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="name" 
                    type="text" 
                    onChange={e => {setName(e.target.value)}}
                    placeholder={uni.name}
                    ref={register({required: true})}
                    />
                    <p style={{color: "red"}}>{errors.name && 'Please enter a name.'}</p>
                </div>
              </div>

              <br/>
              
              {/* Country */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Country:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="country" 
                    type="text"  
                    onChange={e => setCountry(e.target.value)} 
                    placeholder={uni.country}
                    ref={register({required: true})}
                    />
                    <p style={{color: "red"}}>{errors.country && 'Please enter a country.'}</p>
                </div>
              </div>

              <br/>

              {/* Country Code */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Country Code:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="alpha_two_code" 
                    type="text" 
                    onChange={e => setAlphaTwoCode(e.target.value)} 
                    placeholder={uni.alpha_two_code}
                    ref={register({required: true})}
                    />
                    <p style={{color: "red"}}>{errors.alpha_two_code && 'Please enter a Country code.'}</p>
                </div>              
              </div>

              <br/>

              {/* Domain */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Domain:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="domain" 
                    type="text"  
                    onChange={e => setDomain(e.target.value)} 
                    placeholder={uni.domain}
                    ref={register({required: true, pattern: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/})}
                    />
                    <p style={{color: "red"}}>{errors.domain && 'Please enter a valid domain.'}</p>
                </div>              
              </div>

              <br/>

              {/* Web page */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Website:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="web_page" 
                    type="text" 
                    onChange={e => setWebPage(e.target.value)} 
                    placeholder={uni.web_page}
                    ref={register({required: true, pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/})}
                    />
                    <p style={{color: "red"}}>{errors.web_page && 'Please enter a valid URL.'}</p>
                </div>              
              </div>

              <br/>

              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
    }
    </div>
  );
}
