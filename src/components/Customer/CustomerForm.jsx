import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import { getCustomer, saveCustomer } from "../../services/customerService";

const CustomerForm = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    isGold: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  const populateCustomer = async () => {
    const customerId = id;
    if (customerId === "new") return;
    try {
      const { data: customer } = await getCustomer(customerId);
      setData(mapToViewModel(customer));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) navigate("*");
    }
  };

  const mapToViewModel = (customer) => {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      isGold: customer.isGold,
    };
  };

  useEffect(() => {
    populateCustomer();
  }, [id]);

  const submitCustomer = async (id, submittedData) => {
    if (id === "new") {
      await saveCustomer(submittedData);
    } else {
      await saveCustomer({ _id: id, ...submittedData });
    }
    navigate("/customers");
  };

  const onSubmit = (submittedData) => {
    console.log(submittedData);
    submitCustomer(id, submittedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Customer Name
        </label>
        <input
          {...register("name")}
          type="text"
          defaultValue={data["name"]}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone No
        </label>
        <input
          {...register("phone")}
          type="number"
          defaultValue={data["phone"]}
          className="form-control"
        />
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
        </div>


      <div className="form-group mb-3">
        <label className="form-label">Membership</label>
        <select
          {...register("isGold")}
          defaultValue={data["isGold"]}
          className="form-control"
        >
          <option value=""> -- Want Membership -- </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>


      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
