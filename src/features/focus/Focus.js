import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton'
import { fontSizes, paddingSizes } from '../../utils/sizes'
import { colors } from '../../utils/colors'

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState();



  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            onSubmitEditing={
              ({ nativeEvent }) => {
              setSubject(nativeEvent.text);
              }
            }
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },

  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },

  inputContainer: {
    paddingTop: paddingSizes.md,
    alignItems: 'center',
    flexDirection: 'row'
  },
});
