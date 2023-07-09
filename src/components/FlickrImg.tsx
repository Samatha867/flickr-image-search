import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

type Props = {
  photo: any;
};

export default function FlickrImg({photo}: Props) {
  return (
    <View style={styles.imgConatiner}>
      <Image
        style={styles.img}
        source={{
          uri: `http://farm${photo?.farm}.static.flickr.com/${photo?.server}/${photo?.id}_${photo?.secret}.jpg`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgConatiner: {
    width: '49%',
    aspectRatio: 16 / 9,
  },
  img: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});
