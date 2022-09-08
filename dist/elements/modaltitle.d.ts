import { BreadCumbType } from '../types';
interface ModalTitleProps {
    breadCumbLists: BreadCumbType[];
    toggleBreadCumbIndex: (index: number) => void;
    refetch: any;
}
declare const ModalTitle: ({ toggleBreadCumbIndex, breadCumbLists, refetch }: ModalTitleProps) => JSX.Element;
export default ModalTitle;
