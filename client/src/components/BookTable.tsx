import { Table, Button, Modal, Spin } from "antd";
import BookForm from "./BookForm";
import useControl from "../hooks/useControl";
import { IBook, IControl } from "../interfaces/interface";

/**
 * Компонент содержащий таблицу книг с кнопками добавления, удаления и редактирования книг
 */
function BookTable() {
  const {
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
  }: IControl = useControl();

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Genre", dataIndex: "genre", key: "genre" },
    { title: "Author", dataIndex: "author", key: "author" },
    {
      title: "Actions",
      render: (text: any, record: IBook) => (
        <Button onClick={() => handleEdit(record)}>Edit</Button>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;

  if (error) return <h1>Что-то пошло не так...</h1>;

  return (
    <>
      <Button onClick={handleAdd}>Add Book</Button>
      <Button onClick={handleDelete} disabled={!hasSelected}>
        Delete Selected Books
      </Button>
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange,
        }}
        dataSource={dataRows}
        columns={columns}
      />
      <Modal
        title={`${isAddModal ? "Add" : "Edit"} Modal`}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <BookForm form={form} />
      </Modal>
    </>
  );
}

export default BookTable;
