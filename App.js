import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,  
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

const App = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=20`);
      const data = await response.json();
      setCustomers(d => [...d, ...data.results]);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.box}>
        <Image style={styles.image} source={{uri: item.picture.large}} />
        <View style={styles.content}>
          <Text style={styles.name}>
            {`${item.name.title} ${item.name.first} ${item.name.last}`}
          </Text>
          <Text style={styles.address}>
            {`${item.location.street.number}, ${item.location.street.name}, ${item.location.city}`}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.header}>Customers</Text>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.email}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    color: '#edf2f2',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  safeAreaView: {
    backgroundColor: '#94f1fd',
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  content: {
    justifyContent: 'space-around',
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderRadius: 12,
    marginBottom: 25,
    overflow: 'hidden',
    backgroundColor: '#edf2f2',
  },
  name: {
    color: '#080808',
    fontSize: 23,
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 20,
  },
  address: {
    color: '#080808',
  },
  email: {
    color: '#974bfa',
  },
});


export default App;
