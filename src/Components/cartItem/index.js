import {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Dimensions, Image} from 'react-native'
import config from '../../Config'
import {storeCart} from '../../Services/store'

const windowWidth = Dimensions.get('window').width;

export default function CartItem({item, updateList}) {
    const data = item;
    const [counter, setCounter] = useState(data?.count ? data.count :1);
    const [price, setPrice] = useState(data.price);
  
    const IncreaseNum = async () => {
      setCounter((pre)=>pre+1)
      setPrice(data.price*(counter+1))
      await storeCart.update_cart_list(item,counter)
    }
    const DecreaseNum = async () => {
      setCounter((pre)=>pre > 1 ? pre-1:pre)
      setPrice((pre)=> counter>1? (pre-data.price).toFixed(1): pre)
      await storeCart.update_cart_list(item,counter)
    }

    const DeleteItem = () => {
      storeCart.remove_cart_list(item).then(()=>{
        updateList()
      })
      .then()
    }

    return (
      <View>
        <View style={styles.item}>
          <View style={styles.itemContent}>
            <View>
              <Image 
                resizeMode='cover'
                style={styles.productImg}
                source={{uri: `${config.public}${data.picture}`}} 
              />
              <Text style={styles.title} numberOfLines={2}>{data.title}</Text>
            </View>
            <View style={styles.itemFooter}>
              <Text>{price} {data.currency}</Text>
            <View style={styles.addButtonWrapper}>
            <TouchableOpacity style={styles.addButton} onPress={IncreaseNum}><Text>+</Text></TouchableOpacity>
            <Text>{counter}</Text>
            <TouchableOpacity style={styles.addButton} onPress={DecreaseNum}><Text>-</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={DeleteItem}><Text>Delete</Text></TouchableOpacity>
            </View>
          </View> 
        </View>
        </View>
      )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f1f1f1',
      padding: 10,
      borderRadius: 10,
      flex:1,
    },
    addButtonWrapper: {
        width: 100,
        height: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    addButton: {
        width: 30,
        height: 30,
        color: '#fff',
        backgroundColor: 'red',
        borderRadius: 10,
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        margin:2
    },
    itemContent:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    itemFooter:{
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    productImg: {
      height: 200,
      width: '100%'
    },
    title: {
      fontSize: windowWidth * .03,
      color: '#000'
    },
  });