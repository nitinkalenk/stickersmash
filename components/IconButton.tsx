import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label : string,
    icon : keyof typeof MaterialIcons.glyphMap,
    onPress : () => void
}

export default function IconButton( { label, icon, onPress } : Props ) {
    return (
            <Pressable style={styles.iconButton} onPress={onPress}>
                <MaterialIcons name={icon} size={24} color="#fff" />
                <Text style={styles.iconButtonLabel}>{label}</Text>
            </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton : {
        justifyContent : 'center',
        alignContent : 'center'
    },
    iconButtonLabel : {
        color : '#fff',
        marginTop : 12
    }
});