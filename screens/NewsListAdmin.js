import React, { useState, useEffect, useRef} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { getNews, deleteNews } from '../api/NewsApi';
import { styles } from '../components/Styles';
import { useNavigation } from '@react-navigation/core';

const  NewsListAdmin = () => {
  const [newsList, setNoticia] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false)
  const onNewsDeleted = (news) => {
    console.log('News Deleted');
    getNews().then(news => setNoticia(news));
  };
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    getNews().then(news => setNoticia(news));
  }, []);

  useEffect(() => {
    getNews().then(news => setNoticia(news));
  }, []);
  
    return (
      <SafeAreaView>
        <FlatList
          data={newsList}
          ItemSeparatorComponent={() => (
            <Divider style={{ setStatusBarBackgroundColor: 'black' }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            return (
              <ListItem
                containerStyle={[styles.listContainer, styles.shadowProp]}
              >
                <ListItem.Title style={styles.inputLabel}>
                  {item.dateDisplay}
                </ListItem.Title>
                <ListItem.Title style={styles.inputMessage}>
                  {item.text}
                </ListItem.Title>
                <Button
                  containerStyle={styles.button}
                  title="Borrar"
                  onPress={() => 
                    deleteNews(item.id, onNewsDeleted)
                  }
                />

              </ListItem>
            );
          }}
        />
      </SafeAreaView>
    );
}

export default NewsListAdmin;
