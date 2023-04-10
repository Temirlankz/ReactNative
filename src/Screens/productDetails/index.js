import {useState} from 'react'
import {View, Text,Image,Button} from 'react-native'
import { 
  useQuery,
} from '@apollo/client';
import { productsGQL } from '../../Services/gqls'
import actionProducts from './actions'
import config from "../../Config"
const ProductDetails = ({navigation, route})=>{
  const [productData, setProducData] = useState(route.params?.item);

  const putProduct = (data)=>{
    setProducData(data.product)
  }

  useQuery(productsGQL.getProduct, actionProducts.getProduct(putProduct, route.params?.item?._id));

 console.log(8888888888, productData)

  return(
    <View>
      <Text >{`${productData?.title}`} </Text>
      {/* <Image 
            resizeMode='cover'
            style={styles.productImg}
            source={{uri: {productData.picture}}} 
          /> */}
          <Text>{`Характеристики
              ${productData.characteristics}`}</Text>
          
          <Text>{`  Описание
          ${productData.description}
          `}</Text>
          <Text>{`Физическое лицо
      № ${productData.vendor_code}
      `}</Text>
      <Text>В корзину       <Text>Избранный</Text></Text>
      <Text>{`$${productData.price} оптом       Одно: $${productData.price_one}`}</Text>
      <View>
        <Image/>
        <Text>{`Компания: ${company.name}`}</Text>
        <Text>Продавец:</Text>
        <Text></Text>

      </View>


    </View>
  )
}
export default ProductDetails