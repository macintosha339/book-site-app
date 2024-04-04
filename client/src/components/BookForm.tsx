import { Form, Input, FormInstance } from "antd";
import validateYear from "../utils/validateYear";

/**
 * Компонент формы для управления данными в модальном окне
 */
function BookForm({ form }: { form: FormInstance<any> }) {
  return (
    <Form form={form}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Поле Name обязательное!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true }, { validator: validateYear }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="genre"
        label="Genre"
        rules={[{ required: true, message: "Поле Genre обязательное!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: "Поле Author обязательное!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default BookForm;
