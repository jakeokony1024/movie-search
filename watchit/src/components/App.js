import React from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
const KEY = '9388bd50';

export default class App extends React.Component {
  state = { 
    videos: [], 
    selectedVideo: null 
  }

  componentDidMount() {
    this.onTermSubmit('The Matrix')
  }

  onTermSubmit = async term => {
    const response = await youtube.get('/s', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 5,
        key: KEY
      }
    });
    this.setState({ 
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo}/>
            </div>
            <div className="five wide column">
              <VideoList 
                onVideoSelect={this.onVideoSelect} 
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
