import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            visaStatus:"",
            visaExpiryDate: "",
            showDateInput: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.saveData = this.saveData.bind(this)
    }
    handleChange(event){
        switch(event.target.value){
            case "Citizen":
                this.setState({
                    showDateInput: false,
                    visaStatus: event.target.value
                },()=>this.saveData())
            break;
            case "Permanent Resident":
                this.setState({
                    showDateInput: false,
                    visaStatus: event.target.value
                },()=>this.saveData())
            break;
            default:
                this.setState({
                    showDateInput: true,
                    visaStatus: event.target.value 
                })
        }
    }
    handleChangeDate(date ) {
        this.setState({ visaExpiryDate: date })
    }
    saveData(){
        const data ={}
        if(this.state.visaStatus == null || this.state.visaStatus=="")
            data["visaStatus"] = this.props.visaStatus
            else
            data["visaStatus"] = this.state.visaStatus
        if(this.state.visaExpiryDate == null || this.state.visaExpiryDate== "")
            data["visaExpiryDate"]=this.props.visaExpiryDate
            else
            data["visaExpiryDate"]= this.state.visaExpiryDate
       this.props.saveProfileData(data)

    } 
   
    render() {
        var  expiryDate= moment(this.props.visaExpiryDate).format("DD--MM-YYYY")
        var option = this.props.visaStatus
        if(option == "Citizen" || option =="Permanent Resident"){
           return(
                <div className="ui container">
                    <div className="ui grid">
                        <div className="row" >
                         
                            <div className="ui five wide column" style={{margin:"10px"}}>   
                                <label>Visa Status</label>
                                <select  className="ui right label dropdown" name="visaStatus" onChange={this.handleChange}>
                                    <option>{option}</option>
                                    <option key="Citizen" value="Citizen">Citizen</option>
                                    <option key="PR" value="Permanent Resident">Permanent Resident</option>
                                    <option key= "Work" value="Work Visa">Work Visa</option>
                                    <option key= "Student" value="Student Visa">Student Visa</option>
                                </select>
                            </div>
                            <div className="ui five wide column" style={{display: this.state.showDateInput ? "inline": "none",margin:"10px"}}>
                                <label>Expiry Date</label>
                                <DatePicker
                                    selected={this.state.visaExpiryDate}
                                    onChange={(date) => this.handleChangeDate(date)}
                                />
                            </div>
                            <div className="ui five wide column" style={{display: this.state.showDateInput ? "inline": "none",marginBottom:"10px",marginTop:"30px"}}> 
                                <input  type="button" className="ui teal button right floated" onClick={this.saveData} value="Save"></input>
                            </div>
                        </div>
                     </div>
                </div>
            )
        }
        else 
            return(
                <div className="ui container">
                    <div className="ui grid">
                        <div className="row">
                            <div className="ui five wide column" style={{margin:"10px"}}>   
                                <label>Visa Status</label>
                                <select  className="ui right label dropdown" name="visaStatus" onChange={this.handleChange}>
                                    <option>{option}</option>
                                    <option key="Citizen" value="Citizen">Citizen</option>
                                    <option key="PR" value="Permanent Resident">Permanent Resident</option>
                                    <option key= "Work" value="Work Visa">Work Visa</option>
                                    <option key= "Student" value="Student Visa">Student Visa</option>
                                </select>
                            </div>
                        
                            <div className="ui five wide column" style={{margin:"10px"}}>
                                <label>Expiry Date</label>
                                <DatePicker
                                    value= {expiryDate}
                                    selected={this.state.visaExpiryDate}
                                    onChange={(date) => this.handleChangeDate(date)}
                                />
                            </div>
                            <div className="ui five wide column" style={{marginBottom:"10px",marginTop:"30px"}}> 
                                <input  type="button" className="ui teal button right floated" onClick={this.saveData} value="Save"></input>
                            </div>
                        </div>
                    </div>
                </div>
         
        )
      
    }
}