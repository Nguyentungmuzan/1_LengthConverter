import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [inputValue, setInputValue] = useState(''); 
  const [convertedValue, setConvertedValue] = useState(''); 
  const [fromUnit, setFromUnit] = useState('Metre'); 
  const [toUnit, setToUnit] = useState('Foot'); 

  const units = {
    Metre: 1,
    Millimetre: 1000,
    Mile: 0.000621371,
    Foot: 3.28084,
  };

  const convertUnits = () => {
    const inputInMetres = parseFloat(inputValue) / units[fromUnit]; 
    const outputValue = inputInMetres * units[toUnit]; 
    setConvertedValue(outputValue.toFixed(4)); 
  };

  const validateInput = () => {
    if (isNaN(inputValue) || inputValue === '') {
      alert("Please enter a valid number.");
      return false;
    }
    return true;
  };

  const handleConvert = () => {
    if (validateInput()) {
      convertUnits();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Length Unit Converter</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      <Picker
        selectedValue={fromUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setFromUnit(itemValue)}>
        {Object.keys(units).map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <Text style={styles.text}>to</Text>

      <Picker
        selectedValue={toUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setToUnit(itemValue)}>
        {Object.keys(units).map((unit) => (
          <Picker.Item key={unit} label={unit} value={unit} />
        ))}
      </Picker>

      <Button title="Convert" onPress={handleConvert} />
      
      {convertedValue ? (
        <Text style={styles.result}>
          {inputValue} {fromUnit} = {convertedValue} {toUnit}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  result: {
    textAlign: 'center',
    fontSize: 22,
    marginVertical: 20,
  },
});
