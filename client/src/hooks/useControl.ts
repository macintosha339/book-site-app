import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form } from "antd";
import { GET_BOOKS } from "../queries/bookQueries";
import {
  DELETE_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
} from "../mutations/bookMutations";
import { IBook } from "../interfaces/interface";

/**
 * Хук для получения данных и в котором хранится логика компонента BookTable
 */
function useControl() {
  // Получение данных книг
  const { loading, error, data } = useQuery(GET_BOOKS);

  // Состояния для управления видимостью модального окна, выбранными записями, типом модального окна и данными книги
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [typeModal, setTypeModal] = useState<string | null>(null);
  const [id, setId] = useState<string>("");
  const [values, setValues] = useState<IBook>({
    id: "",
    name: "",
    year: 0,
    genre: "",
    author: "",
  });

  const isAddModal = typeModal === "Add";
  const hasSelected = selectedRowKeys.length > 0;

  // Преобразуем массив полученных книг, путем добавления поля key
  const dataRows: IBook[] | undefined = data?.books?.map((item: any) => {
    return {
      ...item,
      key: item?.id,
    };
  });

  // Форма для управления данными в модальном окне
  const [form] = Form.useForm();

  // Мутация для удаления книг
  const [deleteBooks] = useMutation(DELETE_BOOKS, {
    variables: { ids: selectedRowKeys },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  // Мутация для добавления книги
  const [addBook] = useMutation(ADD_BOOK, {
    variables: { ...values },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  // Мутация для обновления книги
  const [updateBook] = useMutation(UPDATE_BOOK, {
    variables: { ...values, id },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  // Обработчик при вызове модалки добавления книги
  const handleAdd = () => {
    setTypeModal("Add");
    setVisible(true);
  };

  // Обработчик при вызове модалки редактирования книги
  const handleEdit = (record: IBook) => {
    setTypeModal("Edit");
    setId(record?.id);
    form.setFieldsValue(record);
    setVisible(true);
  };

  // Обработчик при удалении книг
  const handleDelete = () => {
    deleteBooks();
    setSelectedRowKeys([]);
  };

  // Обработчик при добавлении или редактировании книги в зависимости от типа модалки
  const handleOk = () => {
    form
      .validateFields()
      .then((record) => {
        setValues((prev) => ({
          ...prev,
          ...record,
          year: +record?.year,
        }));
      })
      .then(() => {
        form.resetFields();
        setVisible(false);
        if (isAddModal) {
          addBook();
        } else {
          updateBook();
        }
      })
      .catch((err) => console.log(err));
  };

  // Обработчик при вызове модалки добавления книги
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  // Обработчик изменения выбранных записей
  const onChange = (keys: React.Key[]) => {
    setSelectedRowKeys(keys as string[]);
  };

  return {
    loading,
    error,
    dataRows,
    visible,
    selectedRowKeys,
    onChange,
    isAddModal,
    hasSelected,
    form,
    handleAdd,
    handleEdit,
    handleDelete,
    handleOk,
    handleCancel,
  };
}

export default useControl;
