import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {resetPhotosData, topPhotosRequest} from '../../store/action';
import styles from './HomeScreen.style';
import FlickrImg from '../../components/FlickrImg';
import SearchInput from '../../components/SearchInput';

type Props = {
  photosModel: any;
  dispatch: any;
};

const HomeScreen = ({photosModel, dispatch}: Props) => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const requestAPI = useCallback(() => {
    dispatch(
      topPhotosRequest({
        text: name,
        page: page,
      }),
    );
  }, [name, page, dispatch]);

  useEffect(() => {
    requestAPI();
  }, [page, name, requestAPI]);

  const fetchMoreData = () => {
    if (!photosModel?.isListEnd && !photosModel?.moreLoading) {
      setPage(page + 1);
    }
  };

  const renderHeader = () => (
    <Text style={styles.title}>Flickr image search {name}</Text>
  );

  const renderFooter = () => (
    <View style={styles.footerText}>
      {photosModel?.moreLoading && <ActivityIndicator />}
      {photosModel?.isListEnd && <Text>No more images at the moment</Text>}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No images at the moment.</Text>
      <Button onPress={() => requestAPI()} title="Refresh" />
    </View>
  );

  const onSubmit = (value: any) => {
    dispatch(resetPhotosData());
    setName(value.nativeEvent.text);
    setPage(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput onSubmit={onSubmit} />
      {photosModel?.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          keyExtractor={item => `${item.id}_${item.owner}_${item.secret}`}
          contentContainerStyle={styles.imageContainer}
          data={photosModel?.data || []}
          renderItem={({item}) => <FlickrImg photo={item} />}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
          numColumns={2}
          columnWrapperStyle={styles.imageItem}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    photosModel: state.photos,
  };
};

export default connect(mapStateToProps)(HomeScreen);
