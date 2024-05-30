import {
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet, 
    Image,
    } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const Header = (props:any) => {
    const navigation = useNavigation();
    return(
    <View style={styles.container}>
        <View style={styles.box}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
        <Image source={{uri:'https://icons.veryicon.com/png/o/miscellaneous/lianghr/bars-19.png'}} style={styles.icon_image}/>
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
      width:'100%',
      height:60,
      backgroundColor:'white',
      justifyContent:'center',
      position:'absolute',
      top:0
    },
    title:{
      color:'black',
      fontWeight:'bold',
      fontSize:20
    },
    icon_image:{
        width:30,
        height:30,
        marginHorizontal:5
    },
    box:{
        flexDirection:'row'
    }
})

export default Header