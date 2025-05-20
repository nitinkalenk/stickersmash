import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { View, StyleSheet, Text, ImageSourcePropType } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { saveToLibraryAsync, usePermissions } from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const placeHolder = require('@/assets/images/background-image.png');

export default function Index() {
  const imageRef = useRef<View>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  const [status, requestPermission] = usePermissions();
  if(status == null) {
    requestPermission();
  }

  const launchImagePickerAsync = async () => {
    console.log('lanuching imnage picker');
    let result = await launchImageLibraryAsync({
      mediaTypes : ['images'],
      allowsEditing : true,
      quality : 1
    });
    if(!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image');
    }
  }

  const onReset = () => {
    console.log('resetting');
    setShowAppOptions(false);
  }

  const onOpenEmojiPopup = () => {
    console.log('opening image popup');
    setModalVisible(true);
  }

  const onSaveImageAsync = async () => {
    console.log('saving');
    const imageUri = await captureRef(imageRef, {
      height : 440,
      width : 1
    });
    console.log(imageUri);
    await saveToLibraryAsync(imageUri);
    if(imageUri) {
      alert('Saved');
    }
  }

  const onModalClose = () => {
    console.log('on modal close');
    setModalVisible(false);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer defaultImageSource={placeHolder} selectedImage={image} />
            {pickedEmoji && <EmojiSticker stickerSource={pickedEmoji} size={40}></EmojiSticker>}
          </View>
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onOpenEmojiPopup} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme='primary' label="Choose a photo" onPress={launchImagePickerAsync}></Button>
            <Button label="Use this photo"></Button>
          </View>
        )}
        <EmojiPicker visible={modalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}></EmojiList>
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer : {
    flex : 1,
  },
  footerContainer : {
    flex : 1 / 3,
    alignItems : 'center',
  },
  optionsContainer : {
    position : 'absolute',
    bottom : 80
  },
  optionsRow : {
    alignItems : 'center',
    flexDirection : 'row'
  }
});
