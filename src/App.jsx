import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "leaflet/dist/leaflet.css"
import "./style.css"
import IconArrow from "./images/icon-arrow.svg"
import MapComponent from './map/MapComponent';

export const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [IP, setIP] = useState('');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [coords, setCoords] = useState([]);
    const dataAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_8eCuTwW9B2ORTpCj18zFrMn86hLO4&ipAddress=${IP}`;

    useEffect(() => {
        fetchData().then((resp) => {
            setData(resp);
            setCoords([resp.location.lat, resp.location.lng]);
            setLoading(false);
            console.log(coords);
            console.log(resp);
        });
    }, [IP]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIP(inputValue);
        setInputValue('');

    }

    const fetchData = async () => {
        try {
            const response = await axios.get(dataAPI);
            return response.data;
        } catch (error) {
            console.error('Error', error);
        }
    };


    return (
        <>
            {loading ? (<div> Loading... </div>) : (
                <>
                    <div className='header'>
                        <h1 className='title'>
                            IP Address Tracker
                        </h1>

                        <form onSubmit={onSubmit} className='inputContainer'>
                            <input
                                className='input'
                                type='text'
                                placeholder='Search for any IP adress or domain'
                                onChange={handleInputChange}
                                value={inputValue}
                            />
                            <button className='button' type='submit'>
                                <img src={IconArrow} alt="Arrow Icon" />
                            </button>
                        </form>
                        
                        <div className='dataCard'>
                            <div className='data'>
                                <h5>IP ADDRESS</h5>
                                <h2>{data.ip}</h2>
                            </div>
                            <div className='data'>
                                <h5>LOCATION</h5>
                                <h2>{data.location.city}</h2>
                            </div>
                            <div className='data'>
                                <h5>TIMEZONE</h5>
                                <h2>UTC {data.location.timezone}</h2>
                            </div>
                            <div className='data'>
                                <h5>ISP</h5>
                                <h2>{data.isp}</h2>
                            </div>
                        </div>
                    </div>

                    <MapComponent center={coords} />
                </>
            )}
        </>
    )
}

export default App;