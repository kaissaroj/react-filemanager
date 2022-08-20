import 'antd/dist/antd.css';
import { CreateType } from './types';
interface ReactFileManagerProps {
    visible: boolean;
    getList: (path: string) => Promise<any>;
    deletePath: (path: string) => Promise<any>;
    renamePath: (path: string, newFileName: string) => Promise<any>;
    create: (payload: CreateType) => Promise<any>;
    onClose: () => void;
}
export declare const ReactFileManager: ({ visible, onClose, getList, renamePath, deletePath, create }: ReactFileManagerProps) => JSX.Element;
export {};
