import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';
import routes from '../navigation/routes';
import {useNavigation} from '@react-navigation/native';

export default LocationBar = () => {
  const {navigate} = useNavigation();
  return (
    <LinearGradient
      colors={[colors.dark, colors.medium]}
      style={styles.container}>
      <View style={styles.icon}>
        <Icon color={colors.text} name="location" size={24} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Saket, New Delhi</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.subtitle}>Showing events in </Text>
          <Pressable
            style={styles.highlight}
            onPress={() => navigate(routes.CITIES)}>
            <Text style={styles.highlightText}>Delhi-NCR </Text>
          </Pressable>
          <Icon color={colors.primary} name="chevronDown" size={15} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.medium,
    flexDirection: 'row',
    height: 80,
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'flex-start',
    height: '100%',
    justifyContent: 'center',
    width: '80%',
  },
  highlight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts[500],
  },
  icon: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '20%',
  },
  locationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  subtitle: {
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts[300],
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontFamily: fonts[400],
  },
});
