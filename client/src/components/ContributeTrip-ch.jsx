import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import HeaderCh from './Header-ch';
import YelpSearchCh from './YelpSearch-ch';


class ContributeTripCh extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	tripInfo: '',
      dates: [],
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: '',
      comment: '',
      comments: [],
      vote: 0
    };

    this.getTripInfo = this.getTripInfo.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.getComments = this.getComments.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onCommentSubmission = this.onCommentSubmission.bind(this);
    this.dateVoteClick = this.dateVoteClick.bind(this);
    this.activityOptionsClick = this.activityOptionsClick.bind(this);
  }

  componentDidMount() {
    this.getTripInfo();
    this.getDates();
    this.getActivities();
    this.getComments();
  }

  getTripInfo() {
    axios.get('/tripInfo', {
      params: {
        currentTrip: this.props.currentTrip
      }})
	   .then((result) => {
	      this.setState({tripInfo: result.data[0]})
	    })
	    .catch((error) => {
	      console.error(error);
	    })
  }

  getDates() {
    axios.get('/dates', {
      params: {
        currentTrip: this.props.currentTrip
      }})
     .then((result) => {
        this.setState({dates: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getActivities() {
    axios.get('/activities', {
      params: {
        currentTrip: this.props.currentTrip
      }})
     .then((result) => {
        this.setState({activities: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getComments() {
    axios.get('/comments', {
      params: {
        currentTrip: this.props.currentTrip
      }})
      .then((result) => {
        this.setState({comments: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  onActivityClick(e) {
    e.preventDefault();

    axios.post('/newactivity', {currentTrip: this.props.currentTrip, activityName: this.state.activityName, activityDescription: this.state.activityDescription, activityCost: this.state.activityCost})
      .then((result) => {
        this.getActivities();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onCommentSubmission(e) {
    e.preventDefault();
      axios.post('/comments', {comment: this.state.comment, commentOwner: this.props.loggedInUser, currentTrip: this.props.currentTrip})
      .then((result) => {
        this.getComments();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  dateVoteClick(date, e) {
    e.preventDefault();
    axios.post('/addDateVote', {date: date.dateOption, currentTrip: this.props.currentTrip})
      .then((result) => {
        this.getDates();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  activityOptionsClick(activity,e) {
    e.preventDefault();
     axios.post('/addActivityVote', {activityName: activity.activityName, currentTrip: this.props.currentTrip})
    .then((result) => {
      this.getActivities();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div id="contributeTrip">
        <HeaderCh loggedInUser = {this.props.loggedInUser} />
        <div className="container">
          <div className="content narrow">
            <h2 id="pageheader">貢獻給 {'  "' + this.props.currentTrip + '"'} </h2>

            <div className="column1">
              <div className="tripItem">
                <h3>地點</h3><label>{this.state.tripInfo.destination}</label>
              </div>
              <div className="tripItem">
                <h3>價錢</h3> <label>${this.state.tripInfo.est_cost}</label>
              </div>
              <div className="tripItem">
                <h3>時間</h3>
                {this.state.dates.map((date,index) => (<div key={index}><li className="dateItem">{date.dateOption + ' '}
                <button id="voteButton" onClick={this.dateVoteClick.bind(this, date)}>投票</button>
                <span>票: {date.votes}</span> </li></div> ))}
              </div>
              <div className="tripItem">
                <h3>意見</h3>
                {this.state.comments.map((comment,index) => (<div key={index}><div className="commentItem">{comment.comment} - {comment.username}</div></div>))}

                <textarea onChange={(e) => this.setState({comment: e.target.value})} placeholder="Add a comment"></textarea>
                <button id="secondary" onClick={this.onCommentSubmission}>提交</button>
              </div>
            </div>

            <div className="column2">
              <div className="tripItem">
                <h3>活動意見</h3>
                {this.state.activities.map((activity,index) => (
                  <div key={index} id='activityList'>
                    <div className="activityGroup">
                      <li><span>活動:</span> {activity.activityName} </li>
                      <li><span>活動內容:</span> {activity.activityDescription} </li>
                      <li><span>價錢:</span> ${activity.est_cost} </li>
                      <button id="activityVoteButton" onClick={this.activityOptionsClick.bind(this, activity)}>投票</button>
                      <span>票: </span> {activity.vote_count}
                    </div>
                  </div>))
                }

                <h4>加活動</h4>
                <input name="activity" type ="text" placeholder="活動" onChange={e => this.setState({activityName: e.target.value})}/>
                <input name="activity" type ="text" placeholder="活動內容" onChange={e => this.setState({activityDescription: e.target.value})}/>
                <input name="activity" type ="text" placeholder="價錢" onChange={e => this.setState({activityCost: e.target.value})}/>

                <button id="activitybtn" onClick={this.onActivityClick}>+</button>
              </div>
            </div>
          </div>
        </div>
        <YelpSearchCh/>
      </div>
    )
  }
}

export default ContributeTripCh;
