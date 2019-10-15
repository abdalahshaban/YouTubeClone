import React, { Component } from "react";
import { Grid } from '@material-ui/core'
import { SearchBar, VideoDetail, VideoList } from './components'
import youtube from './api/youtube'
class App extends Component {
    state = {
        videos: [],
        selectedVideo: null
    }

    onVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        })
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 10,
                key: 'AIzaSyBvTQxTH1WLHLP8-RmdMPtSotycvxsdS4s',
                q: searchTerm
            }
        })
        // console.log(response.data.items);
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    componentDidMount() {
        this.handleSubmit('hello')
    }

    render() {
        const { videos, selectedVideo } = this.state
        return (
            <Grid container justify='center' spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            {/*Search Bar*/}
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            {/** video Details */}
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            {/** video list */}
                            <VideoList onVideoSelect={this.onVideoSelect} videos={videos} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default App;