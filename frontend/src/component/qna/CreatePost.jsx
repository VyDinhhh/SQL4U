import React, { Component } from "react";
import Form from "../common/form";
import { info } from "./question&user";

import Joi, { date } from "joi";
import { withRouter } from "../withRouter";


class CreatePost extends Form {

   
       
        state = {
            count: this.props.value,
             data: {
                description: "",
                topic: "",
                title:"",
                date:`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`,
            },
    
            // topics: [
            //     { _id: "1", name: "Database Basic" },
            //     { _id: "2", name: "Basic Data Query" },
            //     { _id: "3", name: "Intermediate" },
            //     { _id: "4", name: "Advance SQL" },
            //     { _id: "5", name: "Technical problems" },
    
            // ],
            topics: [
                { name: "Database Basic" },
                { name: "Basic Data Query" },
                { name: "Intermediate" },
                { name: "Advance SQL" },
                { name: "Technical problems" },
    
            ],
    
            errors: {}
        };
    
     
    

    handleIncrement = e => {
        this.setState({ count: this.state.count + 1 });
        
    }

    schema = Joi.object({
        description: Joi.string().min(10).max(3000).required().label("Question"),
        topic: Joi.string().required(),
        title: Joi.string().min(10).max(3000).required().label("Title"),
        date: Joi.required(),
    });

    doSubmit = () => {
        const { data } = this.state;
        const userPost = { ...data };
        userPost.userName = "Mee"
        userPost.userAvatar = "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"
        userPost.id = info.length;
        info.push(userPost);
        this.handleIncrement();
        //this.setState();
        alert("New question is created");
        this.props.navigate(`/qna`);
       


    };


    render() {
        return (<div className="creating-post">
            <div className="avatar">
                <img src="https://galaxylands.com.vn/wp-content/uploads/2022/10/tieu-su-ca-si-mono-13.jpg"
                    alt="user avatar" className="user-avartar" id="user-avatar" />
                <h6 id="user-name">UserName</h6>
            </div>
            <form onSubmit={this.handleSumbit}>
                {this.renderInput("title", "Title")}
                {this.renderInput("description", "Question")}
                {this.renderSelect("topic", "Topic", this.state.topics)}
                {this.renderButton("Post")}

            </form>

        </div>);
    }
}

export default withRouter(CreatePost);