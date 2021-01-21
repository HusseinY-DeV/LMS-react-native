import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Button ,  ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { globalStyles } from '../GlobalStyles';
import Header from './Header';
import StudentAttendance from './StudentAttendance';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Attendance = ({navigation}) => {
    const [sections, setSections] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [id, setId] = useState('');
    const [filled, setFilled] = useState(false);
    const [status, setStatus] = useState('');
     
    // Getting today's date
    let currentDate = new Date();
    currentDate = currentDate.toLocaleString();
    currentDate = currentDate.split(',');
    currentDate = currentDate[0];
    currentDate = currentDate.split('/');
    let year = currentDate.pop();
    currentDate.unshift(year);
    currentDate = currentDate.join('-');
    // _____________________________________________________________________
    
    const setInitialVals = () => {
        setDate(currentDate);
    }

    const storeData = async (value) => {
        await AsyncStorage.setItem('id', value);
    }
    
    const handlePress = async () => {
        const response = await fetch('http://192.168.1.73:8000/api/attendance', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                section: id,
                date: date
            })
        });
        const data = await response.json();
        storeData(data.id);
    }
    const getData = async () => {
        const value = await AsyncStorage.getItem('id');
    }
    useEffect(() => {
        const signal = new AbortController();
         (async () => {
             const sectionResponse = await fetch('http://192.168.1.73:8000/api/sections', {
                 signal : signal.signal
             });
             const sectionData = await sectionResponse.json();
             const dateResponse = await fetch('http://192.168.1.73:8000/api/attendance', {
                 signal : signal.signal
             });
             const dateData = await dateResponse.json();
             setDates([...dateData]);
             setSections([...sectionData.data]);
             setInitialVals();
             setLoading(false);
             if (!loading) {
                 setId(sections[0].id);
             }
         }
         )();
        return () => {
            signal.abort();
        }
    }, [loading]);
    
    return (
        <View style={globalStyles.container}>
            <Header navigation={navigation} name="Attendance" />
            <Text style={globalStyles.status}>{status}</Text>
            {filled ? (
                <StudentAttendance setFilled={setFilled} setStatus={setStatus} />
            ) : (<View style={globalStyles.content}>
                <Text style={globalStyles.text}>Select the section which you want to take attendance for:</Text>
                {loading ? (<Text>Loading ...</Text>)
                    : 
                    (
                            <ScrollView style={globalStyles.select}>
                            <Picker
                                    onValueChange={(val) => {
                                        setStatus('');
                                    setId(val)
                            }}
                                style={{ height: 25, width: 100, fontSize: 16, marginHorizontal: 'auto', marginVertical: 10 }}
                            >
                                {sections.map(sec => {
                                    return (
                                      <Picker.Item label={sec.name} value={sec.id} key={sec.id} />
                                  )
                              })}  
                            </Picker>
                            <Text style={globalStyles.text}>Select the date which you want to take attendance for:</Text>
                            <Picker onValueChange={(val) => {
                                setDate(val)
                            }}
                                
                                style={{
                                    height: 25, width: 110, fontSize: 16,
                                    marginHorizontal: 'auto', marginVertical: 10
                                }}>
                                <Picker.Item label={currentDate} value={currentDate} />
                                    {dates.map(d => {
                                    return (
                                      <Picker.Item label={d.date} value={d.date} key={d.id} />
                                  )
                              })}  
                            </Picker>

                            </ScrollView>
                   )
                }
                  <Button  title="Take Attendance" onPress={() => {
                        handlePress();
                        getData();
                        setFilled(true);
                    }} />  
            </View>)}
            
        </View>
     );
}
 
export default Attendance;