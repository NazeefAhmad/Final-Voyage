import React, { useRef } from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'



const SearchBar = () => {
   const locationRef = useRef('')
   const maxGroupSizeRef = useRef(0)
   const navigate = useNavigate()
   
   const openMetro = () => {
    var urlToOpen = 'https://www.delhimetrorail.com/map';
    window.open(urlToOpen, '_blank');
    }
    const openEcab = () => {
        var urlToOpen = 'https://blu-smart.com/';
        window.open(urlToOpen, '_blank');
    }

    const openEtravel = () => {
        var urlToOpen = 'https://so.city/delhi/article/6-gloriously-green-spaces-youll-prolly-refuse-to-believe-are-in-delhi ';
        window.open(urlToOpen, '_blank');
    }
   
    const searchHandler = async(e) => {
      e.preventDefault();
      const location = locationRef.current.value
      const maxGroupSize = maxGroupSizeRef.current.value

      if (location === '' || maxGroupSize === '') {
         return alert('All fields are required!')
      }

      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&maxGroupSize=${maxGroupSize}`)
      
      if(!res.ok) alert('Something went wrong')

      const result = await res.json()

      navigate(`/tours/search?city=${location}&maxGroupSize=${maxGroupSize}`, {state: result.data})
   }

   return <Col lg="12">
      <div className="search__bar">
         <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast'>
               <span><i class='ri-map-pin-line'></i></span>
               <div>
                  <h6>Location</h6>
                  <input type="text" placeholder='Where are you going?' ref={locationRef} />
               </div>
            </FormGroup>
            {/* <FormGroup className='d-flex gap-3 form__group form__group-fast'>
               <span><i class='ri-map-pin-time-line'></i></span>
               <div>
                  <h6>Distance</h6>
                  <input type="number" placeholder='Distance k/m' ref={distanceRef} />
               </div>
            </FormGroup> */}
            
            <FormGroup className='d-flex gap-3 form__group form__group-last'>
               <span><i class='ri-group-line'></i></span>
               <div>
                  <h6>Max People</h6>
                  <input type="number" placeholder='0' ref={maxGroupSizeRef} />
               </div>
            </FormGroup>

            <span className='search__icon' type='submit' onClick={searchHandler}>
               <i class='ri-search-line'></i>
            </span>
            
         </Form>
         
      </div>
    <input className='map-btn' value="DMRC" type='submit' onClick={openMetro} />
    <input className='map-btn' value="E-Cabs" type='submit' onClick={openEcab} />
    <input className='places-btn' value="Ecological Parks Near Me" type='submit' onClick={openEtravel} />
   </Col>
   
}

export default SearchBar