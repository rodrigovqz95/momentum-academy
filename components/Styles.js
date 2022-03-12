import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#0782F9",
      width: "100%",
      padding: "auto",
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inputContainer: {
      width: "80%",
    },
    listContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      fontStyle: 'italic'
    },
    recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
    },
    activityIndicator: {
      backgroundColor: "#2E86C1",
      paddingTop: "auto",
      paddingBottom: "auto",
      paddingLeft:"auto",
      paddingRight: "auto",
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: "auto",
      marginRight: "auto",
      marginBottom: "auto"
    },
    dateList:{
        paddingTop: "auto",
        paddingBottom: "auto",
        paddingLeft:"auto",
        paddingRight: "auto",
        marginTop: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        fontSize: 14,
        fontWeight: '600',
        fontStyle: 'italic'
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
  });

  export {styles}