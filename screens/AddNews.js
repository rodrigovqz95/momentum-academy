import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Button,
    FlatList,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import {addNews, deleteNews, getNews} from '../api/NewsApi';
import {styles} from '../components/Styles';

const AddNews = () => {

    const state = {
        newsList: [],
        currentNewsItem: "",
        color: "blue",
    };

    const onNewsAdded = (news) => {
        console.log("News Added");
        console.log("news");
    };

    const onNewsDeleted = (news) => {
        console.log("News Deleted");
        console.log("news");
    };
    
    const onNewsReceived = (newsList) => {
        console.log(newsList);
        this.setState(prevState => ({
            newsList: prevState.newsList = newsList
        }));
    };

    getNews(this.onNewsReceived)

    return(
        <SafeAreaView>
            <View style={styles.inputContainer}>
            <TextInput
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Escribe Nueva Noticia"
            value={this.state.currentNewsItem}
            onChangeText={(text) => this.setState(prevState => ({
                currentNewsItem: prevState.currentNewsItem = text
            }))
            } />
            </View>
            <View style={styles.recentItem}>
            <Button
                title= 'Agregar Noticia'
                style={styles.button}
                onPress={() =>
                  addNews({
                    text: this.state.currentNewsItem,
                    pushNotifications: 0,
                },
                this.onNewsAdded
                )
                } 
            />
            <Button
                title= 'Notificacion Push'
                color={this.state.color}
                style={styles.button}
                onPress={() =>
                {
                  this.setState({color: "red"})
                }
                } 
            />
            </View>
            <View  style={styles.recentItem}>
            <Button
                title= 'Borrar Noticia'
                style={styles.button}
                onPress={() =>
                  deleteNews(
                this.onNewsAdded
                )
                } 
            />               
            </View>
        </SafeAreaView>
    );
}
  export default AddNews;

