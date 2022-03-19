import React from 'react'

import Activityoutline from './activity-outline.svg'
import Alertcircleoutline from './alert-circle-outline.svg'
import Alerttriangleoutline from './alert-triangle-outline.svg'
import Arrowbackoutline from './arrow-back-outline.svg'
import Arrowforwardoutline from './arrow-forward-outline.svg'
import Arrowiosbackoutline from './arrow-ios-back-outline.svg'
import Arrowiosdownwardoutline from './arrow-ios-downward-outline.svg'
import Arrowiosforwardoutline from './arrow-ios-forward-outline.svg'
import Arrowiosupwardoutline from './arrow-ios-upward-outline.svg'
import Awardoutline from './award-outline.svg'
import Bell from './bell.svg'
import Belloutline from './bell-outline.svg'
import Briefcaseoutline from './briefcase-outline.svg'
import Calendaroutline from './calendar-outline.svg'
import Cameraoutline from './camera-outline.svg'
import Checkmarkcircle2outline from './checkmark-circle-2-outline.svg'
import Checkmarkoutline from './checkmark-outline.svg'
import Checkmarkcircleoutline from './checkmark-circle-outline.svg'
import Checkmarksquare2outline from './checkmark-square-2-outline.svg'
import Checkmarksquareoutline from './checkmark-square-outline.svg'
import Clipboardoutline from './clipboard-outline.svg'
import Clockoutline from './clock-outline.svg'
import Closecircleoutline from './close-circle-outline.svg'
import Closeoutline from './close-outline.svg'
import Fileaddoutline from './file-add-outline.svg'
import Heart from './heart.svg'
import Heartoutline from './heart-outline.svg'
import Menuoutline from './menu-outline.svg'
import Messagecircleoutline from './message-circle-outline.svg'
import Person from './person.svg'
import Personoutline from './person-outline.svg'
import Poweroutline from './power-outline.svg'
import Searchoutline from './search-outline.svg'
import Shoppingcartoutline from './shopping-cart-outline.svg'

import Medic from './medic.svg'


import Settings from './settings.svg'
import Settingsoutline from './settings-outline.svg'


function Index(props) {
  let itsGradient = false
  let colorFrom, colorTo

  if (props.gradient === true) {
    itsGradient = true;
    colorFrom = props.colors[0]
    colorTo = props.colors[1]
  }

  function filter() {
    switch (props.name) {
      case "activity-outline":
        return <Activityoutline width={props.width} height={props.height} fill={props.fill} />;
      case "alert-circle-outline":
        return <Alertcircleoutline width={props.width} height={props.height} fill={props.fill} />;
      case "alert-triangle-outline":
        return <Alerttriangleoutline width={props.width} height={props.height} fill={props.fill} />;
      case "arrow-back-outline":
        return <Arrowbackoutline width={props.width} height={props.height} fill={props.fill} />;
      case "arrow-forward-outline":
        return <Arrowforwardoutline width={props.width} height={props.height} fill={props.fill} />;
      case "arrow-ios-back-outline":
        return <Arrowiosbackoutline width={props.width} height={props.height} fill={props.fill} />;
      case "arrow-ios-downward-outline":
        return <Arrowiosdownwardoutline width={props.width} height={props.height} fill={props.fill} />;
      case "arrow-ios-forward-outline":
        return <Arrowiosforwardoutline width={props.width} height={props.height} fill={props.fill} />;
      case "arrow-ios-upward-outline":
        return <Arrowiosupwardoutline width={props.width} height={props.height} fill={props.fill} />;
      case "award-outline":
        return <Awardoutline width={props.width} height={props.height} fill={props.fill} />;

      case "bell":
        return <Bell width={props.width} height={props.height} fill={props.fill} />;


      case "bell-outline":
        return <Belloutline width={props.width} height={props.height} fill={props.fill} />;
      case "briefcase-outline":
        return <Briefcaseoutline width={props.width} height={props.height} fill={props.fill} />;
      case "calendar-outline":
        return <Calendaroutline width={props.width} height={props.height} fill={props.fill} />;
      case "camera-outline":
        return <Cameraoutline width={props.width} height={props.height} fill={props.fill} />;
      case "checkmark-outline":
        return <Checkmarkoutline width={props.width} height={props.height} fill={props.fill} />;
      case "checkmark-circle-2-outline":
        return <Checkmarkcircle2outline width={props.width} height={props.height} fill={props.fill} />;
      case "checkmark-circle-outline":
        return <Checkmarkcircleoutline width={props.width} height={props.height} fill={props.fill} />;
      case "checkmark-square-2-outline":
        return <Checkmarksquare2outline width={props.width} height={props.height} fill={props.fill} />;
      case "checkmark-square-outline":
        return <Checkmarksquareoutline width={props.width} height={props.height} fill={props.fill} />;
      case "clipboard-outline":
        return <Clipboardoutline width={props.width} height={props.height} fill={props.fill} />;
      case "clock-outline":
        return <Clockoutline width={props.width} height={props.height} fill={props.fill} />;
      case "close-circle-outline":
        return <Closecircleoutline width={props.width} height={props.height} fill={props.fill} />;
      case "close-outline":
        return <Closeoutline width={props.width} height={props.height} fill={props.fill} />;
      case "file-add-outline":
        return <Fileaddoutline width={props.width} height={props.height} fill={props.fill} />;
      case 'heart':
        return <Heart width={props.width} height={props.height} fill={props.fill} />;
      case 'heart-outline':
        return <Heartoutline width={props.width} height={props.height} fill={props.fill} />;



        case "medic":
          return <Medic width={props.width} height={props.height} fill={props.fill} />;
          
      case "menu-outline":
        return <Menuoutline width={props.width} height={props.height} fill={props.fill} />;
      case "message-circle-outline":
        return <Messagecircleoutline width={props.width} height={props.height} fill={props.fill} />;
      case "person":
        return <Person width={props.width} height={props.height} fill={props.fill} />;
      case "person-outline":
        return <Personoutline width={props.width} height={props.height} fill={props.fill} />;
      case "power-outline":
        return <Poweroutline width={props.width} height={props.height} fill={props.fill} />;
      case "search-outline":
        return <Searchoutline width={props.width} height={props.height} fill={props.fill} />;
      case "shopping-cart-outline":
        return <Shoppingcartoutline width={props.width} height={props.height} fill={props.fill} />;


      case "settings":
        return <Settings width={props.width} height={props.height} fill={props.fill} />;
      case "settings-outline":
        return <Settingsoutline width={props.width} height={props.height} fill={props.fill} />;







      default: return false
        break;
    }
  }
  const res = filter()
  return <>{res}</>
}
export default Index;