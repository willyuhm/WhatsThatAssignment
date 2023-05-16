import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  links: {
    color: 'blue',
  },
  dropdown: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  }
});

export default styles;