declare const MenuOption: ({ type, link, showRenameModal }: {
    type: string;
    link: string;
    showRenameModal: (data: any) => void;
}) => JSX.Element;
export default MenuOption;
