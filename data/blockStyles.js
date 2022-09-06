// Icon imports
import { NumberedListLeft, List } from "iconoir-react";
import { H1, H2 } from "@/components/Icon";

const blockStyles = [
  {
    label: "header-one",
    Icon: <H1 className="w-4 h-4 text-gray-900" />,
  },
  {
    label: "header-two",
    Icon: <H2 className="w-4 h-4 text-gray-900" />,
  },
  {
    label: "ordered-list-item",
    Icon: <NumberedListLeft className="w-5 h-5 text-gray-900" />,
  },
  {
    label: "unordered-list-item",
    Icon: <List className="w-5 h-5 text-gray-900" />,
  },
];

export default blockStyles;
