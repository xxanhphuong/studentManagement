import { useUserActions } from "@iso/actions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ControlFilled } from "@ant-design/icons";
import {
  Drawer,
  Form,
  Button,
  Col,
  InputNumber,
  Row,
  Input,
  Select,
  Radio,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { usersModalVisibleAtom } from "@iso/state/users";

export default function Add() {
  const dateFormat = "YYYY/MM/DD";
  const userActions = useUserActions();
  const userModalVisible = useRecoilValue(usersModalVisibleAtom);
  let { id } = useParams();
  const [visible, setVisible] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    username: Yup.string().required("Username is required"),
    fullName: Yup.string().required("Quantity is required"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    dateOfBirth: Yup.string().required("Date Of Birth is required"),
    role: Yup.string().required("Role is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { handleSubmit, formState, control, setValue, watch, reset } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, []);

  const showDrawer = () => {
    userActions.showUserModal();
  };

  const onClose = () => {
    userActions.hideUserModal();
  };

  // submit form
  async function onSubmit(e) {
    try {
      if (!e.password) {
        e.password =
          watch("username") && watch("dateOfBirth")
            ? `${watch("username")}${moment(watch("dateOfBirth")).format(
                "DDMMyyyy"
              )}`
            : "";
      }
      await userActions.addUser(e);
      toast.success("Add success!!!");
      reset();
    } catch (error) {
      console.log(error);
    }
    return;
  }

  return (
    <div className="user-page">
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={userModalVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <form name="basic" onSubmit={handleSubmit(onSubmit)}>
          <div class="grid grid-cols-2 gap-12">
            <Form.Item label="Username" name="userName">
              <Controller
                label="User name"
                name="username"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    onChange={(e) =>
                      onChange(e.target.value.replace(/\s/g, ""))
                    }
                    value={value}
                  />
                )}
              />
              <div className="err-input">{errors.username?.message}</div>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <Form.Item label="Full name" name="fullName">
              <Controller
                label="Full name"
                name="fullName"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    className={`form-control ${
                      errors.fullname ? "is-invalid" : ""
                    }`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <div className="err-input">{errors.fullName?.message}</div>
            </Form.Item>
            <Form.Item label="Gender">
              <Controller
                control={control}
                name="gender"
                render={() => (
                  <Radio.Group
                    value={watch("gender")}
                    onChange={(e) => {
                      setValue("gender", e.target.value);

                      console.log(e.target.value);
                    }}
                  >
                    <Radio value={"Nam"}>Male</Radio>
                    <Radio value={"Nữ"}>Female</Radio>
                  </Radio.Group>
                )}
              />
              <div className="err-input">{errors.gender?.message}</div>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <Form.Item label="Address" name="address">
              <Controller
                label="address"
                name="address"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Input
                    className={`form-control`}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <div className="err-input">{errors.address?.message}</div>
            </Form.Item>
            <Form.Item label="Date of birth">
              <Controller
                control={control}
                name="dateOfBirth"
                render={() => {
                  return (
                    <DatePicker
                      onChange={(date, dateString) =>
                        setValue("dateOfBirth", dateString)
                      }
                      format={dateFormat}
                    />
                  );
                }}
              />
              <div className="err-input">{errors.dateOfBirth?.message}</div>
            </Form.Item>
          </div>
          <Form.Item label="Role">
            <Controller
              control={control}
              name="role"
              render={() => (
                <Radio.Group
                  value={watch("role")}
                  onChange={(e) => {
                    setValue("role", e.target.value);

                    console.log(e.target.value);
                  }}
                >
                  <Radio value={"admin"}>Admin</Radio>
                  <Radio value={"teacher"}>Teacher</Radio>
                  <Radio value={"student"}>Student</Radio>
                </Radio.Group>
              )}
            />
            <div className="err-input">{errors.role?.message}</div>
          </Form.Item>
          <Form.Item label="Password (auto generate)" name="password">
            <Controller
              label="Password"
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  onChange={onChange}
                  value={`${
                    watch("password")
                      ? watch("password")
                      : watch("username") && watch("dateOfBirth")
                      ? `${watch("username")}${moment(
                          watch("dateOfBirth")
                        ).format("DDMMyyyy")}`
                      : ""
                  }`}
                />
              )}
            />
            <div className="err-input">{errors.password?.message}</div>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
            className="w-2/12"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Add new
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
