import React from 'react';
import dummyReviewData from './dummyReviewData.js';
import axios from 'axios';
import SortingOptions from './SortingOptions.jsx';
import ReviewTile from './ReviewTile.jsx';
import WriteReview from './WriteReview.jsx';


class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      visibleReviewVal: 2,
      totalReviews: 0,
      moreReviewsVis: true,
      currentOrder: 'relevant',
      //showWriteReview: false,
      test: ''

    };
    this.handleSortingChange = this.handleSortingChange.bind(this);
    this.handleMoreClick = this.handleMoreClick.bind(this);
    this.handleHideAddClick = this.handleHideAddClick.bind(this);
    this.onlyShowTwo = this.onlyShowTwo.bind(this);
  }

  componentDidMount() {
    //PROBABLY CAN REMOVE THIS, CURRENTLY NOT IN USE
  }

  componentDidUpdate(prev) {
    if (this.props.itemId !== prev.itemId) {
      console.log('UPDATE from inside ReviewList')
      this.onlyShowTwo();
    }
  }

  /* *********FUNCTIONS************ */

  //reset the number of reviews to show when there is a new item clicked
  onlyShowTwo() {
    this.setState({
      visibleReviewVal: 2
    })
  }

  //click handler for 'more reviews' button
  handleMoreClick(event) {
    event.preventDefault();
    this.setState({
      visibleReviewVal: this.state.visibleReviewVal += 2,
      //currReviews: this.props.reviewData.slice(0, this.state.visibleReviewVal)
    })
  }

  //will show/hide the submission form
  handleHideAddClick(event) {
    event.preventDefault();
    this.setState({
      showWriteReview: !this.state.showWriteReview
    });
  }

  //function that will be passed down to SortingOptions that will change sorting order of the currReviews
  handleSortingChange(e) {
    this.setState({
      currentOrder: e.target.value
    });
  }

  render() {

    return (
      <div>
        <div>
          {/* Sorting Dropdown Menu */}
          <form onChange={this.handleSortingChange}>
            {this.props.numReviews} reviews, sorted by
          <select >
              <option>Relevant</option>
              <option>Helpful</option>
              <option>Newest</option>
            </select>
          </form>
        </div>
        {this.props.reviewData.slice(0, this.state.visibleReviewVal).map((item, index) => {

          return (
            <ReviewTile key={index} stars={this.props.stars} itemId={this.props.itemId} reviewData={item} />
          )
        })}
        <form>
          <button onClick={this.handleMoreClick}>
            More Reviews
          </button>
          <button onClick={this.handleHideAddClick}>
            Add a review +
          </button>
        </form>
        {this.state.showWriteReview ? <WriteReview hide={this.handleHideAddClick} /> : null}
      </div>
    );
  }
};

export default ReviewList;