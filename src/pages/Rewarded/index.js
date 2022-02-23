import React, {useState} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import {AdMobRewarded} from 'react-native-admob';
import styles from './styles';

const adRewardedTestUnitID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/1712485313',
  android: 'ca-app-pub-3940256099942544/5224354917',
});

const Rewarded = () => {
  const [count, setCount] = useState(0);

  const showRewardedAdmob = () => {
    AdMobRewarded.setAdUnitID(adRewardedTestUnitID);
    AdMobRewarded.requestAd()
      .then(() => AdMobRewarded.showAd())
      .then(() => setCount((prev) => prev + 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{count}</Text>

      <Button title="Rewarded" onPress={() => showRewardedAdmob()} />
    </View>
  );
};

export default Rewarded;
