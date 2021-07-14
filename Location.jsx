import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { countries } from './common.js'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Dropdown } from 'semantic-ui-react';
import { relativeTimeThreshold } from 'moment';

export class Address extends React.Component {
    constructor(props) {
            super(props)
            const addressData = props.addressData ? 
            Object.assign({}, props.addressData) :
            {
                number : "",
                street : "",
                suburb : "",
                postCode : null,
                city : "",
                country : ""
            }
            this.state ={
                showEditSection: false,
                newAddress: addressData
            }
            this.handleChange = this.handleChange.bind(this);
            this.openEdit = this.openEdit.bind(this)
            this.closeEdit = this.closeEdit.bind(this)
            this.saveContact = this.saveContact.bind(this)
         
            }
    
        componentDidMount() {
    
        }
        
    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    saveContact() {
        const data = Object.assign({}, this.state.newAddress)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
    }
        
    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }
    
        render() {
            return(
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
            )
        }
        renderDisplay(){
            const addressData = this.props.addressData;
            let address = addressData ? `${addressData.number}  ${addressData.street}, ${addressData.suburb}, ${addressData.postCode}`: ""
            let city = addressData ? addressData.city : ""   
            let country = addressData ? addressData.country : "" 
            return (
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <React.Fragment>
                            <p>Address: {address}</p>
                            <p>City: {city}</p>
                            <p>Country: {country}</p>
                        </React.Fragment>
                        <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    </div>
                </div>
            ) 
        }
        renderEdit(){
            let countriesOptions = []
            let citiesOptions = []
            const selectedCountry = this.state.newAddress.country;
            const selectedCity = this.state.newAddress.city;
             countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
             if(selectedCountry != null && selectedCountry !=""){
              citiesOptions = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>)
             }
          
            return(
               
            <div className='ui sixteen wide column'>
            <ChildSingleInput
                inputType="text"
                label="Street Number"
                name="number"
                value= {this.state.newAddress.number}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your street number"
                errorMessage="Please enter a valid street number "
            />  
           <ChildSingleInput
                inputType="text"
                label="Street Name"
                name="street"
                value= {this.state.newAddress.street}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your street name"
                errorMessage="Please enter a valid subhurb "
            />
            <ChildSingleInput
                inputType="text"
                label="Suburb"
                name="suburb"
                value={this.state.newAddress.suburb}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your subrub"
                errorMessage="Please enter a valid suburb "
            />
                 <ChildSingleInput
                inputType="text"
                label="Postcode"
                name="postCode"
                value={this.state.newAddress.postCode}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your postcode"
                errorMessage="Please enter a valid postcode "
            />
            <div>
                <label>Country</label>
                <select className="ui right labeled dropdown"
                    placeholder="Country"
                    value={selectedCountry}
                    onChange={this.handleChange}
                    name="country">
                        <option value="">Select a country</option>
                        {countriesOptions}
                </select>
            </div>
            <div style={{ marginBottom:"5px", marginTop:"5px" }}>
                <label>City</label>
                <select className="ui right labeled dropdown"
                    placeholder="City"
                    value={selectedCity}
                    onChange={this.handleChange}
                    name="city">
                    <option value="">Select a city</option>
                        {citiesOptions}
                </select>
            </div>
          
            <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
 
        )
    } 
}  
       
            
        
     

       
       
    



export class Nationality extends React.Component {
    constructor(props) {
        super(props)
    
        this.state ={
            nationality: props.nationality
        }
       this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
         let data ={};
        data[e.target.name] = e.target.value
        this.setState({ nationality:  e.target.value })
        this.props.saveProfileData(data)
    }
  
    
    render() {
        const countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);
  
        
        return(   
                <div>
                    <select className="ui right label dropdown"
                        value={this.state.nationality}
                        name="nationality"
                        onChange={this.handleChange}>
                            <option>{this.props.nationality}</option>
                           {countriesOptions}
                    </select>
                </div>

        ) 
    }
}