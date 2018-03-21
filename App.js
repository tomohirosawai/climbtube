import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  PixelRatio,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Header from './Header.js';
import YouTubeComponent from './Youtube.js';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const width = Dimensions.get('window').width;
    this.state = {
      //API
      isLoading: true,
      offSet: 0,
      total: 0,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      _data: null,

      // infinateScroll
      canLoadMore: true,
      isLoadingMore: false,

      //Window Size
      width: width,
    };
  }

  componentDidMount(){
    this._loadInitialData();
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicator}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return(
        <View>
          <Header width={this.state.width} />
          <ListView
            style={styles.container}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
            dataSource={this.state.dataSource}
            renderRow={(data) =>
              <YouTubeComponent key={data.id} id={data.id} videoId={data.video_id} width={this.state.width}/>
            }
            onEndReachedThreshold = {20}
            onEndReached={() => {
              if (this.state.canLoadMore && !this.state.isLoading) {
                this.setState({ isLoadingMore: true }, () => this._loadMoreData())
              }
            }}
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                  <View style={{ flex: 1 }}>
                    <ActivityIndicator size="small" />
                  </View>
              );
            }}
          />
        </View>
      )
    }
  }


  _loadData(callback){
    axios.get('https://climbtube.herokuapp.com/',{
      params: {
        offset: this.state.offSet
      }
    }).then(response => {
      callback(response)
    })
  }

  _loadInitialData(){
    this._loadData(response => {
      const data = response.data.videos;
      const info = response.data.info;
      this._setData(data, info);
    })
  }

  _loadMoreData(){
    this._loadData(response => {
      const data = this.state._data.concat(response.data.videos);
      const info = response.data.info;
      this._setData(data, info);
    })
  }

  _setData(data, info){
    this.setState({
      isLoading: false,
      isLoadingMore: false,
      dataSource: this.state.dataSource.cloneWithRows(data),
      _data: data,
      offSet: info.count,
      total: info.total,
    });
    if (this.state.offSet >= this.state.total) {
      this.setState({
        canLoadMore: false
      })
    } else {
      this.setState({
        canLoadMore: true
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
