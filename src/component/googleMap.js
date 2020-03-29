// import { functions, isEqual, omit } from 'lodash'
// import React, { useState, useEffect, useRef } from 'react'

// function Map({ options, onMount, className, onMountProps }) {
//   const ref = useRef()
//   const [map, setMap] = useState()

//   useEffect(() => {
//     // The Google Maps API modifies the options object passed to
//     // the Map constructor in place by adding a mapTypeId with default
//     // value 'roadmap'. { ...options } prevents this by creating a copy.
//     const onLoad = () =>
//       setMap(new window.google.maps.Map(ref.current, { ...options }))
//     if (!window.google) {
//       const script = document.createElement(`script`)
//       script.src =
//         `https://maps.googleapis.com/maps/api/js?key=AIzaSyBmuVFyl548_WfKr2oqchbb4LgEiwHYjEU`
//       document.head.append(script)
//       script.addEventListener(`load`, onLoad)
//       return () => script.removeEventListener(`load`, onLoad)
//     } else onLoad()
//   }, [options])

//   if (map && typeof onMount === `function`) onMount(map, onMountProps)

//   return (
//     <div
//       style={{ height: `calc(100vh - 150px)`, margin: `0em`, top: `150px`}}
//       {...{ ref, className }}
//     />
//   )
// }

// function shouldNotUpdate(props, nextProps) {
//   const [funcs, nextFuncs] = [functions(props), functions(nextProps)]
//   const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs))
//   const noFuncChange =
//     funcs.length === nextFuncs.length &&
//     funcs.every(fn => props[fn].toString() === nextProps[fn].toString())
//   return noPropChange && noFuncChange
// }

// export default React.memo(Map, shouldNotUpdate)

// Map.defaultProps = {
//   options: {
//     center: { lat: 48, lng: 8 },
//     zoom: 5,
//   },
// }

import React, { useState , useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './test/Marker'

const SimpleMap = (props) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(15);
  const [visible , setVisible] = useState(false)
  useEffect(() => {
    console.log('data in map')
    console.log(props.data)
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success
          console.log('latitude', position.coords.latitude, 'longitude', position.coords.longitude);
          setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
          setVisible(true)
        },
        function error(error_message) {
          // for when getting location results in an error
          console.error('An error has occured while retrievinglocation', error_message)
        }
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log('geolocation is not enabled on this browser')
    }
  }, []);



  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {visible ? 
      <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyDH5dYz6E-fTRewEqrtSlF6fVveBarE38Y' }} defaultCenter={center} defaultZoom={zoom}>
        <Marker lat={center.lat} lng={center.lng} text="My Marker" color="blue"/>
        {props.data.map(order => <Marker lat={order.user.location.coordinates[1]}  lng={order.user.location.coordinates[0]} text="My Marker" color="red"/>)}
      </GoogleMapReact> : 
      <p>Please refresh page</p>
      }
    </div>
  );
}

export default SimpleMap;