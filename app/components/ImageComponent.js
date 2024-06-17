import {Image, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import FullScreenImageView from './FullScreenImageView';

export default ImageComponent = ({imageUrl, style}) => {
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <>
      <FullScreenImageView
        setVisible={setFullscreen}
        url={imageUrl}
        visible={fullscreen}
      />
      <Pressable onPress={() => setFullscreen(true)}>
        <Image resizeMode="contain" source={{uri: imageUrl}} style={style} />
      </Pressable>
    </>
  );
};
