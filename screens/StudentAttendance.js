import React from 'react';
import { Text, View, ScrollView , Button, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { globalStyles } from '../GlobalStyles';
import {Picker} from '@react-native-picker/picker';



const StudentAttendance = (props) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    let statuses = [];
    let ids = [];

    const fillStatuses = (i,val) => {
        statuses[i] = val;
    }

    const fillIds = (i, val) => {
        ids[i] = val;
    }

    const setStatuses = (i, val) => {
        statuses[i] = val;
    }

    const handlePress = async () => {
        
        const response = await fetch('http://192.168.1.73:8000/api/attendance/students',
            {
                method: 'POST',
                headers: {
                 'content-type' : 'application/json'    
                },
                body: JSON.stringify({
                    stds: ids,
                    statuses: statuses,
                    id: props.attId
                })
            }
        );
    }

    useEffect(() => {
            (async () => {
                const response = await fetch(`http://192.168.1.73:8000/api/attendance/students/${props.attId}`);
                const data = await response.json();
                setStudents([...data]);
                setLoading(false);
            })()

    }, []);
    return ( 
        <View style={globalStyles.content}>
            {loading ? ( 
                    <Text style={globalStyles.text}>Loading...</Text>     
            )
                :
                (<>
                    <View style={globalStyles.students}>
                        <Text style={{width:100}}>Student Id</Text>
                        <Text style={{width:100}}>First Name</Text>
                        <Text style={{width:100}}>Last Name</Text>
                        <Text style={{width:50}}>Status</Text>
                    </View>
                    <ScrollView>
                    { students.map((s, i) => {
                        return (
                            <View key={i} style={globalStyles.students}>
                                {fillStatuses(i, 1)}
                                {fillIds(i,s.id)}
                                <Text style={{width:100 , marginVertical:10}}>{s.student_id}</Text>
                                <Text style={{width:100, marginVertical:10}}>{s.first_name}</Text>
                                <Text style={{width:100, marginVertical:10}}>{s.last_name}</Text>
                                <Picker
                                onValueChange={(val) => {
                                        setStatuses(i, val);
                                        console.log(statuses);
                                    }}
                                style={{ height: 25, width: 75, fontSize: 10 , marginVertical:10}}
                                >
                                    <Picker.Item label="Present" value={1} /> 
                                    <Picker.Item label="Late" value={0} /> 
                                    <Picker.Item label="Absent" value={-1} /> 
                                    </Picker>
                            </View>
                        )
                    })}
                        <Button title="Submit Attendance"
                            onPress={() => {    
                                handlePress();
                                props.setStatus('Attendance was taken successfuly !')
                                props.setFilled(false);
                            }
                            }
                        
                        />
                    </ScrollView>
               </> )    
            }
        </View>
     );
}
 
export default StudentAttendance;


