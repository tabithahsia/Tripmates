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
      vote: 0,
      yelpInfo: {},
      yelpResults: {}
    };

    this.getTripName = this.getTripName.bind(this);
    this.getDates = this.getDates.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.getComment = this.getComment.bind(this);
    this.onActivityClick = this.onActivityClick.bind(this);
    this.onCommentSubmission = this.onCommentSubmission.bind(this);
    this.dateVoteClick = this.dateVoteClick.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.updateInputs = this.updateInputs.bind(this);
    this.activityOptionsClick = this.activityOptionsClick.bind(this);

  }

  componentDidMount() {
  	this.getTripName();
    this.getDates();
    this.getActivities();
    this.getComment();
    // this.getDateVotes();
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
        this.getComment();
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

  submitSearch(input, e) {
    e.preventDefault();

    axios.get('/yelp', {
      params: {
        term: input.term,
        location: input.location
      }
    })
      .then((response) => {
        console.log('resdata', response.data.resultArray)
        var yelpResults = this.state.yelpResults;
        yelpResults['entries'] = response.data.resultArray;
        this.setState({ yelpResults });
      })
      .catch(err => {
        console.error("Error", err);
      })
  }

  updateInputs(e) {
    var yelpInfo = this.state.yelpInfo;
    var name = e.target.name;
    var value = e.target.value;

    yelpInfo[name] = value;
    this.setState({ yelpInfo });
  }
  
  activityOptionsClick(activity,e) {
    e.preventDefault();
    console.log('activity', activity.activityName);
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
    var yelpResults = this.state.yelpResults.entries;

    return (

      <div>
        <Header loggedInUser = {this.props.loggedInUser} />

        <div id="contributeTripParent">
          <h4 id="subheader"> stay trippy! </h4>

          <div id="firstHalf">
            <h1>Destination</h1><label>{this.state.tripName.destination}</label> <br/>
            <h1>Est. Cost</h1> <label>${this.state.tripName.est_cost}</label><br/>
            <h1>Date Options</h1><br/>
            {this.state.dates.map(date => (<div><div>{date.dateOption + ' '}<button id="voteButton" onClick={this.dateVoteClick.bind(this, date)}>vote</button></div> <div><strong>Votes: </strong>{date.votes}</div><br/> </div> ))}

            <h1> Comments: </h1><br/>
            <label>Add a comment</label>
            {this.state.comments.map(comment => (<div><div>{comment.comment} - {comment.username}</div><br/></div>))}

            <textarea rows="4" cols="40" onChange={(e) => this.setState({comment: e.target.value})} placeholder="add a comment!"></textarea>
            <button id="secondary" onClick={this.onCommentSubmission}>Submit</button>
          </div>

          <div id="secondHalf">

            <h1>Activity Options</h1>
            {this.state.activities.map(activity => (
              <div><br/>
                <div>   <strong>Name:</strong> {activity.activityName}<br/>
                        <strong>Description:</strong> {activity.activityDescription}<br/>
                        <strong>Cost:</strong> ${activity.est_cost} <button id="voteButton" onClick={this.activityOptionsClick.bind(this, activity)}>vote</button><br/>
                        <strong>Vote: </strong> {activity.vote_count}
                    </div>
                </div>
              )
             )
            }
            <br/><br/>
            <h1>Add an Activity</h1>

            <input name="activity" type ="text" placeholder="Activity name" onChange={e => this.setState({activityName: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Description/Link" onChange={e => this.setState({activityDescription: e.target.value})}/><br/><br/>
            <input name="activity" type ="text" placeholder="Cost" onChange={e => this.setState({activityCost: e.target.value})}/>

            <button id="activitybtn" onClick={this.onActivityClick}>+</button>


          </div>
        </div>
        <br></br>
        <div id="form_container">
          <h4>Search Yelp For Suggestions</h4>
          <form onSubmit={this.submitSearch.bind(this, this.state.yelpInfo)}>
            <div className="form_element">
              <input name="term" type="text" placeholder='Activity' onChange={this.updateInputs} />
            </div>

            <div className="form_element">
              <input name="location" type="text" placeholder='Location' onChange={this.updateInputs} />
            </div>
            <button id="mainCTA">Search Yelp</button>
          </form>
          <br></br>
          {
            yelpResults ? yelpResults.map((entry, index) => {
              return (<div key={index}>
                {entry.name} - Rating {entry.rating}/5
                  <br></br>
                <div id="pic_container">
                  <img src={entry.image_url}></img>
                </div>
              </div>)

            }) : null
          }
        </div>
      </div>
    )
  }
}

export default ContributeTrip;
