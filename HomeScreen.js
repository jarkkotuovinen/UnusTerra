import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import _ from 'lodash';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import GameScreen from './GameScreen'
import mapStyle from './mapstyle';

const Stack = createStackNavigator();


const DangerZone = ({ confirmed }) => {
  zoneStyle = () => {
    return {
      width: confirmed * 7,
      height: confirmed * 7,
    }
  }
  return (
    <View style={[styles.danger, zoneStyle()]}></View>
  )
}

const DangerCallout = ({ confirmed, country }) => {
  return (
    <View style={{width: 100, padding: 10, backgroundColor: '#fff', marginBottom: 10, zIndex: 999}}>
      <Text>{country}</Text>
      <Text>Level {Math.ceil(confirmed / 10)}</Text>
      <Text style={{marginTop: 10}}>Infections today {confirmed}</Text>
      <View style={{backgroundColor: 'red', marginTop: 10, borderRadius: 20, padding: 5}}>
        <Text style={{textAlign: 'center'}}>FIGHT!</Text>
      </View>
    </View>
  )
}

const CustomMarker = ({ confirmed, coordinate, country }) => {
  const amount = (confirmed && Math.ceil(Math.log(confirmed))) || 1;
  const navigation = useNavigation();
  const test = () => {
    navigation.navigate("GameScreen", {
      country,
      confirmed
    })
  }
  return (
    <Marker coordinate={coordinate}>
      <Callout onPress={() => test()}>
        <DangerCallout confirmed={confirmed} country={country} />
      </Callout>
      <DangerZone confirmed={amount} />
    </Marker>
  )
}

const HomeScreen = () => {
  const [finland, updateFinland] = useState(0)
  const [sweden, updateSweden] = useState(0)
  const [italy, updateItaly] = useState(0)
  const [spain, updateSpain] = useState(0)

  useEffect(() => {
    fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then((data) => {
      updateFinland(data.Countries.find(country => country.Country === 'Finland').NewConfirmed)
      updateSweden(data.Countries.find(country => country.Country === 'Sweden').NewConfirmed)
      updateItaly(data.Countries.find(country => country.Country === 'Italy').NewConfirmed)
      updateSpain(data.Countries.find(country => country.Country === 'Spain').NewConfirmed)
    })
  }, []);

  return (
    <MapView
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: 48.1733244,
        longitude: 9.9410248,
        latitudeDelta: 40,
        longitudeDelta: 40,
      }}
    >
      <CustomMarker
        country="Finland"
        confirmed={finland}
        coordinate = {{
          latitude: 60.1733244,
          longitude: 24.9410248,
        }}
      />
      <CustomMarker
        country="Sweden"
        confirmed={sweden}
        coordinate = {{
          latitude: 60.13,
          longitude: 18.64,
        }}
      />
      <CustomMarker
        country="Spain"
        confirmed={spain}
        coordinate = {{
          latitude: 40.46,
          longitude: -3.75,
        }}
      />
      <CustomMarker
        country="Italy"
        confirmed={italy}
        coordinate = {{
          latitude: 41.87,
          longitude: 12.57,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  danger: {
    backgroundColor: 'rgb(255,0,0)',
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dangerText: {
    color: '#fff',
  }
});

export default HomeScreen;