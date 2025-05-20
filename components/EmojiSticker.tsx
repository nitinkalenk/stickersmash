import { Image } from "expo-image";
import { ImageSourcePropType, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Props = {
    stickerSource : ImageSourcePropType,
    size : number
}

export default function EmojiSticker( { stickerSource, size } : Props ) {
    const scaleImage = useSharedValue(size);
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if(scaleImage.value != size * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = scaleImage.value / 2;
            }
        });
    const imageStyle = useAnimatedStyle(() => {
        return {
            width : withSpring(scaleImage.value),
            height : withSpring(scaleImage.value)
        }
    });
    
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const pan = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform : [
                {
                    translateX : translateX.value
                },
                {
                    translateY : translateY.value
                }
            ]
        };
    });

    return (
        <GestureDetector gesture={pan}>
        <Animated.View style={[containerStyle, { top : -350 }]}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image source={stickerSource} style={[imageStyle, { width : size, height : size }]} resizeMode="contain"></Animated.Image>
            </GestureDetector>
        </Animated.View>
        </GestureDetector>
    );
}