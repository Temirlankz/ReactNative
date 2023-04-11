import React, {useEffect, useState} from 'react'
import {Dimensions, Image, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {storeCart} from '../../Services/store'
import CartItem from '../../Components/cartItem';
import Footer from '../../Components/Footer/Footer';

const windowWidth = Dimensions.get('window').width;

const Cart = ({navigation})=>{
  const [cartList, setCartList] = useState(null)
  const [totalSum, setTotalSum] = useState(0);
  
  const updateList = async()=>{
    const res = await storeCart.get_cart_list()
    setCartList(res)
    getTotalSum(res)
  }

  const getTotalSum = (res) => {
    let sum = 0;
    res.forEach((item) => {
      sum+=+item.price
    })
    setTotalSum(Math.round(sum))
  }

  useEffect(()=>{
    updateList()
   
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      updateList()
    });
    return unsubscribe;
  },[navigation])

  return(
      <FlatList
        data={cartList}
        ListFooterComponent={<Footer totalSum={totalSum} />}
        renderItem={({item}) => <CartItem updateList={updateList} item={item} navigation={navigation} />}
        keyExtractor={item => item._id}
      />
  )
}

const styles = StyleSheet.create({
  submit: {
    width: 420,
    height: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    flex:1,
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
  listWraper: {
    gap: 10, 
    backgroundColor: '#fff',
    paddingVertical: 5, 
    paddingHorizontal: 10
  },
});

export default Cart