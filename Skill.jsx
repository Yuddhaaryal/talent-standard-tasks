/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { TableRow,Table, TableCell, TableBody, TableHeader } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showEditSection: false,
            update: false,
            newSkill:{
                name:"",
                level:""
            } 
        }
        this.closeEdit = this.closeEdit.bind(this)
        this.openEdit =this.openEdit.bind(this)
        this.saveData = this.saveData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.editSkill = this.editSkill.bind(this)
        this.upadae = this.update.bind(this)
      
    };
    closeEdit(){
        this.setState({
            showEditSection:false,
            update: false
        })
    }
    openEdit(){
        this.setState({showEditSection:true})
    }
    update(skill){
        this.setState({
            update: !this.state.update,
            newSkill: skill
        },this.openEdit)
    }
    saveData(){
        const data = this.state.newSkill
        var cookies = Cookies.get("talentAuthToken")
        this.closeEdit();
        $.ajax({
            url: 'http://localhost:60290/profile/profile/AddSkill',
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
    
    handleChange(event){
        const data = Object.assign({},this.state.newSkill)
        data[event.target.name] = event.target.value
        this.setState({
            newSkill : data
        })
    }
    deleteSkill(index){
        var cookies = Cookies.get("talentAuthToken")
        $.ajax({
            url: 'http://localhost:60290/profile/profile/DeleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',
             
            },
            type: "POST",
            data: JSON.stringify(index),
            success: function (res) {
                this.props.reLoad()
                if (res.success == true) {
                    TalentUtil.notification.show("Skill deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill did not detete successfully", "error", null, null)
                }

            }.bind(this)
         
        })
      
    }
    editSkill(){
        var cookies = Cookies.get("talentAuthToken")
       this.closeEdit();
        $.ajax({
            url: 'http://localhost:60290/profile/profile/UpdateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',
             
            },
            type: "POST",
            data: JSON.stringify(this.state.newSkill),
            success: function (res) {
                this.props.reLoad()
                if (res.success == true) {
                    TalentUtil.notification.show("Skill deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill did not detete successfully", "error", null, null)
                }

            }.bind(this)
         
        })
    }

  
   render() {
       return(
        this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
       )
    }
    renderEdit(){
        return(
            <div className="ui container">
                <div className=" ui grid">
                    <div className="row">
                        <div className=" ui five wide column">
                        <ChildSingleInput
                            name= "name"
                            type= "text"
                            value= {this.state.newSkill.name}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Add skill"
                            errorMessage="Please enter a valid valid"
                            />
                        </div>
                        <div className=" ui five wide column" style={{margin:"5px"}}>
                            <select className="ui dropdown" name="Level" onChange={this.handleChange} >
                                <option key="Beginer" value="Beginer">Beginer</option>
                                <option key="Intermediate" valufe="Intermediate">Intermediate</option>
                                <option key="Expert" value="Expert">Expert</option>
                            </select>
                        </div>
                        <div className="ui five wide column" style={{margin:"5px"}}> 
                                <input type="button" className="ui button right floated" onClick={this.closeEdit} value="Cancel"></input>
                                <input style={{display: this.state.update? "none": "inline"}}type="button" className="ui teal button right floated" onClick={this.saveData} value="Save"></input>
                                <input style= {{display: this.state.update? "inline": "none"}}type="button" className="ui teal button right floated" onClick={this.editSkill} value="Update"></input>
                        </div>
                    </div>
                </div>
            </div>
          
         
        )
    }
    renderDisplay(){
        if(this.props.skillData == null){
            return(
            <div className="row">
                <div className="ui sixteen wide column">
                    <div className="row">
                        <Table className="ui sixteen wide column">
                            <TableHeader>
                                <TableRow style={{backgroundColor: "#f2f2f2"}}>
                                    <TableCell className="ui five wide column"><h4>Skill</h4></TableCell>
                                    <TableCell className="ui five wide column"><h4>Level</h4></TableCell>
                                    <TableCell className="ui six wide column">
                                        <input type="button" className="ui teal button right floated" value= "+  Add  New" onClick={this.openEdit}/>   
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                        </Table>
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
                                <TableCell className="ui five wide column"><h4>Skill</h4></TableCell>
                                <TableCell className="ui five wide column"><h4>Level</h4></TableCell>
                                <TableCell className="ui six wide column">
                                    <input type="button" className="ui teal button right floated" value= "+  Add  New" onClick={this.openEdit}/>   
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {this.props.skillData.map(skill =>{
                            const index = this.props.skillData.indexOf(skill)
                        return(
                            <TableRow>
                                <TableCell className="ui five wide column">{skill.name}</TableCell>
                                <TableCell className="ui five wide column">{skill.level}</TableCell>
                                <TableCell className="ui five wide column">
                                    <i className="write icon" style={{marginLeft:"200px"}} onClick= {() => this.update(skill)}></i>
                                    <i className="remove icon" onClick= {() => this.deleteSkill(index)}></i>
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

