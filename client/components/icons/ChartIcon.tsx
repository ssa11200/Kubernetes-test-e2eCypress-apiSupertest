import { MenuItemSVG } from "../../types/MenuItemSVG";

export const ChartIcon = ({ isSelected, ...props }: MenuItemSVG) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="chart tab">
      <path
        id="icon/action/assessment_24px"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM9 10H7V17H9V10ZM11 7H13V17H11V7ZM17 13H15V17H17V13Z"
        fill={isSelected ? "#101A3F" : "black"}
        fillOpacity={isSelected ? "1" : "0.54"}
      />
    </g>
  </svg>
);
