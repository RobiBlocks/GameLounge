import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  onSelect?: (values: string[]) => void;
};

const MultipleSelect = ({ onSelect }: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const options: string[] = ["PC", "Nintendo Switch 2", "PlayStation 5", "Xbox Series X"];

  const handleSelect = (option: string) => {
    let newSelection: string[];
    
    if (selectedValues.includes(option)) {
      newSelection = selectedValues.filter(item => item !== option);
    } else {
      newSelection = [...selectedValues, option];
    }
    
    setSelectedValues(newSelection);
    if (onSelect) {
      onSelect(newSelection);
    }
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleSelect(option)}
          style={[
            styles.option, 
            selectedValues.includes(option) && styles.selected
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selectedValues.includes(option) && styles.selectedText,
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

export default MultipleSelect;
