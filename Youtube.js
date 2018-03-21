import React from 'react';
import {
  StyleSheet,
  View,
  PixelRatio,
} from 'react-native';
import YouTube from 'react-native-youtube';

export default class YouTubeComponent extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: false,
    isLooping: false,
    duration: 0,
    currentTime: 0,
    fullscreen: true,
    containerMounted: false,
    containerWidth: null,
    containerHeight: null,
    rel: false,
    showinfo: false,
    modestbranding: true,
  };

  componentWillMount(){
    if (!this.state.containerMounted) this.setState({ containerMounted: true });
    const width = this.props.width;
    if (this.state.containerWidth !== width)
     if (this.props.id == 1) this.setState({ containerWidth: width, containerHeight: width / ( 16 / 9), isPlaying: true, fullscreen: false });
     else this.setState({ containerWidth: (width / 2) - 2 , containerHeight: (width / 2) - 2});
  }

  render() {
    return (
      <View
      style={[
        {
          height: PixelRatio.roundToNearestPixel(this.state.containerHeight),
          width: PixelRatio.roundToNearestPixel(this.state.containerWidth),
        },
        styles.player,
      ]}
      >
       {this.state.containerMounted && (
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyAhzdgVcC2DJOAp6_gWPooylajqTn27rP0"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={this.props.videoId}
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            rel={this.state.rel}
            showinfo={this.state.showinfo}
            modestbranding={this.state.modestbranding}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(this.state.containerHeight),
                width: PixelRatio.roundToNearestPixel(this.state.containerWidth),
              },
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    marginVertical: 2,
  },
});
