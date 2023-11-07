import { StyleSheet } from 'react-native';

/*color variables to remember
Main dark: #381f1f
Main light: #d4a7ac
White highlight: #d4d2d2

*/
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    minHeight: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 15,
    backgroundColor: '#381f1f',
    flexDirection: 'row',
  },
  footer: {
    minHeight: 60,
    paddingTop: 10,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#381f1f',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  home: {
    alignItems: 'center',
    padding: 5,
    gap: 5,
    minHeight: "20%",
    backgroundColor: '#d4a7ac',
    marginBottom: 0,
    marginTop: 0,
  },
  ruletitle: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center'
  },
  ruleinfo: {
    textAlign: 'center',
    lineHeight: 20,
  },
  goodluck: {
    textAlign: 'center',
    fontSize: 23,
    color: '#381f1f',
    fontWeight: 'bold'
  },
  playbtn: {
    marginTop: 5,
    padding: 10,
    width: 150,
    textAlign: 'center',
    borderRadius: 15,
    color: '#d4d2d2'
  },
  title: {
    color: '#d4d2d2',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    letterSpacing: 15
  },
  author: {
    color: '#d4d2d2',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  scoreBoardView: {
    backgroundColor: '#d4a7ac',
    padding: 10,
    gap: 10,
    minHeight: '50%',
    flex: 1,
    marginBottom: 0,
    marginTop: 0,
    justifyContent: 'flex-start',
  },
  gameboard: {
    backgroundColor: '#d4a7ac',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 1,
    gap: 1,
    minHeight: '50%',
    flex: 1,
    marginBottom: 0,
    marginTop: 0
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  throwButton: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"white",
    fontSize: 20
  },
  gameOverView: {
    width: '100%',
    backgroundColor: '#613636',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    zIndex: 999,
    height: 450,
    gap: 20,
    borderRadius: 15
  },
  savePointsBtn: {
    padding: 10,
    borderRadius: 15
  },
  gameOverText: {
    color: 'white',
    fontSize: 18
  },
  throwsLeft: {
    color: 'black',
    fontSize: 18
  },
  newGameButton: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    borderRadius: 15
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  viewTitle: {
    fontSize: 25,
    color: "#381f1f",
    textAlign: 'center',
    padding: 20
  },
  clearScoresBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    width: 150,
    alignItems: 'center',
    alignSelf: 'center'
  },
    saveNameBtn: {
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    width: 150,
    alignItems: 'center',
    alignSelf: 'center'
    },
    nameInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    width: 200,
    textAlign: 'center'
    }
});