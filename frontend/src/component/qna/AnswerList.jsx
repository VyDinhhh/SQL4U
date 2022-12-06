import React from "react";
import * as questionService from "../../services/questionService";

export default function AnswerList(props) {
  return (
    <div className="answer-lists">
      {props.user &&
        (props.user.admin || props.user.email === props.username) && (
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              await questionService.deleteReply(props.questionId, props._id);
              window.location = `/qna/${props.questionId}`;
            }}
          >
            Delete
          </button>
        )}
      <div className="answer-a">
        <div className="answer-img">
          <img
            className="a-userAvatar"
            src={"https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"}
            alt="User avatar"
          ></img>
        </div>
        <div className="answer-info">
          <p className="a-userName">
            {props.username}
            <br /> <span className="date-created">{props.date}</span>
          </p>

          <div className="reply-text">
            {props.reply.split("\n").map((r) => (
              <p key={Math.random()}>{r}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
