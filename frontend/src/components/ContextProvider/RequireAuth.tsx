import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
    children: ReactNode | any;
}

const RequireAuth: FC<Props> = ({ children }) => {
    const location = useLocation();

    return sessionStorage.getItem("accessToken") ? (
        children
    ) : (
        <Navigate to={"/login"} state={{ from: location }} />
    );
};

export default RequireAuth;
