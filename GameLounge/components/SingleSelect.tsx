import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onSelect?: (value: string) => void;
};

const SingleSelect = ({ onSelect }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const options: string[] = ["Bad", "Mid", "Good", "Excellent", "Masterpiece"];

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleSelect(option)}
          style={[styles.option, selectedValue === option && styles.selected]}
        >
          <Text
            style={[
              styles.optionText,
              selectedValue === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "90%",
  },
  option: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "grey",
    borderColor: "darkgrey",
    borderWidth: 2,
    minWidth: 100,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#0088FF",
    borderColor: "#7BB4E3",
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SingleSelect;
