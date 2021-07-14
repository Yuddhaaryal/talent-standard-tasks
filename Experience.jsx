/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import {ChildSingleInput}   from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';

import { Table, TableBody, TableCell, TableHeader, TableRow } from 'semantic-ui-react';
import moment from 'moment';
export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showEdit: false,
            experience: {
                company: "",
                position:"",
             //   startDate:"" ,
             //   endDate:"",
                responsibilities:""
            }
        }
        this.handleChange = this.handleChange.bind(this) 
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
    };
    openEdit(){
        this.setState({
            showEdit: true
        })
    }
    closeEdit(){
        this.setState({showEdit:false})
    }
    handleChange(event){
        const data = Object.assign({},this.state.experience)
        data[event.target.name] = event.target.value
        this.setState({
            experience : data
        })
    }
    handleChangeDate(date, name) {
        var data = Object.assign({}, this.state.experience);
        data[name] = date;
        this.setState({
            experience: data
        })
        }        
    
    saveExperience(){
        const data = this.state.experience
        var cookies = Cookies.get("talentAuthToken")
        this.closeEdit();
        $.ajax({
            url: 'http://localhost:60290/profile/profile/AddExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',
             
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                this.props.reLoad()
                if (res.success == true) {
                    TalentUtil.notification.show("Skill added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this)
         
        })
    }
    deleteExperience(index){
        var cookies = Cookies.get("talentAuthToken")
        this.closeEdit();
        $.ajax({
            url: 'http://localhost:60290/profile/profile/DeleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',
             
            },
            type: "POST",
            data: JSON.stringify(index),
            success: function (res) {
                this.props.reLoad()
                if (res.success == true) {
                    TalentUtil.notification.show("Experience deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill did not delete successfully", "error", null, null)
                }

            }.bind(this)
         
        })
    }
    
    render() {
        const {  company,position,start,end,responsibilities} = this.state.experience
        if(this.props.experienceData.length == 0  || this.state.showEdit){
        return(
            <div className="ui container">
                <div style={{display: this.state.showEdit? "inline": "none"}} className="ui grid">
                    <div className="row">
                        <div className="eight wide column">
                        <ChildSingleInput
                                    inputType="text" 
                                    name= "company"
                                    value= {company}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add company"
                                    errorMessage="Please enter a valid company"
                                />
                        </div>
                        <div className="eight wide column">
                                <ChildSingleInput
                                    inputType="text" 
                                    name= "position"
                                    value= {position}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add position"
                                    errorMessage="Please enter a valid position"
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <span style={{marginRight:"10px"}}>End Date:</span>
                                    
                                        <DatePicker
                                            
                                            selected={start}
                                            onChange={(date) => this.handleChangeDate(date, "start")}
                                           // minDate={moment()}
                                        />
                        </div>
                        <div className="eight wide column">
                        <span style={{marginRight:"10px"}}>End Date:</span>
                                
                                    <DatePicker
                                        selected={end}
                                         onChange={(date) => this.handleChangeDate(date, "end")}
                                       // minDate={moment()}
                                    />
                        </div> 
                    </div>
                    <div className="row">
                        <div className="sixteen wide column">
                                    <ChildSingleInput
                                        inputType="text" 
                                        name= "responsibilities"
                                        value= {responsibilities}
                                        controlFunc={this.handleChange}
                                        maxLength={80}
                                        placeholder="Add responsibilities"
                                        errorMessage="Please enter a valid responsibilities"
                                    />
                                     <button type="button" className="ui teal button" onClick={this.saveExperience}>Save</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </div>
                    </div>
                    
                </div>       
         
                <div style={{marginBottom: "10px"}} className="ui grid">
                    <div className="ui sixteen wide column">
                        <div className="row">
                            <Table className="ui sixteen wide column">
                                <TableHeader>
                                    <TableRow style={{backgroundColor: "#f2f2f2"}}>
                                        <TableCell className="ui three wide column"><h4>Company</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>Position</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>Start Date</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>End Date</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>Responsibilities</h4></TableCell>
                                        <TableCell className="ui one wide column">
                                            <input type="button" className="ui teal button right floated" value= "+  Add  New" onClick={this.openEdit}/>   
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
        else
            return(
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <div className="row">
                            <Table className="ui sixteen wide column">
                    
                                <TableHeader>
                                    <TableRow style={{backgroundColor: "#f2f2f2"}}>
                                        <TableCell className="ui three wide column"><h4>Company</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>Position</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>Start Date</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>End Date</h4></TableCell>
                                        <TableCell className="ui three wide column"><h4>Responsibilities</h4></TableCell>
                                        <TableCell className="ui one wide column">
                                            <input type="button" className="ui teal button right floated" value= "+  Add  New" onClick={this.openEdit}/>   
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.props.experienceData.map(experience =>{
                                    const index = this.props.experienceData.indexOf(experience)
                                    
                                    var startDate = moment(experience.start).format("DD-MM-YYYY")
                                    var endDate = moment(experience.end).format("DD-MM-YYYY")

                                return(
                                    <TableRow>
                                        <TableCell className="ui three wide column">{experience.company}</TableCell>
                                        <TableCell className="ui three wide column">{experience.position}</TableCell>
                                        <TableCell className="ui three wide column">{startDate}</TableCell>
                                        <TableCell className="ui three wide column">{endDate}</TableCell>
                                        <TableCell className="ui three wide column">{experience.responsibilities}</TableCell>
                                        <TableCell className="ui one wide column">
                                            <i className="write icon" style={{marginLeft:"40px"}} onClick= {() => this.update(skill)}></i>
                                            <i className="remove icon" onClick= {() => this.deleteExperience(index)}></i>
                                        </TableCell>
                                    </TableRow>
                                )
                                })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )
    }
        
       
}
