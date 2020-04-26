import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';

import Bug from './Bug';
const RADIUS = 25;

const Head = ({ creatures }) => {
  const route = useRoute();
  const {
    params: { country, confirmed },
  } = route || {};
  return (
    <View style={styles.stats}>
    <View style={styles.countryContainer}>
      <View style={styles.countryWrapper}>
        <Text style={styles.countryText}>Country: {country}</Text>
      </View>
      <Text style={styles.confimations}>Confirmed: {confirmed}</Text>
      <Text>Creatures left: {creatures && creatures.length}</Text>
    </View>
  </View>
  )
}

const PopUp = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.popup}>
        <Text style={styles.popupText}>Good job!</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{textAlign: 'center'}}>Go back</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const GameScreen = () => {
  const [creatures, updateCreatures] = useState();
  const spinValue = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const {
    params: { confirmed },
  } = route || {};

  useEffect(() => {
    const TotalConfirms = confirmed && Math.floor(confirmed / 20);
    let product_names = [];
    for (let i=0; i<TotalConfirms; i+=1) {
      product_names.push({});
    }
    product_names.forEach((item, i) => {
      item.id = i + 1;
    });
    updateCreatures(product_names)
    spinner();
  }, [])

  const spinner = () => {
    spinValue.setValue(0)
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: false,
      }
    ).start(() => spinner())
  }

  clickHelper = id => {
    updateCreatures(creatures.filter(creature => creature.id !== id))
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
     <ImageBackground source={require('./mayski.png')} style={styles.image}>
        <Head creatures={creatures} />
        {creatures &&
          <View style={styles.creatureWrapper}>
            {creatures.length > 0 ? creatures.map((creature) => {
              return (
                <Animated.View key={creature.id} style={[styles.player, {
                  left: creature.id  * getRandomInt(20),
                  top: creature.id  * getRandomInt(35),
                  transform: [{rotate: spin}],
                  }]}>
                  <TouchableOpacity onPress={() => this.clickHelper(creature.id)}>
                    <Animated.View>
                      <Bug style={{width: 50, height: 50}} />
                    </Animated.View>
                  </TouchableOpacity>
                </Animated.View>
              )
            })
            :
            <PopUp />
          }
          </View>
        }
      </ImageBackground>
    );
  }


const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  stats: {
    paddingTop: 30,
  },
  countryContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  countryText: {
    color: '#fff',
    fontSize: 20,
  },
  countryWrapper: {
    backgroundColor: 'red',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  confimations: {
    marginTop: 10,
    marginBottom: 10,
  },
  creatureWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  player: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2,
    position: 'absolute',
  },
  popup: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 50,
    margin: 20,
    textAlign: 'center'
  },
  popupText: {
    fontSize: 36,
    textAlign: 'center'
  }
});

export default GameScreen;