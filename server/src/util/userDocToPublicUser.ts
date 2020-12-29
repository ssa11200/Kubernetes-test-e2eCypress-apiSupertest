import { UserDocument } from "../models/user";
import { IPublicUser } from "../types/IPublicUser";

export const userDocToPublicUser = (user: UserDocument) => {
  const publicUser: IPublicUser = {
    id: user._id,
    name: user.name,
    preferredRange: user.preferredRange,
    roles: user.roles,
    type: user.type,
    location: user.location,
    distance: user.distance,
  };

  return publicUser;
};
