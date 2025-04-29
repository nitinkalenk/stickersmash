import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
    visible : boolean;
    onClose : () => void;
}>

export default function EmojiPicker( { visible, onClose, children } : Props ) {
    return (
        <View>
            <Modal animationType='slide' transparent={true} visible={visible}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" size={22} color="#fff"></MaterialIcons>
                        </Pressable>
                        <Text style={styles.title}>Choose a sticker</Text>
                    </View>
                    {children}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent : {
        height : '25%',
        width : '100%',
        backgroundColor : '#25292e',
        borderTopRightRadius : 18,
        borderTopLeftRadius : 18,
        position : 'absolute',
        bottom : 0
    },
    titleContainer : {
        height : '16%',
        backgroundColor : '#464c55',
        borderTopRightRadius : 10,
        borderTopLeftRadius : 10,
        paddingHorizontal : 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    title : {
        color : '#fff',
        fontSize : 16
    }
});