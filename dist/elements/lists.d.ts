import { listType } from '../types';
interface ListProps {
    data: listType[];
    updateBreadBumbIndex: (title: string, link: string) => void;
    refetch: any;
}
export default function Lists({ data, refetch, updateBreadBumbIndex }: ListProps): JSX.Element;
export {};
