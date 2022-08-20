import { BreadCumbType } from '../types';
interface ModalTitleProps {
    breadCumbLists: BreadCumbType[];
    toggleBreadCumbIndex: (index: number) => void;
}
declare const ModalTitle: ({ toggleBreadCumbIndex, breadCumbLists }: ModalTitleProps) => JSX.Element;
export default ModalTitle;
