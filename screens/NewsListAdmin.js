import React, { useState, useEffect, useRef} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { getNews, deleteNews } from '../api/NewsApi';
import { styles } from '../components/Styles';
import { useNavigation } from '@react-navigation/core';

const  NewsListAdmin = () => {
  const [newsList, setNoticia] = useState([]);
  const navigation = useNavigation();

  const onNewsDeleted = (news) => {
    console.log('News Deleted');
    console.log('news');
    navigation.replace("Admin")
  };

  const onNewsReceived = (newsList) => {
    console.log(newsList);
    setNoticia(newsList);
  };

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
                  onPress={() => deleteNews(item.id, onNewsDeleted)}
                />
              </ListItem>
            );
          }}
        />
      </SafeAreaView>
    );
}

export default NewsListAdmin;
