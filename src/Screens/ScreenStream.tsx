import React from 'react'
import {View, Text, ActivityIndicator, ToastAndroid, Dimensions} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { IStream } from '../Types/interfaces'
import Video from 'react-native-video';


type StreamProps = {
    navigation:any,
    route:any
}

export const ScreenStream:React.FC<StreamProps> = (props) => {
    const { stream } = props.route.params
    const [orientation, setOrientation] = React.useState(false)
    const [src, setSrc] = React.useState(stream.stream)
    const [player, setPlayer] = React.useState<Video | null>()
    const [liveStream, setLive] = React.useState(true)
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [paused, setPaused] = React.useState(false);
    const [playerState, setPlayerState] = React.useState(PLAYER_STATES.PLAYING);
    React.useEffect(() => {
      let isMounted = true;
      Dimensions.addEventListener('change', ({window: {width, height}}) => {
          if(width > height) {
            setOrientation(true)
            console.log('landscape')
          }
          else {
            console.log('portrait')
            setOrientation(false)
          }
      })
      return () => { isMounted = false };
    }, [orientation]);
    React.useLayoutEffect(() => {
        if(!isFullScreen){
        props.navigation.setOptions({
            header: undefined,
            title: stream.title,
               headerStyle: {
                backgroundColor: '#343a40',
                elevation: 2,
              },
              headerTintColor: '#fff',
              headerTitleAlign: 'center', 
              headerTitleStyle: {fontSize: 14}
        });
        }
        if (isFullScreen) {
          props.navigation.setOptions({
            header: () => null
        });
        }
      }, [props.navigation, isFullScreen]);
    const update = () => {
      setSrc('https://hls.lideo.tv/id.stream/index.m3u8')
      setTimeout(() => {
        setSrc(stream.stream)
      }, 20)
      setLive(true)
    }
    return (
      <View style={{width: '100%', height: '100%', backgroundColor:'rgba(32, 38, 44, 1)'}}>
        <View
        style={{}}>
        <Video
        source={{uri: src,}}
        ref={(refPlayer) => setPlayer(refPlayer)}
        onLoadStart={() => {
          console.log('Загрузка начата')
          setIsLoading(true)
        }}
        onLoad={() => {
          console.log('Загрузка окончена')
          setIsLoading(false)
        }}
        onProgress={(data) => {
            setCurrentTime(data.currentTime)
        }}
        onError={(err) => {
          console.log(err)
          ToastAndroid.show("Невозможно подключится к трансляции, проверьте интернет соединение", ToastAndroid.SHORT);
        }}
        bufferConfig={{
          maxBufferMs: 50000,
          minBufferMs: 5000,
        }}
        poster={stream.preview}
        minLoadRetryCount={5}
        fullscreen={orientation || isFullScreen}
        fullscreenAutorotate={true}
        fullscreenOrientation='landscape'
        paused={paused}
        controls={false}
        reportBandwidth={true}
        resizeMode='contain'
        style={{width:'100%', height: orientation || isFullScreen ? '100%' : 231, backgroundColor: '#000', zIndex: 0}}
        />
        <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="rgba(0,0,0,0)"
        onFullScreen={() => setIsFullScreen(!isFullScreen)}
        onPaused={() => {
          setPaused(!paused)
          setPlayerState(!paused ? PLAYER_STATES.PAUSED : PLAYER_STATES.PLAYING)
          setLive(false)
        }}
        onReplay={() => {}}
        onSeek={()=> {}}
        onSeeking={() => {}}
        playerState={playerState}
        progress={currentTime}
        containerStyle={{}}
      >
        <MediaControls.Toolbar>
          <Button disabled={liveStream} containerStyle={{position: 'absolute', right: 0, top: 10}} title=' LIVE' 
          icon={<Icon name='circle' size={12} color='#f00'></Icon>}
          buttonStyle={{backgroundColor:'rgba(0,0,0,0)', borderWidth: 1, 
          borderStyle: 'solid', borderColor: 'white', borderRadius: 10}}
          disabledStyle={{backgroundColor:'rgba(0,0,0,0)', borderRadius: 10, borderWidth: 0}}
          onPress={update}></Button>
        </MediaControls.Toolbar>
      </MediaControls>
      </View>
      </View>
    )
}