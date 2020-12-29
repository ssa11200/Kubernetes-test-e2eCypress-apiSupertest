import { MenuItemSVG } from "../../types/MenuItemSVG";

export const SMSIcon = ({ isSelected, ...props }: MenuItemSVG) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="sms_24px">
      <path
        id="icon/notification/sms_24px"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM9 9H7V11H9V9ZM15 9H17V11H15V9ZM13 9H11V11H13V9Z"
        fill={isSelected ? "#101A3F" : "black"}
        fillOpacity={isSelected ? "1" : "0.54"}
      />
    </g>
  </svg>
);