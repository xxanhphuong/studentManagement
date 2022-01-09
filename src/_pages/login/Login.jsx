import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { ReactComponent as LoginIcon } from "@iso/assets/img/blogging.svg";

import { authAtom } from "@iso/state";
import { useUserActions } from "@iso/actions";

import { Form, Input, Button, Checkbox } from "antd";
export { Login };

function Login({ history }) {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) history.push("/class");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, setError, formState, control } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ username, password }) {
    return userActions.login(username, password).catch((error) => {
      setError("apiError", { message: error });
    });
  }

  return (
    <div className="flex h-screen login-page">
      <div className="bg-primary bg-animation">
        <div className="wrapper">
          <LoginIcon />
          <ul class="bg-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="content-right flex items-center justify-center flex-col">
        <div className="w-7/12">
          <h2 className="text-3xl mb-1 text-primary">Welcome Back!</h2>
          <p className="text-lg mb-1 text-primary ">Login Account</p>
          <p className="mb-4">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration
          </p>
          <div className="card-body">
            {errors.apiError && (
              <div className="err-input mb-0">*{errors.apiError?.message}</div>
            )}
            <form name="basic" onSubmit={handleSubmit(onSubmit)}>
              <Form.Item label="Username" name="username">
                <Controller
                  label="Username"
                  name="username"
                  control={control}
                  rules={{ required: "Please enter your email address" }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <div className="err-input">{errors.username?.message}</div>
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Controller
                  label="Password"
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Input.Password
                      name="password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <div className="err-input">{errors.password?.message}</div>
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Controller
                  control={control}
                  name="remember"
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <div className="flex items-center">
                      <Checkbox
                        onBlur={onBlur}
                        onChange={onChange}
                        checked={value}
                        inputRef={ref}
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2"
                        style={{ marginTop: -2 }}
                      >
                        Remember me
                      </label>
                    </div>
                  )}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
