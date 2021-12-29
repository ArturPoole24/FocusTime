import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';

import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';
import { paddingSizes } from './src/utils/sizes';

import { Countdown } from './src/components/CountDown';


export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2,
  };
  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status}])
  }
  const onClear = () => {
    //things to do
  }
  

  console.log(focusHistory)

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE)
            setFocusSubject(null);

          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED)
            setFocusSubject(null)
          }}
        />
      ) : (
        <>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.xxl : paddingSizes.lg,
    backgroundColor: colors.darkBlue,
  },
});
