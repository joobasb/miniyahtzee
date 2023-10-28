import { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { DataTable } from "react-native-paper";
import Header from './Header'
import Footer from './Footer'
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../style/style'

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () =>  {
            getScoreBoardData();
        });
        return unsubscribe;
    }, [navigation])

    const getScoreBoardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort(function(a, b){return b.points - a.points});
                setScores(tmpScores);
            }
        }
        catch(e){
            console.log('read error: ' + e)
        }
    }

    const clearScoreboard = async() => {
        try {
            await AsyncStorage.clear();
            setScores([]);
        }
        catch(e){
            console.log('clear error: ' + e)
        }
    }



    return(
        <>
        <Header/>
        <View style={styles.scoreBoardView}>
            <View>
            <Text style={styles.viewTitle}>Scoreboard</Text>
            {scores.length === 0 ? 
            <Text>Scoreboard is empty</Text>
            :
            scores.map((player, index) => (
                index < NBR_OF_SCOREBOARD_ROWS &&
                <DataTable.Row key={player.key}>
                        <DataTable.Cell><Text>{index + 1}.</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.name}</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.date}</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.time}</Text></DataTable.Cell>
                        <DataTable.Cell><Text>{player.points}</Text></DataTable.Cell>
                </DataTable.Row>
            ))
            }
        </View>

        <View>
            <Pressable 
            onPress={() => clearScoreboard()} style={({pressed}) => [{
                backgroundColor: pressed ? '#381f1f' : '#d4d2d2',
                },
                styles.clearScoresBtn,    
                ]}>
                <Text style={styles.buttonText}>Clear Scoreboard</Text>
            </Pressable>
        </View>
        </View>
        </>
    )
}