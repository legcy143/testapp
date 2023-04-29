import React, { useState ,useRef, useEffect} from 'react';
import {SafeAreaView,ScrollView,StyleSheet,Text, useColorScheme, TextInput, View, Button , Pressable , TouchableOpacity, Alert} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {requestUserPermission , notificationListenear} from "./utils/NotificationService"
import axios from 'axios';

//   {"token":"foQlCIWlRWSpq8eT9g9OZB:APA91bE2VYcpRQxzurW-ejMLg2XJUJOh2r-iRghBUugjbqvzTYBZX8IdOgbDPHKl2JNflCzUflWgx9PscbuQccsmETGdXmw5WsImykceUinX6aZQMPvI7mfahry40XwP9WHTtc2QjVju",
//   "title":"hii bro",
//   "body":"i am from node js 4"
// }

function App(): JSX.Element {
  useEffect(() => {
    requestUserPermission();
    notificationListenear();
    console.log("ok i am in useeffect");
  }, [])
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [message, setmessage] = useState("")
  const [count, setcount] = useState(0);
  const [resText, setresText] = useState("restext")
  let resarr = [{res:"first res"}]

  let myToken = "foQlCIWlRWSpq8eT9g9OZB:APA91bE2VYcpRQxzurW-ejMLg2XJUJOh2r-iRghBUugjbqvzTYBZX8IdOgbDPHKl2JNflCzUflWgx9PscbuQccsmETGdXmw5WsImykceUinX6aZQMPvI7mfahry40XwP9WHTtc2QjVju"

  let notificationMessage = {
    token: myToken,
    title:"title goes here",
    body:message
  }

  const btnCLick = async()=>{
    setresText("response before fetch 😢..")
    try {
      let url;
      url = "https://backendnotification-production.up.railway.app/notification"
      let res = await axios.post(url , notificationMessage);
      console.log(res);
      setresText("response  😊..")
    } catch (error) {
      console.log(error)
      setresText("error 😢.")
    }
    setcount(count+1)
  }
  // btnCLick()

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView>
        <Text style={{fontSize:27}}>hello there ti works </Text>
        <Text style={{fontSize:20}}>{message}  {count} </Text>
        <TextInput style={styles.input}
        value={message}
        placeholder='Enter message ..'
        onChangeText={setmessage}/>
        <Button title="notify me" onPress={():any=>btnCLick()}/>
        <Text style={{fontSize:20 , padding:5 , fontWeight:"bold"}}>RESPONSE = </Text>
        <Text style={{fontSize:20 , padding:10 }}>{resText}</Text>
        {/*
        {
          resarr?.map((e)=>{
            return(
              <Text style={{fontSize:20 , padding:10 }}>{`e`}</Text>
            )
          })
        } */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input:{
    borderRadius:10,
    borderWidth:2,
    fontSize: 23,
    margin: 30,
    width:"80%",
    borderColor: "white",
  },
  btn:{
    margin:"auto",
    padding:10,
    width:"90%",
    backgroundColor:"red",
    textAlign:"center",
  }
});

export default App;
