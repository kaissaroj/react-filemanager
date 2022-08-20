import { listType } from '../types';
interface ListProps {
    data: listType[];
    updateBreadBumbIndex: (title: string, link: string) => void;
}
export default function Lists({ data, updateBreadBumbIndex }: ListProps): JSX.Element;
export {};
