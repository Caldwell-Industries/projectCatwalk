import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Overview from './components/Overview/Overview.jsx'
import QandA_app from './components/Q&A/QandA_app.jsx';
import ReviewsAndRatings from './components/ReviewsAndRatings/ReviewsAndRatings.jsx';
import RelatedItemsAndComparison from './components/RelatedItemsAndComparison/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: null,
      currentItemId: null
    }
    this.relatedClick = this.relatedClick.bind(this);
  }

  componentDidMount() {
    axios.get('/products')
      .then((response) => {
        console.log('this is our initial project data:', response.data)

        this.setState({
          currentItem: response.data[0],
          currentItemId: response.data[0].id,
        })
      })
      .catch((error) => {
        console.log('ERRORR in app.jsx axios get request, error:', error)
      })
  }

  // componentDidUpdate() {
  //   //console.log('we are checking for updates YOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')

  // }

  relatedClick(e) {
    console.log('the click worked', e, e.id)
    this.setState({
      currentItem: e,
      currentItemId: e.id
    })
  }

  render() {
    console.log('checking on currentItem state in app.jsx: ', this.state.currentItem);
    console.log('checkig on currentItemId state in app.jsx: ', this.state.currentItemId);
    if (this.state.currentItem) {
      return (
        <div className="rr-column-container">
          <div>HELLO</div>
          < Overview currentItem={this.state.currentItem} widget='Overview'/>
          <RelatedItemsAndComparison data={this.state.data} currentItem={this.state.currentItem} click={this.relatedClick} widget='Related Items And Comparisons'/>
          <QandA_app currentItem={this.state.currentItem} widget='Questions and Answers'/>
          <ReviewsAndRatings itemId={this.state.currentItemId} widget='Reviews and Ratings'/>
        </div>
      )
    } else {
      return null;
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));