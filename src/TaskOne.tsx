import React from 'react'
import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import Header from './components/Header'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
const TaskOne = () => {
  const [recognizedText, setRecognizedText] = React.useState(null)

  const takePhoto = async(data:string) => {
   const result = await TextRecognition.recognize(data)
   setRecognizedText(result?.text)
  }

  const launch_camera = async() => {
    const res = await launchCamera({mediaType:'photo'})
    takePhoto(res.assets[0].uri)
  }

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        takePhoto(imageUri)
      }
    });
  };

    return(
    <View style={styles.container}>
     <Header title="Read Book" />
    <View style={{paddingBottom:10}}>
    <TouchableOpacity style={styles.button} onPress={()=>launch_camera()}>
    <Text style={styles.buttonText}>Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>openImagePicker()} style={styles.button}>
    <Text style={styles.buttonText}>Choose from Gallery</Text>
    </TouchableOpacity>
    </View>
    <ScrollView>
    <Text style={{color:'black'}}>{recognizedText}</Text>
    </ScrollView>
     </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingTop:'20%'
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

export default TaskOne