import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import {storeCart} from '../../Services/store'

const Cart = ({navigation})=>{
  const [cartList, setCartList] = useState(null)

  const updateList = async()=>{
    setCartList(await storeCart.get_cart_list())
  }

  useEffect(()=>{
    updateList()
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      updateList()
    });
    return unsubscribe;
  },[navigation])

  return(
    <View>
      {
        cartList?.map((el)=>{
          return<Text>{el.title}</Text>
        })
      }
    </View>
  )
}

export default Cart