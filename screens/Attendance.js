import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, Button ,  ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { globalStyles } from '../GlobalStyles';
import Header from './Header';
import StudentAttendance from './StudentAttendance';




const Attendance = ({navigation}) => {
    const [sections, setSections] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [filled, setFilled] = useState(false);
    const [id, setId] = useState('');
    const [status, setStatus] = useState('');
    const [attId, setAttId] = useState('');

    // Getting today's date
    let currentDate = new Date();
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();
    let month = currentDate.toLocaleDateString();
    month = month.split('/');
    month = month[0];
    let dateArr = [];
    dateArr.push(year);
    dateArr.push(month);
    dateArr.push(day);
    let todayDate = dateArr.join('-');
    // _____________________________________________________________________
    
    const setInitialVals = () => {
        setDate(todayDate);
    }
    
    const handlePress = async () => {
        const response = await fetch('http://192.168.1.73:8000/api/attendance', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                section: id,
                date: date
            })
        });
        const data = await response.json();
        setAttId(data.id);
        setFilled(true);
    }
    useEffect(() => {
        let active = true;
        if (active)
        {  (async () => {
            const sectionResponse = await fetch('http://192.168.1.73:8000/api/sections');
            const sectionData = await sectionResponse.json();
            const dateResponse = await fetch('http://192.168.1.73:8000/api/attendance');
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
            }
       
        return () => {
            active = false;
        }
    }, [loading]);
    
    return (
        <View style={globalStyles.container}>
            <Header navigation={navigation} name="Attendance" />
            <Text style={globalStyles.status}>{status}</Text>
            {filled ? (
                <StudentAttendance setFilled={setFilled} setStatus={setStatus}
                attId={attId}
                />
            ) : (<View style={globalStyles.content}>
                <Text style={globalStyles.text}>Select the section which you want to take attendance for:</Text>
                {loading ? (<Text>Loading ...</Text>)
                    : 
                    (
                            <ScrollView style={globalStyles.select}>
                            <Picker
                                    onValueChange={(val) => {
                                        setStatus('');
                                        console.log(val);
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
                                <Picker.Item label={todayDate} value={todayDate} />
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
                    }} />  
            </View>)}
            
        </View>
     );
}
 
export default Attendance;