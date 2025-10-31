import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  buttonText: string;
  onPress?: () => void;
};

export default function PhotoButton({ buttonText, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
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
