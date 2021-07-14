/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import {ChildSingleInput}   from '../Form/SingleInput.jsx';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showEditSection: false,
            update:false,
            language: {
                        name : "",
                        level: ""
                    }
            }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.editLanguage = this.editLanguage.bind(this)
        this.update = this.update.bind(this)
  
    }
    openEdit() {
        this.setState({
            showEditSection: true,
      
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
            update: false
        })
    }
    update(lang){
        this.setState({
            update: !this.state.update,
            language: lang
        },this.openEdit)
    }
    handleChange(event){
        const data = Object.assign({},this.state.language)
        data[event.target.name] = event.target.value
        this.setState({
            language : data
        })
    }
    saveData(){
        const data = Object.assign({},this.state.language) 
        var newData= this.props.languageData.push(data)
        this.props.updateProfileData( newData)
        this.closeEdit();
    }
    deleteLanguage(index){
      
      
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/DeleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',
             
            },
            type: "POST",
            data: JSON.stringify(index),
            success: function (res) {
                this.props.reLoad()
                if (res.success == true) {
                    TalentUtil.notification.show("Language added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                }

            }.bind(this)
         
        })
       
    }
    editLanguage(){
        var cookies = Cookies.get('talentAuthToken');
        this.closeEdit();
        $.ajax({
            url: 'http://localhost:60290/profile/profile/UpdateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',
             
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                this.props.reLoad()
                if (res.success == true) {
                    TalentUtil.notification.show("Language added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                }

            }.bind(this)
         
        })

    }
    render() {
        return(
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
            )
        }
    renderDisplay(){
        return(
            <div className='row'>
            <div className="ui sixteen wide column">
                <React.Fragment>
                    <div className="row">
                        <Table className="ui sixteen wide column">
                            <TableHeader>
                                <TableRow style={{backgroundColor: "#f2f2f2"}}>
                                    <TableCell className="ui five wide column">Language</TableCell>
                                    <TableCell className="ui five wide column">Level</TableCell>
                                    <TableCell className="ui six wide column">
                                        <input type="button" className="ui teal button right floated" value= "+  Add  New" onClick={this.openEdit}/>
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                    {
                                    this.props.languageData.map(lang => {
                                        var index = this.props.languageData.indexOf(lang)
                                        return(
                                        <TableRow>
                                            <TableCell>{lang.name}</TableCell>
                                            <TableCell>{lang.level}</TableCell>
                                            <TableCell>
                                                <i className="write icon" style={{marginLeft:"200px"}} onClick={() => this.update(lang)}></i>
                                                <i className="remove icon" onClick={()=> this.deleteLanguage(index)}></i></TableCell>
                                        </TableRow>)
                                        })
                                    }
                                    
                               
                                </TableBody>
                        </Table>
                    </div>
                </React.Fragment>
            </div>
        </div>
        )
    }
    renderEdit(){
    
        return(
            <div className="ui container">
                    <div className="ui grid">
                        <div className="row" >
                            <div className="ui five wide column">
                               <ChildSingleInput
                                    inputType="text" 
                                    name= "name"
                                    value= {this.state.language.name}
                                    controlFunc={this.handleChange}
                                    maxLength={80}
                                    placeholder="Add language"
                                    errorMessage="Please enter a valid language"
                                />
                              
                            </div>
                            <div className="ui five wide column" style={{margin:"5px"}}>
                                <select  className="ui right label dropdown" name="level" onChange={this.handleChange}>
                                    <option>Choose Level</option>
                                    <option  key="Basic" value="Basic">Basic</option>
                                    <option key="Conv" value="Conversational">Conversational</option>
                                    <option key= "Fluent" value="Fluent">Fluent</option>
                                    <option key= "native" value="Native">Native/Bilingual</option>
                                </select>
                            </div>
                            <div className="ui five wide column" style={{margin:"5px"}}> 
                                <input type="button" className="ui button right floated" onClick={this.closeEdit} value="Cancel"></input>
                               
                                <input style={{display: this.state.update ? "none" :"inline" }} type="button" className="ui teal button right floated" onClick={this.saveData} value="Save"></input>
                                <input  style={{display: this.state.update ? "inline" : "none"}} type="button" className="ui teal button right floated" onClick={this.editLanguage} value="Update"></input>
                            </div>
                        </div>
                       
           
                    </div>
                </div>
                ) 

    }
   
    }
