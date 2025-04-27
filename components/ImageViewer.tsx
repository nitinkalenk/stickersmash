import { Image, ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

type ImageProps = {
    imgSource : ImageSource
}

export default function ImageViewer({ imgSource } : ImageProps) {
    return (
        <Image source={imgSource} style={styles.image}></Image>
    );
}

const styles = StyleSheet.create({
    image : {
        width : 320,
        height : 440,
        borderRadius : 18,
    }
})