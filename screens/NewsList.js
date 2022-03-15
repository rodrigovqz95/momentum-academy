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
import {addNews, getNews, deleteNews} from '../api/NewsApi';
import {styles} from '../components/Styles';



class NewsList extends Component {

    state = {
        newsList: [],
        currentNewsItem: "",
        color: "blue",
    }

    onNewsDeleted = (news) => {
        console.log("News Deleted");
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
                <FlatList
                data={this.state.newsList}
                ItemSeparatorComponent={() => <Divider style={{setStatusBarBackgroundColor: 'black'}}/>}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item,index }) => {
                    console.log(item.text);
                    return(
                        <ListItem
                         containerStyle={[styles.listContainer, styles.shadowProp]}
                        >
                          <ListItem.Title
                          style={styles.inputLabel}
                          >
                          {item.dateDisplay}
                          </ListItem.Title>
                          <ListItem.Title
                          style={styles.inputLabel}
                          >
                          {item.text}
                          </ListItem.Title>
                          <Button
                            containerStyle={styles.button}
                            title="Borrar"
                            onPress={() =>
                                deleteNews(item.id, this.onNewsDeleted)}
                          />
                          
                        </ListItem>
                      );
                    }
                  }
                />
            </SafeAreaView>
        );
    }
}

  export default NewsList;