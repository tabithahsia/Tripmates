import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import YelpSearch from './YelpSearch';


class ContributeTrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	tripName: "",
      dates: [],
      activities: [],
      activityName: '',
      activityDescription: '',
      activityCost: '',
      comment: '',
      comments: [],
      vote: 0
    };
    this.getTripName = this.getTripName.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.getComments = this.getComments.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onCommentSubmission = this.onCommentSubmission.bind(this);
    this.dateVoteClick = this.dateVoteClick.bind(this);
    this.activityOptionsClick = this.activityOptionsClick.bind(this);
  }

  componentDidMount() {
  	this.getTripName();
    this.getDates();
    this.getActivities();
    this.getComments();
  }

  getTripName() {
  	axios.get('/tripName')
	   .then((result) => {
	      this.setState({tripName: result.data[0]})
	    })
	    .catch((error) => {
	      console.error(error);
	    })
  }

  getDates() {
    axios.get('/dates')
   .then((result) => {
      this.setState({dates: result.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getActivities() {
    axios.get('/activities')
   .then((result) => {
      this.setState({activities: result.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getComments() {
    axios.get('/comments')
    .then((result) => {
      this.setState({comments: result.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  onActivityClick(e) {
    e.preventDefault();
    var activityObject = {
       activity: this.state.activityName,
       activityDescription: this.state.activityDescription,
       activityCost: this.state.activityCost
    }
    axios.post('/newactivity', activityObject)
      .then((result) => {
            this.getActivities();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onCommentSubmission(e) {
    e.preventDefault();
      axios.post('/comments', {comment: this.state.comment, commentOwner: this.props.loggedInUser})
      .then((result) => {
        console.log(result)
        this.getComments();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //when user clicks on a date, post to database
  dateVoteClick(date, e) {
    e.preventDefault();
    axios.post('/addVote', {date: date.dateOption})
      .then((result) => {
        console.log(result)
        this.getDates();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  activityOptionsClick(activity,e) {
    e.preventDefault();
     axios.post('/addActivityVote', {activityName: activity.activityName})
    .then((result) => {
      console.log(result)
      this.getActivities();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (

      <div id="contributeTrip">
        <Header loggedInUser = {this.props.loggedInUser} />
        <div className="container">
          <div className="content">
            <h3 id="pageheader">Contribute to [tripname]</h3>

            <div className="column1">
              <h1>Destination</h1><label>{this.state.tripName.destination}</label>
              <h1>Est. Cost</h1> <label>${this.state.tripName.est_cost}</label>
              <h1>Date Options</h1>
              {this.state.dates.map((date,index) => (<div key={index}><div>{date.dateOption + ' '}<button id="voteButton" onClick={this.dateVoteClick.bind(this, date)}>vote</button></div> <div><strong>Votes: </strong>{date.votes}</div> </div> ))}

              <h1> Comments: </h1>
              <label>Add a comment</label>
              {this.state.comments.map((comment,index) => (<div key={index}><div>{comment.comment} - {comment.username}</div></div>))}

              <textarea rows="4" cols="40" onChange={(e) => this.setState({comment: e.target.value})} placeholder="add a comment!"></textarea>
              <button id="secondary" onClick={this.onCommentSubmission}>Submit</button>
            </div>

            <div className="column2">
              <h1>Activity Options</h1>
              {this.state.activities.map((activity,index) => (
                <div key={index}>
                  <div>   <strong>Name:</strong> {activity.activityName}
                          <strong>Description:</strong> {activity.activityDescription}
                          <strong>Cost:</strong> ${activity.est_cost} <button id="voteButton" onClick={this.activityOptionsClick.bind(this, activity)}>vote</button>
                          <strong>Vote: </strong> {activity.vote_count}
                      </div>
                  </div>
                )
               )
              }

              <h1>Add an Activity</h1>

              <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/>
              <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/>
              <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>

              <button id="activitybtn" onClick={this.onActivityClick}>+</button>
            </div>
          </div>
        </div>
        <YelpSearch/>
      </div>
    )
  }
}

export default ContributeTrip;
