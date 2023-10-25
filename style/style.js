import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    minHeight: 60,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  home: {
    alignItems: 'center',
    padding: 30,
    gap: 10,
    minHeight: 'auto'
  },
  ruletitle: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center'
  },
  ruleinfo: {
    textAlign: 'center',
    lineHeight: 25,
  },
  goodluck: {
    textAlign: 'center',
    fontSize: 23,
    color: '#FC42B2'
  },
  playbtn: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 15,
    color: 'white'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#d4a7ac',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 10,
    minHeight: 'auto',
    flex: 1,
    marginBottom: -25,
    marginTop: -15
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
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  }
});