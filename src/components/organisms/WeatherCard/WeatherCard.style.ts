import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  icon: {  // 👈 Eksik olanı ekledik
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  temperature: {  // 👈 Eksik olanı ekledik
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  condition: {  // 👈 Eksik olanı ekledik
    fontSize: 16,
    color: "#666",
  },
});