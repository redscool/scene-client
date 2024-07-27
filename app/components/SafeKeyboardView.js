import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const SafeKeyboardView = ({ children, style = {} }) => {
    const headerHeight = useHeaderHeight();
    return (
        <KeyboardAvoidingView
            style={[styles.container, style]}
            keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight + 50 : headerHeight + 10}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    );
};

export default SafeKeyboardView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
