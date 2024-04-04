import { Form, Input, FormInstance } from "antd";

/**
 * Компонент формы для управления данными в модальном окне
 */
function BookForm({ form }: { form: FormInstance<any> }) {
  return (
    <Form form={form}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="year" label="Year" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );
}

export default BookForm;
