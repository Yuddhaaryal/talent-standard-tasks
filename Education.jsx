/* Education section */
import React from 'react';
import Cookies from 'js-cookie';
import { default as Countries } from '../../../../../wwwroot/util/jsonFiles/countries.json'

export default class Education extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
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
