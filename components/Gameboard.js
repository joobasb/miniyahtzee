import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import Header from './Header'
import Footer from './Footer'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style'
import { Container, Row, Col } from "react-native-flex-grid";
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT, SCOREBOARD_KEY } from "../constants/Game"
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


let board = [];


export default Gameboard = ({ navigation, route }) => {

const [playerName, setPlayerName] = useState('');
const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
const [status, setStatus] = useState('Throw dices');
const [gameEndStatus, setGameEndStatus] = useState(false);
// Ovatko nopat valittu
const [selectedDices, setSelectedDices] =
    useState(new Array(NBR_OF_DICES).fill(false));
// Noppien silmäluvut
const [diceSpots, setDiceSpots] = 
    useState(new Array(NBR_OF_DICES).fill(0));
// Onko silmäluvulle valittu pisteet
const [selectedDicePoints, setSelectedDicePoints] = 
    useState(new Array(MAX_SPOT).fill(false));
// Kerätyt pisteet
const [dicePointsTotal, setDicePointsTotal] =
    useState(new Array(MAX_SPOT).fill(0));
// Tulostaulun pisteet
const [scores, setScores] = useState([]);
const totalSum = parseInt(dicePointsTotal.reduce((a, b) => a + b, 0))
/* const [newPointsRow, setNewPointsRow] =  */
/* const [totalTurns, setTotalTurns] = useState(6); */
const getFullDate=()=> {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '.' + month + '.' + year
}
const getTime=()=> {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes() ;
    return hours + ':' + minutes;
}

const checkBonusPoints = () => {
    const totalSumNoBonus = totalSum;
    if (totalSum >= BONUS_POINTS_LIMIT) {
        return totalSumNoBonus + BONUS_POINTS
    } else {
        return totalSumNoBonus
    }
}

const resetGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus('Throw dices');
    setGameEndStatus(false);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setScores([]);
  };


useEffect(() => {
    if (playerName === '' && route.params?.player) {
        setPlayerName(route.params?.player);
    }
}, []);

useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        getScoreBoardData();
    });
    return unsubscribe;
}, [navigation])

const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++){
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                key={"dice" + dice}
                onPress={() => selectDice(dice)}>
                <MaterialCommunityIcons
                name={board[dice]}
                key={"dice" + dice}
                size={50}
                color={getDiceColor(dice)}>
                </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++){
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text key={"pointsRow" + spot}>
                    {getSpotTotal(spot)}
                </Text>
            </Col>
        )
    }

    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                key={"buttonsRow" + diceButton}
                onPress={() => selectDicePoints(diceButton)}>
                <MaterialCommunityIcons
                name={"numeric-" + (diceButton + 1) + "-circle"}
                key={"buttonsRow" + diceButton}
                size={35}
                color={getDicePointsColor(diceButton)}>
                </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const selectDicePoints = (i) => {
            if (nbrOfThrowsLeft === 0){
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedPoints[i]){
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0 );
                points[i] = nbrOfDices * (i + 1)
            } else {
                setStatus('You already selected points for ' + (i + 1));
                return points[i];
            }
            setDicePointsTotal(points)
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(3);
            setSelectedDices([]);
            setStatus('Throw the dices again')
            return points[i];

    } else {
        setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points');
    }
}

    const savePlayerPoints = async() => {
        const newKey = scores.length + 1;
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: getFullDate(), // hae pvm funktiolla
            time: getTime(), //hae klo funtiolla
            points: checkBonusPoints()//yhteispisteet (mahdollinen bonus mukaan)
        }
        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        }
        catch(e){
            console.log('save error: ' + e);
        }
    }

    const getScoreBoardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }
        }
        catch(e){
            console.log('read error: ' + e)
        }
    }

    const throwDices = () => {
        if (selectedDicePoints.every(x => x) && !gameEndStatus){
            setNbrOfThrowsLeft(0);
            checkBonusPoints();

            return 1
        }
        else if (nbrOfThrowsLeft === 0 && !gameEndStatus){
            setStatus('Select your points before the next throw')
            return 1;
        } else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false);
            diceSpots.fill(0);
            dicePointsTotal.fill(0);
        }
        let spots = [...diceSpots];
        for ( let i = 0 ; i < NBR_OF_DICES ; i++ ){
            if (!selectedDices[i]){
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus){
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        else {
            setStatus('You have to throw dices first');
        }
    }

    function getDiceColor(i) {
        return selectedDices[i] ? '#381f1f' : '#d4d2d2';
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] && !gameEndStatus ? 'black' : '#d4d2d2';
    }


    return(
        <>
        <Header/>
        <View style={styles.gameboard}>
        <Text style={styles.viewTitle}>Gameboard</Text>
        <Text style={styles.throwsLeft}>Throws left: {nbrOfThrowsLeft}</Text>
            <Container fluid>
                <Row>{dicesRow}</Row>
            </Container>
           
            <Text>{status}</Text>
            {!selectedDicePoints.every(x => x) ? 
            <Pressable onPress={() => throwDices()}
                style={({pressed}) => [{
                    backgroundColor: pressed ? '#381f1f' : '#d4d2d2',
                    },
                    styles.throwButton,    
                    ]}>
                <Text style={styles.buttonText}>Throw dices</Text>
            </Pressable>
            : 
            <View style={styles.gameOverView}>
                <Text style={styles.gameOverText}>Game over</Text>
                <Text style={styles.gameOverText}>You scored a total points of {checkBonusPoints()}</Text>
                <Pressable style={({pressed}) => [{
                    backgroundColor: pressed ? '#381f1f' : '#d4d2d2',
                    },
                    styles.savePointsBtn,    
                    ]} onPress={ () => savePlayerPoints()}>
                    <Text style={styles.buttonText}>Save your points if you dare</Text>
                </Pressable>
                    <Pressable onPress={resetGame} style={({pressed}) => [{
                    backgroundColor: pressed ? '#381f1f' : '#d4d2d2',
                    },
                    styles.newGameButton,    
                    ]}
                    >
                    <Text style={styles.buttonText}>New Game</Text>
                </Pressable>
            </View>
            }
            <Container fluid>
                <Row style={styles.row}>{pointsRow}</Row>
            </Container>
            <Container fluid>
                <Row>{pointsToSelectRow}</Row>
            </Container>
            <Text style={styles.viewTitle}>Points:{"\n"}{totalSum}</Text>
            <Text style={styles.viewTitle}>Player: {playerName}</Text>
        </View>

        </>
    )
}