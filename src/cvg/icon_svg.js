import React from 'react'
import Arrowiosbackoutline from './arrow-ios-back-outline.svg'
import Checkmarkcircleoutline from './checkmark-circle-outline.svg'
import Calendaroutline from './calendar-outline.svg'

import Poweroutline from './power-outline.svg'
import Homer from './homer.svg'

import IconGradient from './icon_gradient.js'
function Index(props) {




  function smpl(name, width, height, fill) {
    switch (name) {
      case "arrow-ios-back-outline":
        return <Arrowiosbackoutline width={width} height={height} fill={fill} />;
      case "checkmark-circle-outline":
        return <Checkmarkcircleoutline width={width} height={height} fill={fill} />;
      case "calendar-outline":
        return <Calendaroutline width={width} height={height} fill={fill} />;
      case "power-outline":
        return <Poweroutline width={width} height={height} fill={fill} />;
        case "homer":
          return <Homer width={width} height={height} fill={fill} />;

      default: return false
        break;
    }
  }

/*
  function grdnt(props) {<IconGradient/>}
*/

  const simple = smpl(props.name, props.width, props.height, props.fill)
  const gradient = smpl(props.name, props.width, props.height, props.fill)

  if (props.gradient) {
    return (<>{gradient}</>)
  }
  else {
    return (
      <>{simple}</>
    )
  }
}

export default Index;