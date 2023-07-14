import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Context = createContext();

const URL = "https://649aaf0ebf7c145d02394cc8.mockapi.io/api/v1/news";
const Provider = ({ children }) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [news, setNews] = useState([]);

  // for delete staff
  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure that you want to delete a staff with ID ${id} `)) {
      try {
        const res = await axios.delete(`${URL}/${id}`);
        if (res.status === 200) {
          getListStaff();
          toast.success("Deleted Successfully ~", { toastId: "deleteSuccess" });
        } else {
          toast.error("Delete Error!");
        }
      } catch (error) {
        toast.error("Delete Error!");
      }
    }
  };

  // for update staff
  const handleUpdate = async (id, data) => {
    try {
      const res = await axios.put(`${URL}/${id}`, data);
      if (res.status === 200) {
        toast.success(`Updated Staff with ID: ${id} successfully ~`, { toastId: "updateSuccess" });
        getListStaff();
      }
    } catch (error) {
      toast.error("Update Error!");
    }
  };

  // add new staff
  const handleAddNew = async (data) => {
    const res = await axios.post(`${URL}`, data);
    if (res.status === 200 || res.status === 201) {
      toast.success("New staff has been added successfully!", { toastId: "addSuccess" });
      getListStaff();
      <Navigate to="/dashboard" />;
    }
  };

  // format date of staff
  const FormatDate = (staffDate) => {
    const date = new Date(staffDate);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };

  // get all list of staff from MOCAPI
  const getListStaff = async () => {
    try {
      const response = await fetch(`${URL}`);
      const fetchedData = await response.json();
      setNews(fetchedData);
    } catch (error) {
      toast.error("Failed to fetch staffs!");
    }
  };

  useEffect(() => {
    getListStaff();
  }, []);

  return (
    <Context.Provider
      value={{
        isLogged,
        news,
        handleDelete,
        FormatDate,
        handleUpdate,
        handleAddNew,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
