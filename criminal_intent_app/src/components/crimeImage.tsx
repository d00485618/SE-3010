import {
    DimensionValue,
    Image,
    StyleSheet,
    ImageSourcePropType,
    View,
    Text,
} from "react-native";

interface crimeImageProps {
    source: ImageSourcePropType;
    width?: DimensionValue;
    height?: DimensionValue;
}

export default function CrimeImage({
    source,
    width = "100%",
    height = 80,
}: crimeImageProps) {
    return (
        <View style={styles.imageBox}>
            <Image style={styles.crimeImage} source={source} />
        </View>
    );
}

const styles = StyleSheet.create({
    imageBox: {
        width: 130,
        height: 130,
        backgroundColor: "#949292"
    },
    crimeImage: {
        resizeMode: "cover",
        width: 130,
        height: 130,
    },
});
