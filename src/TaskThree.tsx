import React from 'react'
import {View,ToastAndroid, TouchableOpacity, StyleSheet, Text, ActivityIndicator} from 'react-native'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import Header from './components/Header'
import TextRecognition from '@react-native-ml-kit/text-recognition';

import {
    TapGestureHandler,
    GestureHandlerRootView,
    State,
  } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
const TaskThree = (props) => {
    const device = useCameraDevice('back')
    const cameraRef = React.useRef(null)
    const [cameraClick, setCameraClick] = React.useState(true);
    const isFocused = useIsFocused()
    React.useEffect(()=>{
        // processFrame()
    },[])
    

    const processFrame = async () => {
        const frame = await cameraRef.current.takePhoto();
    //    console.log(frame.path)
        const detectedText = await TextRecognition.recognize(`file://${frame.path}`); // Call your text detection function
        console.log(detectedText)
      };

      if (!device) return(
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator  size={40} color={'red'} />
        </View>
    );

    const onFocus = async(event) => {
        if (event.nativeEvent.state !== State.ACTIVE) return;
        const point = {
          x: Math.round(event.nativeEvent.x),
          y: Math.round(event.nativeEvent.y),
        };
        try {
          ToastAndroid.show(
            "Focusing (support=" +
              device.supportsFocus +
              ") on point: " +
              JSON.stringify(point),
            1000
          );
          console.log( await cameraRef.current.focus(point));
        } catch (error) {
          console.error('--',error.message);
        }
      };

    return(
    <View style={styles.container}>
     <Header title="Task Three" />
    <View >
    
    {cameraClick?
    <View style={{width:'100%', height:'100%'}}>
        <GestureHandlerRootView style={{ flex: 1 }}>
      <TapGestureHandler onHandlerStateChange={onFocus}>
         <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        ref={cameraRef}
        photo={true}
      
      />
      </TapGestureHandler>
    </GestureHandlerRootView>
      <TouchableOpacity style={styles.capture_btn} >

      </TouchableOpacity>
    </View>
    :
    <>
    
    <Text>test</Text>
    </>
    }
        
    </View>
     </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    capture_btn:{
        height:80,
        width:80,
        borderRadius:80,
        borderWidth:5,
        borderColor:'white',
        position:'absolute',
        bottom:'10%',
        alignSelf:'center'
    }
})

export default TaskThree