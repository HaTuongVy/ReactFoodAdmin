import React, { useState, useEffect, useRef } from "react";

import productService from "./../services/productService";
import categoryService from "../services/categoryService";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Input from "./../components/Input";
import Select from "./../components/Select";
// import Utils from "../helpers/utils";

const Product = (props) => {
  const defaultImgUrl =
    "https://restfulapi.dnd-group.net/public/photo-icon.png";

  const [imagePreview, setimagePreview] = useState(defaultImgUrl);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();

  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const inputFileRef = useRef();

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setimagePreview(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue("Description", e.target.files[0]);
    }
  };

  // const downloadImage = () => {
  //   productService.downloadImage(formik.values.id).then((res) => {
  //     if (res.size > 0) Utils.dowloadFile(`${formik.values.PRO_ID}.zip`, res);
  //     else toast.warning("No image to download");
  //   });
  // };

  const formik = useFormik({
    initialValues: {
      PRO_ID: 0,
      Name: "",
      Price: 0,
      CAT_ID: 0,
      Description: undefined,
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      Price: Yup.string().required("Required"),
      CAT_ID: Yup.number().required("Required").min(1, "Required"),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const handleOpenModal = (e, id) => {
    e.preventDefault();
    if (id > 0) {
      // get product data
      productService.get(id).then((res) => {
        formik.setValues(res.data);
        setimagePreview(res.data.Description);
      });
      handleModalShow();
    } else {
      formik.resetForm();
      setimagePreview(defaultImgUrl);
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
    productService.list().then((res) => {
      setProducts(res.data);
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    productService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warning("A product has been deleted!");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSave = (data) => {
    console.log(data);
    if (data.PRO_ID == 0) {
      productService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Add successful!");
        } else {
          toast.error(res.message);
        }
      });
    } else {
      productService.update(data.PRO_ID, data).then((res) => {
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
                  Product <small className="text-muted">list</small>
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
              <thead className="table-success border-success ">
                <tr>
                  <th style={{ width: "50px" }} className="text-center">
                    #
                  </th>
                  <th>Product Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th style={{ width: "80px" }} className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((row, idx) => (
                  <tr key={row.PRO_ID}>
                    <th className="text-center">{idx + 1}</th>
                    <td>{row.PRO_ID}</td>
                    <td>{row.Name}</td>
                    <td className="text-center">{row.Price}</td>
                    <td>{row.CAT_ID}</td>
                    <td className="text-center">
                      <a
                        href="/#"
                        className="me-1"
                        onClick={(e) => handleOpenModal(e, row.PRO_ID)}
                      >
                        <i className="bi-pencil-square text-success"></i>
                      </a>
                      <a href="/#" onClick={(e) => handleDelete(e, row.PRO_ID)}>
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
            {formik.values.PRO_ID > 0 ? "Update" : "New"} Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4" className="text-center">
              <img
                src={imagePreview}
                alt=""
                className="img-thumbnail rounded-circle border-primary d-block"
              />
              <input
                type="file"
                accept="image/*"
                className="d-none"
                ref={inputFileRef}
                onChange={handleChangeImage}
              />
              <div className="mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => inputFileRef.current.click()}
                >
                  Change
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  // onClick={downloadImage}
                  className="ms-2"
                >
                  Download
                </Button>
              </div>
            </Col>
            <Col sm>
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
                id="txtPrice"
                label="Price"
                inputSize={13}
                required
                autoComplete="off"
                maxLength="20"
                frmField={formik.getFieldProps("Price")}
                err={formik.touched.Price && formik.errors.Price}
                errMessage={formik.errors.Price}
              />
              <Select
                id="drpCategory"
                label="Category"
                values={categories}
                inputSize={6}
                required
                lastRow
                frmField={formik.getFieldProps("CAT_ID")}
                err={formik.touched.CAT_ID && formik.errors.CAT_ID}
                errMessage={formik.errors.CAT_ID}
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

export default Product;
