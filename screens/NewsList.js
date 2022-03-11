import { setStatusBarBackgroundColor } from 'expo-status-bar';
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
import {addNews, getNews} from '../api/NewsApi';
import { auth } from "../firebase";



class NewsList extends Component {

    state = {
        newsList: [],
        currentNewsItem: "",
    }

    onNewsAdded = (news) => {
        console.log("News Added");
        console.log("news");
    }

    onNewsReceived = (newsList) => {
        console.log(newsList);
        this.setState(prevState => ({
            newsList: prevState.newsList = newsList
        }));
    }

    componentDidMount(){
         
        getNews(this.onNewsReceived)
    }
    render() {
        return(
            <SafeAreaView>
                <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Escribe Nueva Noticia"
                value={this.state.currentNewsItem}
                onChangeText={(text) => this.setState(prevState => ({
                    currentNewsItem: prevState.currentNewsItem = text
                }))
                } />
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
                </View>
                <FlatList
                data={this.state.newsList}
                ItemSeparatorComponent={() => <Divider style={{setStatusBarBackgroundColor: 'black'}}/>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    console.log(item.text);
                    return(
                        <ListItem
                         title={item.text}
                         titlestyle={styles.buttonText}
                         />
                    );
                }
                }
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "black",
      fontWeight: "700",
      fontSize: 16,
    },
    buttonOutline: {
      backgroundColor: "transparent",
      marginTop: 5,
      borderColor: "#0782F9",
    },
    buttonOutlineText: {
      color: "#0782F9",
      fontWeight: "700",
      fontSize: 14,
      textAlign: "center",
    },
    image: {
      flex: 1,
      height: undefined,
      width: undefined
    },
    logoImage: {
      width: 250,
      height: 250,
      overflow: "hidden",
    },
  });

  export default NewsList;