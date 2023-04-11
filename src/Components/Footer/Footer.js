import { TouchableOpacity, View, Text} from "react-native";


export default function Footer({totalSum}) {

    return(
        <View>
            <Text>Total price: {totalSum}</Text>
            <TouchableOpacity><Text>Submit</Text></TouchableOpacity>
        </View>
    )
}