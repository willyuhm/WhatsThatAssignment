import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81bff7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    backgroundcolour: '#6190ba',
  },
  links: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 19,
  },
  dropdown: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#81bff7',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  message: {
    alignSelf: 'flex-start',
    fontSize: 16,
    maxWidth: '70%',
    padding: 8,
    backgroundColor: '#6190ba',
    borderRadius: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#81bff7',
  },
  chatHeader: {
    justifyContent: 'center',
    fontSize: 30,
  },
  author: {
    fontWeight: 'bold',
  },
  sendMessage: {
    fontSize: 18,
    height: 30,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  popupContainer: {
    backgroundcolour: '#555057',
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  }

});

export default styles;