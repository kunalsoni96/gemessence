import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'
import Header from './components/Header'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
const TaskTwo = (props:any) => {
    const cameraRef = React.useRef(null);
    const [image, setImage] = React.useState('')
    const [value, setValue] = React.useState('')
    const [takeImage, setTakeImage] = React.useState(true)

    const onSuccess = e => {
      console.log('--',e.bounds.origin)
      setValue(e.data)
      takePicture()
    }

    const takePicture = async () => {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log('Photo taken: ', data.uri);
        setImage(data.uri)
        setTakeImage(false)
      }
    };

    return(
    <View style={styles.container}>
     <Header title="Scan" />
     {takeImage?
     <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={true}
        cameraProps={{
          ref: cameraRef,
          captureAudio: false,
        }}
        reactivate={true}
        reactivateTimeout={2000}
      />
      :
      <View style={{width:'100%', alignItems:'center'}}>
      <Image source={{uri:image}} style={{width:200, height:200}} />
      <Text style={{color:'black'}}>value - {value}</Text>
      <TouchableOpacity style={styles.button} onPress={()=>setTakeImage(true)}>
    <Text style={styles.buttonText}>ReTake Photo</Text>
    </TouchableOpacity>
      </View>
    }
     </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  },
  

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },

  button: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
    width:'50%',
    alignSelf:'center',
    marginTop:5
  },
buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
},
  })

export default TaskTwo