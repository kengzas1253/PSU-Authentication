import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView,Image,TextInput ,Button,View} from 'react-native';
import axios from 'axios'
import psu from './img/Logo-PSU.png'
export default function App() {
  const [students, setStudents] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [surname, setSurname] = useState('');
  const [id, setID] = useState('');
  const [year,setYear] = useState(' ')
  const [pid,setPid] = useState(' ')
  const getStudents = async () => {
    const result = await axios.get(`https://psu-auth-5735512153.herokuapp.com/psu_auth`)
    setStudents(result)
  }
  useEffect(()=>{
    getStudents();
 },[])
  const myStyle= StyleSheet.create({
    ScrollView:{
      marginHorizontal:20  
    },
    Text:{
      fontSize:30
    },
    Image:{
      width: 300,
      height: 200,
    }
  })
  const login = async ()=>{
    try {
      const res = await axios.post("https://psu-auth-5735512153.herokuapp.com/psu_auth", {
        username,
        password,
      })
        setname(res.data.PSU_PASSPORT.firstname)
        setSurname(res.data.PSU_PASSPORT.lastname)
        setID("รหัสนักศึกษา "+res.data.PSU_PASSPORT.stID)
        setYear("ชั้นปีที่ "+ res.data.PSU_PASSPORT.year)
        setPid("รหัสบัตรประชาชน "+ res.data.PSU_PASSPORT.P_Id)
    
    } catch (error) {
       alert("PSU PASSPORT or Password is incorrect!")
       setname('')
        setSurname('')
        setID('')
        setYear('')
        setPid('')
    }
        
      
       
       
    
  }
  const printStudents = ()=>{
    if(students !=''){
      return(
      <Text>server is connect  {students.password}</Text>
      )
    }
    else{
      return(
        <Text>server is connot connect {students.name}</Text>
      )
    }
}
  return (
    <SafeAreaView >
    <ScrollView style={myStyle.ScrollView}>
    <Image style={myStyle.Image}
        source={psu}
      />
    <Text style={myStyle.Text}>PSU Passport show data</Text>
    <View>{printStudents()}</View>
     <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,marginTop: 20}}
      placeholder="PSU Passport Accout Name"
      onChangeText={text => setUsername(text)}
    />
     <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 ,marginTop: 20}}
      placeholder="Password"
      secureTextEntry
      onChangeText={text => setPassword(text)}
    />
    <View  style={{marginTop: 20}}>
       <Button 
     onPress={login}
     title="Summit"
     color="#841584"
    />
    </View>
   
      {/* <Text style={myStyle.Text}>{username}{password}</Text> */}
      <Text style={myStyle.Text}>{name} {surname}</Text>
     <Text style={myStyle.Text}>{id} {year}</Text>
      <Text style={myStyle.Text}>{pid}</Text>
    </ScrollView>
  </SafeAreaView>
  );
}
