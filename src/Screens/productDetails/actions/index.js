const getProduct = (putProduct, id)=>{
  return {
    variables:{
      id
    },
    skip: id === undefined,
    onCompleted: (data)=>{
      //console.log('PRODUCT_DETAL', data)
      if(putProduct) putProduct(data.getProduct)
    },
    onError: (err)=>{
      console.log('PRODUCT_DETAL', err)
    }
  }
}

export default {getProduct}