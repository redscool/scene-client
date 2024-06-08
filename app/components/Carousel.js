import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';

import colors from '../config/colors';
import Icon from '../Icons';
import {getFileUrl} from '../utils/misc';

const {width} = Dimensions.get('window');
const SLIDE_SIZE = width * 0.5;

const Spacer = () => {
  return <View style={styles.spacer} />;
};

const Slide = data => {
  return (
    <View style={styles.slide}>
      <Image style={styles.image} source={{uri: getFileUrl(data.data)}} />
    </View>
  );
};

const Carousel = ({slides, style}) => {
  if (!slides) return;
  const slideList = ['spacer1', ...slides, 'spacer2'];
  const [curIndex, setCurIndex] = useState(0);
  const indexRef = useRef(curIndex);
  indexRef.current = curIndex;
  const onScroll = useCallback(event => {
    const index = event.nativeEvent.contentOffset.x / SLIDE_SIZE;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);
    if (roundIndex !== indexRef.current && 0.4 > distance)
      setCurIndex(roundIndex);
  }, []);

  return (
    <View style={[style]}>
      <FlatList
        key={'mainContainer'}
        data={slideList}
        decelerationRate={0}
        horizontal
        onScroll={onScroll}
        renderItem={({item}) => {
          return item === 'spacer1' || item === 'spacer2' ? (
            <Spacer />
          ) : (
            <Slide data={item} />
          );
        }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLIDE_SIZE}
        style={{flex: 1}}
      />
      <View style={styles.dotsContainer}>
        <FlatList
          data={slideList}
          horizontal
          keyExtractor={item => item.toString()}
          renderItem={({item, index}) => {
            const color =
              index === curIndex + 1 ? colors.primary : colors.placeholder;
            return item === 'spacer1' || item === 'spacer2' ? null : (
              <Icon name="dot" color={color} style={styles.dot} />
            );
          }}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  dot: {
    marginHorizontal: 2,
  },
  dotsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    width: '30%',
  },
  image: {
    height: 100,
    width: 135,
  },
  slide: {
    alignItems: 'center',
    width: SLIDE_SIZE,
  },
  spacer: {
    width: (width - SLIDE_SIZE) / 2,
  },
});
