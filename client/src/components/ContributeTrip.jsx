import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';


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
      commentOwner: '',
      vote: 0
    };

    this.getTripName = this.getTripName.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.getComment = this.getComment.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onCommentSubmission = this.onCommentSubmission.bind(this);
    this.getCommentOwner = this.getCommentOwner.bind(this);
    this.dateVoteClick = this.dateVoteClick.bind(this);
  }

  componentDidMount() {
  	this.getTripName();
    this.getDates();
    this.getActivities();
    this.getComment();
    this.getCommentOwner();
    this.getDateVotes();
  }

  getTripName() {
  	axios.get('/tripName')
	   .then((result) => {
	     //console.log(result.data);
	      this.setState({tripName: result.data[0]})
	    })
	    .catch((error) => {
	      console.error(error);
	    })
  }

    getDates() {
      axios.get('/dates')
     .then((result) => {
       console.log('datesdata', result.data);
        this.setState({dates: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
    }

    getActivities() {
      axios.get('/activities')
     .then((result) => {
       // console.log('actdata', result.data);
        this.setState({activities: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
    }

    getComment() {
      axios.get('/comments')
      .then((result) => {
        this.setState({comments: result.data})
      })
      .catch((error) => {
        console.error(error);
      })
    }

    getCommentOwner () {
      axios.get('/commentOwner')
      .then((result) => {
        this.setState({commentOwner: result.data[0].username})
      })
      .catch((error) => {
        console.error(error);
      })
    }
    //get date votes to be rendered next time user logs in
    getDateVotes () {

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
          console.log(result)
          this.props.history.push('/contributeTrip')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    onCommentSubmission(e) {
      e.preventDefault();

      axios.post('/comments', {comment: this.state.comment + ' -' + this.state.commentOwner})
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //when user clicks on a date, post to database
    dateVoteClick(e) {
      e.preventDefault();
      this.setState({vote: this.state.vote++})
      alert(this.state.vote);
      axios.post('/addVote', {vote: this.state.vote})
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      }

  render() {
    return (

      <div>
        <Header />

        <div id="contributeTripParent">
          <h4 id="subheader"> stay trippy! </h4>

          <div id="firstHalf">
            <h1>Destination</h1><label>{this.state.tripName.destination}</label> <br/>
            <h1>Est. Cost</h1> <label>${this.state.tripName.est_cost}</label><br/>
            <h1>Date Options</h1><br/>
            {this.state.dates.map(date => (<div><div>{date.dateOption + ' '}<button id="voteButton" onClick={this.dateVoteClick}>vote</button></div> <br/> </div> ))}


            <br/><h1> Comments </h1><br/>
            {this.state.comments.map(comment => (<div><div>{comment.comment}</div><br/></div>))}

            <textarea rows="4" cols="40" onChange={(e) => this.setState({comment: e.target.value})} placeholder="add a comment!"></textarea>
            <button id="secondary" onClick={this.onCommentSubmission}>Submit</button>
          </div>

          <div id="secondHalf">
            
            <h1>Activity Options</h1>
            {this.state.activities.map(activity => (
              <div><br/>
                <div>   <strong>Name:</strong> {activity.activityName}<br/>
                        <strong>Description:</strong> {activity.activityDescription}<br/> 
                        <strong>Cost:</strong> ${activity.est_cost} <button id="voteButton" onClick={e => e.preventDefault()}>vote</button><br/>
                    </div>
                </div>
              )
             )
            }<br/><br/>
            <h1>Add an Activity</h1>

            <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>
            
            <button id="activitybtn" onClick={this.onActivityClick}>+</button>


          </div>
        </div>
      </div>
    )
  }
}

export default ContributeTrip;
