/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Icon,Image} from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state=
        {
            newFile: null,
            newFileUrl:   null
        }
        this.onChangeFile = this.onChangeFile.bind(this) 
        this.uploadPhoto = this.uploadPhoto.bind(this)
    };
    // componentDidUpdate(){
    //     if(this.state.newFileUrl !== this.props.imageId){
    //         this.setState({
    //             newFileUrl: this.props.imageId
    //         })
    //     }
    // }
    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
        if (acceptedExt.includes(file.type)) {
            this.setState(
                {
                    newFile: file,
                    newFileUrl: URL.createObjectURL(file)
                }
                );
           }
    }
    uploadPhoto(){
        
        let file =this.state.newFile;
        let  form = new FormData();
        form.append('file', file);
        console.log(file)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: form,
            processData: false,
           contentType: false,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }
    render() {
       // const photoUrl = URL.createObjectURL(this.props.imageId)
        return(
            <div>
                <input id="myInput"
                    type="file"
                    ref={(ref) => this.upload = ref}
                    style={{display: 'none'}}
                    onChange={this.onChangeFile}
                />
                {
                    this.state.newFileUrl ?  
                    <div>
                        <Image   src={this.state.newFileUrl} circular rounded size="small" onClick={()=>{this.upload.click()}}/>
                        <button style={{marginLeft:"30px",marginTop: "10px"}}
                             
                                type="button" className="ui teal button" 
                                onClick={this.uploadPhoto}><i className="upload icon"></i>Upload
                        </button>
                    </div>:
                    <Icon name="retro camera" size="huge" circular onClick={()=>{this.upload.click()}}/>
                }
            </div>
        )

        
    }
}
