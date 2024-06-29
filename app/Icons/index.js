import React from 'react';

import Account from './Account';
import Back from './Back';
import Calendar from './Calendar';
import Categories from './Categories';
import ChevronDown from './ChevronDown';
import ChevronRight from './ChevronRight';
import Cross from './Cross';
import Dot from './Dot';
import Email from './Email';
import Favourite from './Favourite';
import FavouriteSolid from './FavouriteSolid';
import Filter from './Filter';
import Google from './Google';
import Home from './Home';
import IndianFlag from './IndianFlag';
import Location from './Location';
import PowerOff from './PowerOff';
import Rupee from './Rupee';
import Search from './Search';
import Ticket from './Ticket';
import Timer from './Timer';
import Share from './Share';

const map = {
  account: ({color, size, style}) => (
    <Account color={color} size={size} style={style} />
  ),
  back: ({color, size, style}) => (
    <Back color={color} size={size} style={style} />
  ),
  calendar: ({color, size, style}) => (
    <Calendar color={color} size={size} style={style} />
  ),
  categories: ({color, size, style}) => (
    <Categories color={color} size={size} style={style} />
  ),
  chevronDown: ({color, size, style}) => (
    <ChevronDown color={color} size={size} style={style} />
  ),
  chevronRight: ({color, size, style}) => (
    <ChevronRight color={color} size={size} style={style} />
  ),
  cross: ({color, size, style}) => (
    <Cross color={color} size={size} style={style} />
  ),
  dot: ({color, size, style}) => (
    <Dot color={color} size={size} style={style} />
  ),
  email: ({color, size, style}) => (
    <Email color={color} size={size} style={style} />
  ),
  favourite: ({color, size, style}) => (
    <Favourite color={color} size={size} style={style} />
  ),
  favouriteSolid: ({color, size, style}) => (
    <FavouriteSolid color={color} size={size} style={style} />
  ),
  filter: ({color, size, style}) => (
    <Filter color={color} size={size} style={style} />
  ),
  google: ({color, size, style}) => (
    <Google color={color} size={size} style={style} />
  ),
  home: ({color, size, style}) => (
    <Home color={color} size={size} style={style} />
  ),
  indianFlag: ({color, size, style}) => (
    <IndianFlag color={color} size={size} style={style} />
  ),
  location: ({color, size, style}) => (
    <Location color={color} size={size} style={style} />
  ),
  powerOff: ({color, size, style}) => (
    <PowerOff color={color} size={size} style={style} />
  ),
  rupee: ({color, size, style}) => (
    <Rupee color={color} size={size} style={style} />
  ),
  search: ({color, size, style}) => (
    <Search color={color} size={size} style={style} />
  ),
  share: ({color, size, style}) => (
    <Share color={color} size={size} style={style} />
  ),
  ticket: ({color, size, style}) => (
    <Ticket color={color} size={size} style={style} />
  ),
  timer: ({color, size, style}) => (
    <Timer color={color} size={size} style={style} />
  ),
};

export default function Icon({color = '#000', name, size = 8, style}) {
  return <>{map[name] && map[name]({color, size, style})}</>;
}
