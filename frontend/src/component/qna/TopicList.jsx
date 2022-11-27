import React, { Component, useState } from "react";
import { topics } from "./topics";
import CreatePost from "./CreatePost";
import Question from "./Question";
import * as questionService from "../../services/questionService";
import * as authService from "../../services/authService";

function Show({ arr, user, onDelete }) {
  return arr.map((val) => (
    <div key={val._id}>
      <Question
        _id={val._id}
        username={val.userName}
        useravatar={val.userAvatar}
        description={val.description}
        title={val.title}
        topic={val.topic}
        date={val.datePosted}
        user={user}
        onDelete={onDelete}
      />
    </div>
  ));
}

function TopicNavigation({ location, user, onDelete }) {
  const [isShown, setIsShown] = useState("All");
  return (
    <div className="container-fluid body">
      <div className="row">

        <div className="col-sm-3 topic-col">
          <div className="topic-logo">
            <img
              src="../images/qna/q&a.png"
              alt="question and answer pic"
              width="200px"
              height="100px"
            />
          </div>
          <div className="topic-list">
            <h2 className="topic" onClick={() => setIsShown("All")}>
              ----TOPIC----
            </h2>
            <ul className="list-group list-group-flush">
              {topics.map((val) => (
                <li
                  key={val.id}
                  className="list-group-item"
                  onClick={() => setIsShown(val.topic)}
                >
                  {val.topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-sm-7">
          <CreatePost />

          <div className="divider">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>

          {isShown === "All" && (
            <div>
              <Show arr={location} user={user} onDelete={onDelete} />
            </div>
          )}

          {isShown === "Database Basic" && (
            <div>
              <Show
                arr={location.filter((val) => val.topic === "Database Basic")}
                user={user}
              />
            </div>
          )}

          {isShown === "Basic Data Query" && (
            <div>
              <Show
                arr={location.filter((val) => val.topic === "Basic Data Query")}
                user={user}
              />
            </div>
          )}

          {isShown === "Intermediate" && (
            <div>
              <Show
                arr={location.filter((val) => val.topic === "Intermediate")}
                user={user}
              />
            </div>
          )}

          {isShown === "Advance SQL" && (
            <div>
              <Show
                arr={location.filter((val) => val.topic === "Advance SQL")}
                user={user}
              />
            </div>
          )}

          {isShown === "Technical problems" && (
            <div>
              <Show
                arr={location.filter(
                  (val) => val.topic === "Technical problems"
                )}
                user={user}
              />
            </div>
          )}

          <nav aria-label="..." className="pagination">
            <ul className="pagination">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="col-sm-2"> content</div>
      </div>
    </div>
  );
}

class TopicList extends Component {
  state = { data: [], user: {} };
  componentDidMount = async () => {
    const { data } = await questionService.getQuestions();
    const user = await authService.getCurrentUser();
    this.setState({ data, user });
  };

  handleDelete = async () => {
    console.log("deleted");
  };

  render() {
    // const location = this.props.location;
    return (
      <TopicNavigation
        location={this.state.data}
        user={this.state.user}
        onDelete={this.handleDelete}
      />
    );
  }
}

export default TopicList;
