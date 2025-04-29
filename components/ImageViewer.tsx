import { Image, ImageSource } from "expo-image";
import { StyleSheet } from "react-native";

type ImageProps = {
    defaultImageSource : ImageSource,
    selectedImage? : string
}

export default function ImageViewer({ defaultImageSource, selectedImage } : ImageProps) {
    const imgSource = selectedImage ? { uri : selectedImage } : defaultImageSource;
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