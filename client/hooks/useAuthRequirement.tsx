import { IUser } from "../types/IUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserRole } from "../types/UserRole";

export const useAuthRequirement = (
  currentUser: IUser | null,
  requiredRole: UserRole
) => {
  const router = useRouter();

  const [isAuthValid, setIsAuthValid] = useState(false);

  useEffect(() => {
    if (
      currentUser &&
      requiredRole &&
      currentUser.roles.includes(requiredRole)
    ) {
      setIsAuthValid(true);
    } else {
      router.push("/");
    }
  }, []);

  return isAuthValid;
};
