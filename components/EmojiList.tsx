import { FlatList, Image, ImageSourcePropType, Pressable, StyleSheet, Text } from "react-native";

type Props = {
    onSelect : (image : ImageSourcePropType ) => void,
    onCloseModal : () => void
}

export default function EmojiList({ onSelect, onCloseModal } : Props) {

    const emojis = [
        require("../assets/images/emoji1.png"),
        require("../assets/images/emoji2.png"),
        require("../assets/images/emoji3.png"),
        require("../assets/images/emoji4.png"),
        require("../assets/images/emoji5.png")
    ];

    return (
        <FlatList 
            horizontal
            data={emojis}
            contentContainerStyle = {styles.listContainer}
            renderItem={ ( { item, index } ) => (
                <Pressable
                    onPress={ () => {
                        onSelect(item);
                        onCloseModal();
                    }}>
                    <Image source={item} key={index} style={styles.image}></Image>
                </Pressable>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 20,
    },
  });