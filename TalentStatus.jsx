import React from 'react'
import { Form, Checkbox, Radio, FormField } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import DatePicker from 'react-datepicker';
import moment from 'moment';
export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            jobSeekingStatus:{
                status:"",
                availableDate: null
            }
        
           
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveData = this.saveData.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
    }
    handleChange(e, { value }){
        const data =Object.assign({}, this.state.jobSeekingStatus)
        data["status"] = value
      //  data[e.tageet.name] = e.taeget.value
        this.setState({  
           jobSeekingStatus: data 
        }, ()=>this.saveData(this.state.jobSeekingStatus))
    }
    handleChangeDate(date ) {
        const data =Object.assign({}, this.state.jobSeekingStatus)
        data["availableDate"]= date
        this.setState({ data },()=>this.saveData(data))
    }

    saveData(stateData){
        const data =Object.assign({}, this.state.jobSeekingStatus)
        data["jobSeekingStatus"] = stateData
        this.props.saveProfileData(data)
    }
    render() {
        const newStatus = this.state.jobSeekingStatus.status
        const status = this.props.status.status
        var  availableDate= moment(this.props.status.availableDate).format("DD--MM-YYYY")
        return(
            <Form>
            <Form.Field>
              Selected value: <b>{status}</b>
            </Form.Field>
            <Form.Field>
              <Radio
                label='Actively looking for a job'
                name='radioGroup'
                value='activelyLooking'
                checked={status === 'activelyLooking' || newStatus ==="activelyLooking" }
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Not looking for a job at the moment'
                name='radioGRoup'
                value='notLooking'
                checked={status === 'notLooking' ||newStatus ==="notLooking"}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Currently employed but open to others'
                name='radioGRoup'
                value='employedbutOpen'
                checked={status === 'employedbutOpen' || newStatus ==="employedbutOpen" }
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Will be available on later date'
                name='radioGRoup'
                value='availableLater'
                checked={status === 'availableLater' || newStatus ==="availableLater"}
                onChange={this.handleChange}
              />
            </Form.Field>
            <FormField style={{display: status ==='availableLater'? "inline": "none"}}>
            <DatePicker label="Available Date"
                                    value= {availableDate==="Invalid date"? moment().format("DD--MM-YYYY"):availableDate}
                                    selected={this.state.jobSeekingStatus.availableDate}
                                    onChange={(date) => this.handleChangeDate(date)}
                                />
            </FormField>
          </Form>
        )
        
    }
}