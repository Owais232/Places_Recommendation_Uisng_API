import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';

const API_KEY = 'your_API_KEY'; // Replace with your actual API key

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

const AddressSearch = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleAddressSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details) {
      const addressComponents: AddressComponent[] = details.address_components || [];

      // Extracting address components
      const address = addressComponents.find(component =>
        component.types.includes('street_number') || component.types.includes('route')
      )?.long_name || '';

      const city = addressComponents.find(component =>
        component.types.includes('locality')
      )?.long_name || '';

      const postalCode = addressComponents.find(component =>
        component.types.includes('postal_code')
      )?.long_name || '';

      const country = addressComponents.find(component =>
        component.types.includes('country')
      )?.long_name || '';

      setAddress(address);
      setCity(city);
      setPostalCode(postalCode);
      setCountry(country);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <GooglePlacesAutocomplete
        placeholder="Enter address"
        onPress={handleAddressSelect}
        query={{
          key: API_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
          listView: {
            backgroundColor: 'white',
          },
        }}
        fetchDetails={true}
        debounce={200} // Optional: Delay before making API calls
        onFail={(error) => {
          console.error('Autocomplete error:', error);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Submit" onPress={() => {
        // Handle form submission
        console.log({ name, address, city, postalCode, country });
      }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  autocompleteContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AddressSearch;
