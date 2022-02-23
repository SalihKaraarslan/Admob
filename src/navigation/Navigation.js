import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Rewarded from '../pages/Rewarded';
import Test from '../pages/Test';
import Welcome from '../pages/Welcome';
import {AdMobInterstitial} from 'react-native-admob';

const Tab = createBottomTabNavigator();

const adInterstitialTestUnitID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
});

const showAdmob = () => {
  AdMobInterstitial.setAdUnitID(adInterstitialTestUnitID);
  AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
};

const Navigation = () => {
  const [counter, setCounter] = React.useState(0);
  console.log(counter);

  React.useEffect(() => {
    if (counter > 0 && counter % 3 == 0) {
      return showAdmob();
    }
  });

  function MyTabBar({state, descriptors, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate({name: route.name, merge: true});

            setCounter((prev) => prev + 1);
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              disabled={isFocused ? true : false}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isFocused ? '#673ab7' : '#222',
                height: '100%',
              }}>
              <Text style={{color: '#fff'}}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Welcome" component={Welcome} />
        <Tab.Screen name="Test" component={Test} />
        <Tab.Screen name="Rewarded" component={Rewarded} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
