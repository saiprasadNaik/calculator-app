import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

  function getAnswer() {
    let exp = text;

    exp = exp.replace(/π/g, "3.14159");
    exp = exp.replace(/√(\d+\.?\d*)/g, "Math.sqrt($1)");
    exp = exp.replace(/\^/g, "**");
    exp = exp.replace(/%/g, "/100");

    try {
      let ans = Function("return " + exp)();
      if (isFinite(ans)) {
        setText(String(ans));
      } else {
        setText("Error");
      }
    } catch (e) {
      setText("Error");
    }
  }

  function onPress(btn: string) {
    if (btn === "AC") {
      setText("");
    } else if (btn === "⌫") {
      setText(text.slice(0, -1));
    } else if (btn === "=") {
      getAnswer();
    } else {
      if (text === "Error") {
        setText(btn);
      } else {
        setText(text + btn);
      }
    }
  }

  function getColor(btn: string) {
    if (btn === "AC" || btn === "⌫") {
      return "red";
    } else if (btn === "=") {
      return "green";
    } else if ("0123456789.".includes(btn)) {
      return "#334155";
    } else {
      return "#6366F1";
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.display}>
          <TextInput
            style={styles.displayText}
            value={text}
            placeholder="0"
            placeholderTextColor="gray"
            editable={false}
          />
        </View>

        {rows.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[styles.btn, { backgroundColor: getColor(btn) }]}
                onPress={() => onPress(btn)}
              >
                <Text style={styles.btnText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 320,
    padding: 12,
  },
  display: {
    backgroundColor: "#1E293B",
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 80,
    justifyContent: "center",
  },
  displayText: {
    color: "white",
    fontSize: 36,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  btn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
