import { ApolloError } from "@apollo/client";
import { FormInstance } from "antd";

export interface IBook {
  id: string;
  name: string;
  year: number;
  genre: string;
  author: string;
}

export interface IControl {
  loading: boolean;
  error: ApolloError | undefined;
  dataRows: IBook[] | undefined;
  visible: boolean;
  selectedRowKeys: string[];
  onChange: (keys: React.Key[]) => void;
  isAddModal: boolean;
  hasSelected: boolean;
  form: FormInstance<any>;
  handleAdd: () => void;
  handleEdit: (record: IBook) => void;
  handleDelete: () => void;
  handleOk: () => void;
  handleCancel: () => void;
}
