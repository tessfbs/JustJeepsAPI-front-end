import { Table, Space, Form, Input, Button } from "antd";
import Card from "./Card";
import keystone_logo from "../../assets/keystone.png";
import meyer_logo from "../../assets/meyer.png";
import omix_logo from "../../assets/omix.png";
import quadratec_logo from "../../assets/quadratec.png";
import "./suppliertable.scss";
import { useRef, useState } from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (text) => (
      <a href={text} target="_blank" rel="noreferrer">
        {text}
      </a>
    ),
  },
];

const vendorsData = [
  {
    id: 1111,
    name: "Keystone",
    website: "https://wwwsc.ekeystone.com",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA",
    image: keystone_logo,
  },
  {
    id: 2222,
    name: "Meyer",
    website: "https://online.meyerdistributing.com",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA",
    image: meyer_logo,
  },
  {
    id: 3333,
    name: "Omix",
    website: "https://www.omixparts.com/",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA",
    image: omix_logo,
  },
  {
    id: 4444,
    name: "Quadratec",
    website: "https://www.quadratecwholesale.com",
    address: "NA",
    phone_number: "NA",
    main_contact: "NA",
    username: "NA",
    password: "NA",
    image: quadratec_logo,
  },
];

export const SupplierTable = () => {
  const [file, setFile] = useState("");
  const [top, setTop] = useState({
    show: false,
    title: "",
    name: "",
    website: "",
    button: "",
  });

  const [vendors, setVendors] = useState(vendorsData);

  const inputWeb = useRef();
  const inputName = useRef();
  const inputImg = useRef();

  const handleShow = () => {
    setTop({
      id: 0,
      show: !top.show,
      title: "Add New Supplier",
      name: "Name of new Supplier",
      website: "http://new-website",
      type: "Adding",
      image:"",
    });
  };

  const handleEdit = ({ name, website, id,image }) => {
    setTop({
      id,
      show: true,
      title: "Edit Supplier",
      name,
      website,
      type: "Editing",
      image,
    });
  };

  const handleSubmit = () => {
    // console.log(inputWeb.current.value);
    onFinish(top.type, {
      name: inputName.current.value || top.name,
      website: inputWeb.current.value || top.website,
    });
    handleShow();
  };

  const onFinish = (type, values) => {
    if (type === "Adding") {
      const newVendor = {
        id: Math.random().toFixed(4).slice(-4),
        name: values.name,
        website: values.website,
        image: file
          ? URL.createObjectURL(file)
          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
      };
      setVendors([...vendors, newVendor]);
      setFile("");
    } else if (type === "Editing") {
      const newVendor = vendors.map((item) => {
        if (item.id === top.id) {
          return {
            ...item,
            name: values.name,
            website: values.website,
            image: file
              ? URL.createObjectURL(file)
              : top.image,
          };
        } else {
          return item;
        }
      });
      setVendors(newVendor);
      setFile("");
    }
  };

  return (
    <div className="suppliers">
      <div className="supplierTable">
        <div className="sutop">
          {top.show ? (
            <>
              <div className="topTitle">
                <span>{top.title}</span>
              </div>
              <div className="topForm">
                <div className="formInput">
                  <label htmlFor="file">Image:</label>
                  <input
                    type="file"
                    name="fileInput"
                    id="file"
                    ref={inputImg}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder={top.name}
                    id="name"
                    ref={inputName}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    placeholder={top.website}
                    id="website"
                    ref={inputWeb}
                  />
                </div>
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="cancel" onClick={handleShow}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button onClick={handleShow}>Add Supplier</button>
          )}
        </div>
        <div className="subottom">
          {vendors.map((supplier) => (
            <Card
              key={supplier.id}
              supplier={supplier}
              handleEdit={handleEdit}
              top={top}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
