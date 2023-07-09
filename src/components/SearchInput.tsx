import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

type Props = {
  onSubmit: any;
};

export default function SearchInput({onSubmit}: Props) {
  const [recentList, setRecentList] = useState([] as any);

  const onSearch = (value: any) => {
    setRecentList((prev: any) => [value.nativeEvent.text, ...prev]);
    onSubmit(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onSubmitEditing={onSearch}
        placeholder="Search image here..."
        placeholderTextColor={'#000'}
      />
      {recentList.length > 0 && (
        <Text style={styles.highlight}>Recent: {recentList.join(', ')}!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#34c0eb',
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  highlight: {
    fontWeight: '700',
    fontSize: 18,
    paddingVertical: 10,
  },
});
