import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Change any color here
const COLORS = {
  background: "#0F172A",
  display: "#1E293B",
  displayText: "#F8FAFC",
  number: "#334155",
  operator: "#6366F1",
  clear: "#EF4444",
  equal: "#22C55E",
  buttonText: "#FFFFFF",
};

// All the buttons, row by row
const rows = [
  ["√", "π", "^", "⌫"],
  ["AC", "(", ")", "%"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

export default function App() {
  const [text, setText] = useState("");

  // Calculate the answer
  const calculate = () => {
    try {
      let exp = text;
      exp = exp.replace(/π/g, "(" + Math.PI + ")");
      exp = exp.replace(/\^/g, "**");
      exp = exp.replace(/%/g, "/100");

      const answer = Function("return " + exp)();

      if (Number.isFinite(answer)) {
        setText(String(answer));
      } else {
        setText("Error");
      }
    } catch (error) {
      setText("Error");
    }
  };

  // Runs when any button is pressed
  const handlePress = (label: string) => {
    if (label === "AC") {
      setText("");
    } else if (label === "⌫") {
      setText(text.slice(0, -1));
    } else if (label === "=") {
      calculate();
    } else {
      setText(text + label);
    }
  };

  // Pick the button color
  const getColor = (label: string) => {
    if (label === "AC" || label === "⌫") {
      return COLORS.clear;
    }
    if (label === "=") {
      return COLORS.equal;
    }
    if ((label >= "0" && label <= "9") || label === ".") {
      return COLORS.number;
    }
    return COLORS.operator;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.calculator}>
        <View style={styles.displayBox}>
          <TextInput
            style={styles.displayText}
            value={text}
            placeholder="0"
            placeholderTextColor="#64748B"
            editable={false}
          />
        </View>

        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((label) => (
              <TouchableOpacity
                key={label}
                style={[styles.button, { backgroundColor: getColor(label) }]}
                onPress={() => handlePress(label)}
              >
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  calculator: {
    width: 320,
    padding: 12,
  },
  displayBox: {
    backgroundColor: COLORS.display,
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 80,
    justifyContent: "center",
  },
  displayText: {
    color: COLORS.displayText,
    fontSize: 36,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 22,
    fontWeight: "bold",
  },
});
