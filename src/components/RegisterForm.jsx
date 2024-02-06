import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const schema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must contain at least 5 characters" })
    .max(50),
  email: z
    .string()
    .min(11, { message: "Email should be 11 character long" })
    .max(50)
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

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await userService.register(data);
      window.location = "/login";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="row"
      style={{ background: "linear-gradient(to right, #0062E6, #33AEFF)" }}
    >
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign Up
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="form-floating mb-3">
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                  placeholder="Adesh Jadhav"
                />
                <label>Name</label>
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
                <label>Email</label>
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
                <input
                  {...register("password")}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <label>Password</label>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* Button */}
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                  style={{
                    fontSize: "0.9rem",
                    letterSpacing: "0.05rem",
                    padding: "0.75rem 1rem",
                  }}
                >
                  Sign Up
                </button>
              </div>
              <hr className="my-4" />

              {/* Google */}
              <div className="d-grid mb-2">
                <button
                  className="btn btn-login text-uppercase fw-bold"
                  type="submit"
                  style={{
                    color: "white",
                    backgroundColor: "#ea4335",
                  }}
                >
                  <FontAwesomeIcon icon={faGoogle} className="me-2" /> Sign in
                  with Google
                </button>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-login text-uppercase fw-bold"
                  type="submit"
                  style={{
                    color: "white",
                    backgroundColor: "#3b5998",
                  }}
                >
                  <FontAwesomeIcon icon={faFacebook} className="me-2" />
                  Sign in with Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
