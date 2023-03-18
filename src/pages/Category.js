import React, { useState, useEffect } from "react";

import categoryService from "../services/categoryService";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Input from "./../components/Input";

const Category = (props) => {
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const formik = useFormik({
    initialValues: {
      CAT_ID: 0,
      Name: "",
      PARENT_ID: "",
      DisplayOrder: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      PARENT_ID: Yup.string().required("Required"),
      DisplayOrder: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const handleOpenModal = (e, id) => {
    e.preventDefault();
    if (id > 0) {
      // get product data
      categoryService.get(id).then((res) => {
        formik.setValues(res.data);
      });
      handleModalShow();
    } else {
      formik.resetForm();
      handleModalShow();
    }
  };

  //  uef
  useEffect(() => {
    // get categories
    categoryService.list().then((res) => {
      setCategories(res.data);
    });
    loadData();
  }, []);

  const loadData = () => {
    categoryService.list().then((res) => {
      setCategories(res.data);
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    categoryService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warning("A category has been deleted!");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSave = (data) => {
    console.log(data);
    if (data.CAT_ID == 0) {
      categoryService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add successful!");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      categoryService.update(data.CAT_ID, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update successful!");
        } else {
          toast.error(res.message);
        }
      });
    }
  };
  return (
    <>
      <Container className="mt-4">
        <Card className="border-success bt-5px">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Category <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col xs="auto">
                <Button
                  variant="success"
                  onClick={(e) => handleOpenModal(e, 0)}
                >
                  <i className="fas fa-plus"></i> Add
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table
              responsive
              bordered
              hover
              className="mb-0 border-success text-center"
            >
              <thead className="table-success border-success">
                <tr>
                  <th style={{ width: "50px" }} className="text-center">
                    #
                  </th>
                  <th>Category Id</th>
                  <th>Name</th>
                  <th>Parent Id</th>
                  <th>DisplayOrder</th>
                  <th style={{ width: "80px" }} className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((row, idx) => (
                  <tr key={row.CAT_ID}>
                    <th className="text-center">{idx + 1}</th>
                    <td>{row.CAT_ID}</td>
                    <td>{row.Name}</td>
                    <td className="text-center">{row.PARENT_ID}</td>
                    <td>{row.DisplayOrder}</td>
                    <td className="text-center">
                      <a
                        href="/#"
                        className="me-1"
                        onClick={(e) => handleOpenModal(e, row.CAT_ID)}
                      >
                        <i className="bi-pencil-square text-success"></i>
                      </a>
                      <a href="/#" onClick={(e) => handleDelete(e, row.CAT_ID)}>
                        <i className="bi-trash text-danger"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>

      {/* <!-- Modal --> */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.CAT_ID > 0 ? "Update" : "New"} Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className="row mb-3">
                <label
                  htmlFor="txtName"
                  className="col-sm-3 col-form-label required"
                >
                  Name
                </label>
                <div className="col-sm col-lg-6">
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.Name && formik.errors.Name
                        ? "is-invalid"
                        : ""
                    }`}
                    id="txtName"
                    placeholder="Name"
                    {...formik.getFieldProps("Name")}
                  />
                  <div className="invalid-feedback">{formik.errors.Name}</div>
                </div>
              </div>
              <Input
                type="text"
                id="txtPARENT_ID"
                label="Parent Id"
                inputSize={13}
                required
                autoComplete="off"
                maxLength="20"
                frmField={formik.getFieldProps("PARENT_ID")}
                err={formik.touched.PARENT_ID && formik.errors.PARENT_ID}
                errMessage={formik.errors.PARENT_ID}
              />
              <Input
                type="text"
                id="txtDisplayOrder"
                label="DisplayOrder"
                inputSize={13}
                required
                autoComplete="off"
                maxLength="20"
                frmField={formik.getFieldProps("DisplayOrder")}
                err={formik.touched.DisplayOrder && formik.errors.DisplayOrder}
                errMessage={formik.errors.DisplayOrder}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
