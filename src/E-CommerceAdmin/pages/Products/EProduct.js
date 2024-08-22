/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import SpinnerComp from "../Component/SpinnerComp";
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import BreadCamp from "../Component/BreadCamp";
import axios from "axios";
import BaseUrl from "../../../BaseUrl";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { nofification } from "../../utils/utils";
import { MdDelete } from "react-icons/md";

const EProduct = () => {
  const [query, setQuery] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  //api calling
  const [product, setProduct] = useState([]);
  const getProducts = async () => {
    let url = `${BaseUrl()}api/jobs/all-jobs`;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProduct(res.data.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //delete api api/v1/product/
  const handleDelete = async (id) => {
   
    let url = `${BaseUrl()}api/jobs/delete-job/${id}`;
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getProducts();
      nofification("Jobs Deleted Successfully", "danger");
    } catch (error) {
      
    }
  };

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;

  let pages2 = [];

  const TotolData = query
    ? product?.filter(
        (i) =>
          i?.jobId?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.role?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.location?.toString()?.toLowerCase().includes(query?.toLowerCase())
      )
    : product;

  useEffect(() => {
    if (query) {
      setCurrentPage2(1);
    }
  }, [query]);

  const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);

  for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
    pages2.push(i);
  }

  function Next() {
    setCurrentPage2(currentPage2 + 1);
  }

  function Prev() {
    if (currentPage2 !== 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  }

  function MyVerticallyCenteredModal(props) {
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [keyResponsibilitiesData, setKeyResponsibilitiesData] = useState("");
    const [keyResponsibilities, setKeyResponsibilities] = useState([]);
    const [keyRequirementsData, setKeyRequirementsData] = useState("");
    const [keyRequirements, setKeyRequirements] = useState([]);

    const handleArrayDeleteKeyResponsibilities = (index) => {
      setKeyResponsibilities(keyResponsibilities.filter((_, i) => i !== index));
    };

    const handleArrayDeleteKeyRequirements = (index) => {
      setKeyRequirements(keyRequirements.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
        role,
        location,
        job_description: {
          keyResponsibilities,
          keyRequirements,
        },
      };

      let url = `${BaseUrl()}api/jobs/create-job`;
      try {
        const res = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        getProducts();
        nofification("Jobs Added Successfully", "success");
        setModalShow(false);
      } catch (error) {
        
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reply Help & Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={role}
                placeholder="Enter Role"
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                placeholder="Enter Location"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Responsibilities</Form.Label>
           
              <Form.Control
                as="textarea"
                rows={3}
                value={keyResponsibilitiesData}
                placeholder="Enter Responsibility"
                onChange={(e) => setKeyResponsibilitiesData(e.target.value)}
                
              />
              <Button
                className="mt-2"
                onClick={() => {
                  if (keyResponsibilitiesData === "") {
                    nofification("Please Enter Data", "warning");
                    return;
                  }
                  setKeyResponsibilities([
                    ...keyResponsibilities,
                    keyResponsibilitiesData,
                  ]);
                  setKeyResponsibilitiesData("");
                }}
                style={{ backgroundColor: "#19376d", borderRadius: "0" }}
                type="button"
              >
                Add
              </Button>
            </Form.Group>

            {keyResponsibilities?.map((data, index) => (
              <div
                key={index}
                className="d-flex justify-content-between gap-2 mt-2"
              >
                <p>{data}</p>
                <Button
                  onClick={() => handleArrayDeleteKeyResponsibilities(index)}
                  style={{
                    backgroundColor: "#19376d",
                    borderRadius: "0",
                    height: "40px",
                  }}
                  type="button"
                >
                  Delete
                </Button>
              </div>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Requirements</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={keyRequirementsData}
                placeholder="Enter Requirement"
                onChange={(e) => setKeyRequirementsData(e.target.value)}
                
              />
              <Button
                className="mt-2"
                onClick={() => {
                  if (keyRequirementsData === "") {
                    nofification("Please Enter Data", "warning");
                    return;
                  }
                  setKeyRequirements([...keyRequirements, keyRequirementsData]);
                  setKeyRequirementsData("");
                }}
                style={{
                  backgroundColor: "#19376d",
                  borderRadius: "0",
                  cursor: "pointer",
                }}
                type="button"
              >
                Add
              </Button>
            </Form.Group>

            {keyRequirements?.map((data, index) => (
              <div
                key={index}
                className="d-flex justify-content-between gap-2 pt-2 mt-2"
              >
                <p>{data}</p>
                <Button
                  onClick={() => handleArrayDeleteKeyRequirements(index)}
                  style={{
                    backgroundColor: "#19376d",
                    borderRadius: "0",
                    cursor: "pointer",

                    height: "40px",
                  }}
                  type="button"
                >
                  Delete
                </Button>
              </div>
            ))}

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <BreadCamp name="Jobs" />

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Job's ( Total : {product?.length} )
        </span>
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
        >
          Create Jobs
        </button>
      </div>

      <section className="sectionCont">
        {product?.length === 0 || !product ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search for Jobs"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>JobId</th>
                    <th>Role</th>
                    <th>Location</th>

                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {slicedData?.map((i, index) => (
                    <tr key={index}>
                      <td> {index + 1} </td>

                      <td>{i.jobId}</td>
                      <td>{i.role}</td>
                      <td>{i.location}</td>

                      <td style={{ textAlign: "center" }}>
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item key="2">
                                <div className="two_Sec_Div">
                                  <i className="fa-solid fa-eye"></i>
                                  <Link to={`/product/${i.jobId}`}>
                                    <p>View Job</p>
                                  </Link>
                                </div>
                              </Menu.Item>
                              <Menu.Item key="3">
                                <div className="two_Sec_Div">
                                  <i className="fa-sharp fa-solid fa-trash"></i>
                                  <p onClick={() => handleDelete(i.jobId)}>
                                    Delete
                                  </p>
                                </div>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="pagination">
                <button onClick={() => Prev()} className="prevBtn">
                  <i className="fa-solid fa-backward"></i>
                </button>
                {currentPage2 === 1 ? (
                  ""
                ) : (
                  <button onClick={() => setCurrentPage2(1)}>1</button>
                )}

                {pages2
                  ?.slice(currentPage2 - 1, currentPage2 + 3)
                  .map((i, index) =>
                    i === pages2?.length ? (
                      ""
                    ) : (
                      <button
                        key={index}
                        onClick={() => setCurrentPage2(i)}
                        className={currentPage2 === i ? "activePage" : ""}
                      >
                        {" "}
                        {i}{" "}
                      </button>
                    )
                  )}

                <button
                  onClick={() => setCurrentPage2(pages2?.length)}
                  className={
                    currentPage2 === pages2?.length ? "activePage" : ""
                  }
                >
                  {" "}
                  {pages2?.length}{" "}
                </button>

                {currentPage2 === pages2?.length ? (
                  ""
                ) : (
                  <button onClick={() => Next()} className="nextBtn">
                    {" "}
                    <i className="fa-sharp fa-solid fa-forward"></i>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(EProduct);
