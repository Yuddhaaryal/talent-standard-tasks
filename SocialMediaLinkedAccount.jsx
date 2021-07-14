/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showEdit: false,
            linkedAccounts: {
                linkedIn: "",
                github: ""
            }
        
        }
        this.handleChange = this.handleChange.bind(this)
        this.showEdit = this.showEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.saveData = this.saveData.bind(this)
    }


    handleChange(e){
        const data = Object.assign({}, this.state.linkedAccounts)
        data[e.target.name]= e.target.value
        this.setState({linkedAccounts:data})
    }
    saveData(){
       
        this.props.controlFunc(this.props.componentId,this.state.linkedAccounts)
    }
    showEdit(){this.setState({showEdit:true})}
    closeEdit(){this.setState({showEdit:false})}


   
    render() { 
        return(
        this.state.showEdit ? this.renderEdit(): this.renderDisplay()
    )
    }
    renderDisplay(){

        return(
            <div className='row'>
            <div className="ui sixteen wide column">
         
                <button type="link" className="ui left floated blue button" onClick={()=>window.open(`${this.props.linkedAccounts.linkedIn}`)}>In LinkedIn</button>  
                <button type="link" className="ui left floated black button" onClick={()=>window.open(`${this.props.linkedAccounts.github}`)}>Github</button>  
                <button type="button" className="ui right floated teal button" onClick={this.showEdit}>Edit</button>

            </div>
        </div>
        )
    }
    renderEdit(){
        return(
            <div className='ui sixteen wide column'>
            <ChildSingleInput
                inputType="text"
                label="LinkedIn"
                name="linkedIn"
                value={this.state.linkedAccounts.linkedIn}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your linkeedIn URL"
               // errorMessage="Please enter a valid first name"
            />
            <ChildSingleInput
                inputType="text"
                label="Github"
                name="github"
                value={this.state.linkedAccounts.github}
                controlFunc={this.handleChange}
                maxLength={80}
                placeholder="Enter your github URL"
               // errorMessage="Please enter a valid last name"
            />
             <button type="button" className="ui teal button" onClick={this.saveData}>Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
}       
      


    

