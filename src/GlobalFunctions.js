import * as Consts from "./pages/Consts.js";

export const getSubTypeDisplayName = (type, subType) => {
  let arr = [];
  switch (type) {
    case "roadblock":
      arr = Consts.RoadblockTypes;
      break;
    case "roadside":
      arr = Consts.RoadsideTypes;
      break;
    case "lostandfounds":
      arr = Consts.LostAndFoundsTypes;
      break;
    default:
      return subType;
  }
  return arr.find((hazard) => hazard.value === subType).text;
};

export const getTypeDisplayName = (type) => {
  return Consts.HazardTypes.find((hazard) => hazard.value === type)?.text;
};

export const getLocationDisplayName = (location) => {
  return Consts.Locations.find((hazard) => hazard.value === location)?.text;
};

export const getActiveUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
}

export const setUserInSession = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
}
