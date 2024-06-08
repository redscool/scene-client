import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, Pressable, Modal, View} from 'react-native';

import colors from '../config/colors';
import fonts from '../config/fonts';
import Icon from '../Icons';

const Dropdown = ({data, label, onSelect, placeholder, style}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggle = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setTimeout(() => setVisible(true), 30);
  };

  const onItemPress = item => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const Item = ({item}) => {
    return (
      <Pressable style={styles.item} onPress={() => onItemPress(item)}>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </Pressable>
    );
  };

  const DropDownBody = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={Item}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Pressable ref={DropdownButton} style={styles.input} onPress={toggle}>
        <DropDownBody />
        <Text style={styles.text}>
          {(selected && selected.label) || (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
        </Text>
        <Icon
          size={16}
          style={styles.icon}
          color={colors.medium}
          name="chevronDown"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 50,
    width: '80%',
  },
  dropdown: {
    alignSelf: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 8,
    position: 'absolute',
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 4,
    color: colors.medium,
    flexDirection: 'row',
    fontFamily: fonts[500],
    fontSize: 14,
    height: 28,
    marginBottom: 0,
    marginTop: 'auto',
    padding: 0,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  item: {
    height: 28,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  itemLabel: {
    color: colors.medium,
    fontFamily: fonts[500],
    fontSize: 14,
  },
  label: {
    color: colors.white,
    fontFamily: fonts[600],
    fontSize: 12,
    marginLeft: 10,
  },
  overlay: {
    height: '100%',
    width: '100%',
  },
  placeholder: {
    color: colors.placeholder,
  },
  text: {
    color: colors.medium,
    flex: 1,
    fontFamily: fonts[500],
    fontSize: 14,
  },
});

export default Dropdown;
