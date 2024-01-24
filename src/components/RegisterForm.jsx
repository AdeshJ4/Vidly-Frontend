import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().min(11, {message: "Email should be 11 character long"}).max(255).email(),
  password: z.string().min(8).max(26),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className="form-control"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

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
          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">
          password
          </label>
          <input
            {...register("email")}
            id="password"
            type="password"
            className="form-control"
          />
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
