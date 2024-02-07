import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  deleteCustomer,
  getCustomers,
  getCustomersByMemberships,
  getCustomersBySearchQuery,
} from "../../services/customerService";
import { paginate } from "../../utils/paginate";
import { Link } from "react-router-dom";
import CustomerTable from "../Customer/CustomerTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";
import Membership from "./Membership";

const Customer = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" }); // customer name is "name"
  const [count, setTotalCount] = useState();
  const [selectedMembership, setSelectedMembership] = useState(null);
  const memberships = ["Bronze", "Silver", "Gold"];

  const fetchCustomers = async () => {
    try {
      let customersData;
      if (searchQuery) {
        customersData = await getCustomersBySearchQuery(
          searchQuery,
          currentPage
        );
      } else if (selectedMembership) {
        customersData = await getCustomersByMemberships(selectedMembership, currentPage);
      } else {
        customersData = await getCustomers(currentPage);
      }
      const sorted = _.orderBy(
        customersData.data.customers,
        [sortColumn.path],
        [sortColumn.order]
      );
      setCustomers(sorted);
      setTotalCount(customersData.data.count);
    } catch (err) {
      toast.error("Failed to fetch customers.");
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, [currentPage, searchQuery, selectedMembership]);

  // delete customers
  async function handleDelete(customer) {
    const originalCustomers = [...customers];
    try {
      setCustomers(customers.filter((c) => c._id !== customer._id));
      await deleteCustomer(customer._id);
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 404) {
        toast.error("This customer has already been deleted.");
      }
      setMovies(originalCustomers);
    }
  }

  // you will get page no from Pagination and according to that you have to fetch customers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
    setCustomers(sorted);
  };

  const handleMembershipSelect = (Membership) => {
    setSelectedMembership(Membership);
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (count === 0) <p>There are no customers in the database.</p>;

  return (
    <div className="row">
      <div className="col-md-3 mb-3">
        <Membership
          memberships={memberships}
          selectedMembership={selectedMembership}
          onMembershipSelect={handleMembershipSelect}
        />
      </div>

      <div className="col-md-9">
        {user && (
          <Link
            to="/customers/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Customer
          </Link>
        )}
        <p class="text-muted">
          Showing <span class="text-primary">{count}</span> Customers in the
          database.
        </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <CustomerTable
          customers={customers}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize} // 6 customers on one page
          currentPage={currentPage} // initially one
          onPageChange={handlePageChange} // event handle to change page number
        />
      </div>
    </div>
  );
};

export default Customer;
// import _ from "lodash";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { deleteCustomer, getCustomers } from "../../services/customerService";
// import { paginate } from "../../utils/paginate";
// import { Link } from "react-router-dom";
// import CustomerTable from "../Customer/CustomerTable";
// import Pagination from "../common/Pagination";
// import SearchBox from "../common/SearchBox";

// const Customer = ({ user }) => {
//   const [customers, setCustomers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" }); // customer name is "name"
//   const count = customers.length;

//   // fetch customers
//   async function fetchCustomers() {
//     try {
//       //It's extracting the data property from the object returned by getGenres() and renaming it to customerData.
//       const { data: customerData } = await getCustomers();
//       setCustomers(customerData);
//       console.log('Customers: ', customerData);
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   // delete movies
//   async function handleDelete(customer) {
//     const originalCustomers = [...customers];
//     try {
//       setCustomers(customers.filter((c) => c._id !== customer._id));
//       await deleteCustomer(customer._id);
//     } catch (err) {
//       console.log(err.response);
//       if (err.response && err.response.status === 404) {
//         toast.error("This customer has already been deleted.");
//       }
//       setMovies(originalCustomers);
//     }
//   }

//   // you will get page no from Pagination and according to that you have to fetch customers
//   const handlePageChange = (page) => {
//     // page = 1, 2, 3
//     setCurrentPage(page);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   // sorting customers  -> { path: "name", order: "asc" }
//   const handleSort = (sortColumn) => {
//     setSortColumn(sortColumn);
//   };

//   // Filters and sorts the customers based on the current state (e.g., search query, sort column, etc.).
//   const getPagedData = () => {
//     const allCustomers = [...customers];
//     let filtered = allCustomers;

//     if (searchQuery)
//       filtered = allCustomers.filter((c) =>
//         c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
//       );

//     const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
//     const pagedCustomers = paginate(sorted, currentPage, pageSize);

//     return { totalCount: filtered.length, data: pagedCustomers };
//   };

//   if (count === 0) <p>There are no customers in the database.</p>;
//   const { totalCount, data } = getPagedData();

//   return (
//     <div className="row">
//       <div className="col">
//         {user && (
//           <Link
//             to="/customers/new"
//             className="btn btn-primary"
//             style={{ marginBottom: 20 }}
//           >
//             New Customer
//           </Link>
//         )}
//         <p class="text-muted">
//           Showing <span class="text-primary">{totalCount}</span> Customers in
//           the database.
//         </p>
//         <SearchBox value={searchQuery} onChange={handleSearch} />
//         <CustomerTable
//           customers={data}
//           sortColumn={sortColumn}
//           onDelete={handleDelete}
//           onSort={handleSort}
//         />
//         <Pagination
//           itemsCount={totalCount}
//           pageSize={pageSize} // 6 customers on one page
//           currentPage={currentPage} // initially one
//           onPageChange={handlePageChange} // event handle to change page number
//         />
//       </div>
//     </div>
//   );
// };

// export default Customer;
