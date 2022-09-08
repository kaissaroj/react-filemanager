declare const MenuOption: ({ type, link, showRenameModal, prefix, refetch }: {
    type: string;
    link: string;
    showRenameModal: (data: any) => void;
    refetch: any;
    prefix: string;
}) => JSX.Element;
export default MenuOption;
