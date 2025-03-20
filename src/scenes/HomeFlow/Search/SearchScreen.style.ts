import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  placeholder: {
    color: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: '#FF4F4F',
    fontSize: 16,
    marginTop: 10,
  },
  resultContainer: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // Android için gölge efekti
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  temp: {
    fontSize: 22,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
});
