import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "font-awesome/css/font-awesome.css";
import auth from "../services/authService";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .min(11, { message: "Email should be 11 character long" })
    .max(255)
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(26, {
      message: "Password must not exceed 26 characters",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one numeric digit",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await auth.login(data.email, data.password);
      window.location = "/movies";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        // Handle specific login error (e.g., invalid email or password)
        console.log("Invalid email or password");
      } else {
        // Handle other types of errors (e.g., network issues)
        console.log("An error occurred while logging in");
      }
    }
  };
  // const onSubmit = async (data) => {
  //   try {
  //     await auth.login(data.email, data.password);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="form-control"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="form-control"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
