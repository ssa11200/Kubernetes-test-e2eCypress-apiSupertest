import { UserRole } from "./UserRole";
import { ILocation } from "./ILocation";

export interface IPublicUser {
  id: string;
  name: string;
  preferredRange: number;
  roles: UserRole[];
  type: UserRole;
  location: ILocation;
  distance?: number;
}
