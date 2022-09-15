import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "./Button";

function FileUpload() {
  const ref = useRef();
  const [disabled, setDisabled] = useState(true);
  const [operation, setOperation] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = ref.current.files[0];
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    axios
      .post("http://127.0.0.1:8000/operation/upload/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res);
        setDisabled(true);
      });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.replace("/authenticate");
  };

  const splitByType = () => {
    const file = ref.current.files[0];
    let formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(`http://localhost:8000/operation/splitbytype/`, formData, config)
      .then((res) => {
        console.log(res);
        setOperation(res.data);
      });
  };
  const splitByContentRating = () => {
    const file = ref.current.files[0];
    let formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        `http://localhost:8000/operation/splitbycontentrating/`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        setOperation(res.data);
      });
  };
  const addRatingRoundoff = () => {
    const file = ref.current.files[0];
    let formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    axios
      .post(
        `http://localhost:8000/operation/addratingroundoff/`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        setOperation(res.data);
      });
  };

  const handleChange = () => {
    setDisabled(false);
  };

  return (
    <div className="space-y-20">
      <div className="w-full flex p-5 justify-center items-center mt-5 md:mt-12">
        <div className="m-auto">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" ref={ref} onChange={handleChange} />
            <button
              type="submit"
              disabled={disabled}
              className="btn bg-green-500 active:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </form>
          <div className="flex flex-col space-y-2 mt-10">
            <button
              className="btn bg-violet-500 active:bg-violet-600"
              onClick={splitByType}
            >
              Split by type
            </button>
            <button
              className="btn bg-yellow-500 active:bg-yellow-600"
              onClick={splitByContentRating}
            >
              Split by Content Rating
            </button>
            <button
              className="btn bg-orange-500 active:bg-orange-600"
              onClick={addRatingRoundoff}
            >
              Add Rating Roundoff
            </button>
          </div>
          <div className="mt-4 border-t border-t-gray-800 pt-10 space-y-5">
            {operation.map((item, idx) => {
              return <Button key={idx} link={item.url} label={item.name} />;
            })}
          </div>
        </div>
      </div>
      <div className="relative">
        <button className="btn absolute right-10 bottom-10" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
