import React, { useState, useEffect, useRef} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { getNews, deleteNews, addNews  } from '../api/NewsApi';
import { getUsers } from '../api/Users';
import { styles } from '../components/Styles';
import { useNavigation } from '@react-navigation/core';

const  UserListAdmin = () => {
  const [userList, setUsers] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false)
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    getUsers().then(users => setUsers(users));
  }, []);

  useEffect(() => {
    getUsers().then(users => setUsers(users));
  }, []);

  const editHandler = (item) => {
    navigation.navigate('UserAdminReport', {
      userId: item.userId,
      correo: item.correo
    });
  };

    return (
      <SafeAreaView>
        <FlatList
          data={userList}
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
                <ListItem.Title style={styles.inputMessage}>
                  {item.correo}
                </ListItem.Title>
                <Button
                  containerStyle={styles.button}
                  title=">"
                  onPress={() => 
                    editHandler(item)
                  }
                />

              </ListItem>
            );
          }}
        />
      </SafeAreaView>
    );
}

export default UserListAdmin;
