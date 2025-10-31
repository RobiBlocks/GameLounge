import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  buttonText: string;
};

export default function Button({ buttonText }: Props) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "grey",
    borderColor: "darkgrey",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
