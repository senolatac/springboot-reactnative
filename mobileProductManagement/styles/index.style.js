import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  softContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18
  },
  drawerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: 75,
    marginBottom: 10,
  },
  productLogo: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    marginBottom: 10,
  },
  drawerImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    marginTop: 20,
  },
  drawerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#61dafb',
    paddingTop: 10
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInput: {
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19,
    width: '100%',
    marginBottom: 10,
  },
  buttonTitle: {
    width: "100%",
    paddingHorizontal: 0,
    marginHorizontal: 0,
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    width: '95%',
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  subButtonTitle: {
    width: "100%",
    paddingHorizontal: 0,
    marginHorizontal: 0,
    fontWeight: 'bold',
    fontSize: 16
  },
  subButton: {
    alignSelf: 'center',
    height: 34,
    justifyContent: 'center',
  },
  alertDanger: {
      padding: 4,
      width: '100%',
      color: '#721c24',
      backgroundColor: '#f8d7da',
      borderColor: '#f5c6cb',
      borderRadius: 5
  },
  alertSuccess: {
      padding: 4,
      width: '100%',
      color: '#155724',
      backgroundColor: '#d4edda',
      borderColor: '#c3e6cb',
      borderRadius: 5
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 21,
    color: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black'
  },
  leftAlign: {
    textAlign: 'left',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 5
  }
});
