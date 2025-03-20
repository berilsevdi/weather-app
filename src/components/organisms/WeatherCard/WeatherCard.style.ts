import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#1c1c1c',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
    marginVertical: 10,
    borderColor: '#898a8c',
    borderWidth: 2,
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  temperature: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  condition: {
    fontSize: 16,
    color: 'white',
  },
});
