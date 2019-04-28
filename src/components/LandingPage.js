import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Axios from 'axios';
import Loader from 'react-loader-spinner'
import './style.css'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { truncate } from 'fs';
export default class LandingPage extends Component {

    constructor ()
    {
        super();
        this.state = {
            currentCity:'Select City',
            dataCurrentCity:[],
            loading :false,
        }
    }

    handleSearchCity = (value) => {
        
       this.setState({loading:true})
       console.log("Value is ",this.state.currentCity);
       const ROOT_URL = `https://vast-shore-74260.herokuapp.com/banks`;
       let cityName = this.state.currentCity;
        cityName.toUpperCase();
       console.log(cityName);
       const url = `${ROOT_URL}?city=${cityName}`;
        console.log(url);
        Axios.get(url)
        .then(res => {
            const data = res.data;
            console.log("data returned is",data);
            this.setState({loading:false    })
        }) 
        .catch(err => {
            this.setState({loading:false});
            console.log("err is ",err);
        })
    }

    handleSearch = (e) => {
        e.keyCode === 27 ?console.log("enter"): console.log("code is");
        // console.log("event is",e)
    }

    render() {
        return (
            <div className = "container">
                    <div style={{marginTop:'5px'}}>
                        <DropdownButton id="dropdown-item-button" title={this.state.currentCity}>
                            <Dropdown.Item as="button" onClick ={ e => {this.setState({currentCity:'BANGALORE'},_=> {
                                this.handleSearchCity(1)})}} >BANGALORE</Dropdown.Item>
                            <Dropdown.Item as="button" onClick ={ e => {this.setState({currentCity:'DELHI'},_=> {
                                this.handleSearchCity(2)})}}>DELHI</Dropdown.Item>
                            <Dropdown.Item as="button" onClick ={ e => {this.setState({currentCity:'PATNA'},_=> {
                                this.handleSearchCity(3)})}}>PATNA</Dropdown.Item>
                            <Dropdown.Item as="button" onClick ={ e => {this.setState({currentCity:'MUMBAI'},_=> {
                                this.handleSearchCity(4)})}}>Mumbai</Dropdown.Item>
                            <Dropdown.Item as="button" onClick ={ e => {this.setState({currentCity:'HYDERABAD'},_=>{
                                this.handleSearchCity(5)})}}>HYDERABAD</Dropdown.Item>
                        </DropdownButton>
                        { this.state.loading ? <Loader type ="Bars" color ="#somecolor" height ={50} width = {50} placeholder ="Please Wait..."/> :''}
                        <div style={{marginTop:'10px'}} >
                            <input style ={{width:'70%'}} placeholder="Search Branch by   IFSC,    bank id,   District, Bank name" onChange = {e => {
                                console.log("event is",e.target.value);

                            }} />
                        </div>
                    </div>
            </div>
        )
    }
}