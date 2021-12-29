import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { paddingSizes } from '../../utils/sizes';
import { Countdown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing'
import {useKeepAwake} from 'expo-keep-awake';
  
const DEFUALT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFUALT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(10000);
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(0.1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(DEFUALT_TIME);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          minutes={minutes} 
          isPaused={!isStarted} 
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>
      <View style={{paddingTop: paddingSizes.sm}}>
        <ProgressBar 
          progress={progress}
          color='#5E84E2'
          style={{height: 10}}
        />
      </View>

      <View styke={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}> 
          <RoundedButton title="-" onPress={() => clearSubject} size={50} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
      flex: 0.3,
      flexDirection: 'row',
      paddding: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
