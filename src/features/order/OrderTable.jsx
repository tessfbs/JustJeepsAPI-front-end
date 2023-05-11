import {
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Form,
  Tooltip,
  Select,
  Badge,
  Tag,
} from "antd";
import Highlighter from "react-highlight-words";
import { Edit, Trash, Save, Reload } from "../../icons";
import Popup from "./Popup";
import TableTop from "../tabletop/TableTop";
import "./order.scss";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("top");
  const [currentSku, setCurrentSku] = useState(null);
  const [currentOrderProductID, setCurrentOrderProductID] = useState(null);
  const [currentOrderProductPrice, setCurrentOrderProductPrice] =
    useState(null);
  const { Option } = Select;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const BACKEND_URL = "https://jj-api-backend.herokuapp.com";
  // const BACKEND_URL = "http://localhost:8080";



  //initial loading data main table
  useEffect(() => {
    loadData();
  }, []);

  //load all data
  const loadData = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(`${BACKEND_URL}/api/orders`); //orderProductsJoin.json 
    setOriginalOrders(response.data);
    setOrders(response.data);
    setLoading(false);
  }, []);
  
  //seed orders
  const handleSeedOrders = async () => {
    setLoading(true);
    try {
      await axios.get(`${BACKEND_URL}/api/seed-orders`);
      loadData(); // fetch the updated orders
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //delete an order
  const handleDeleteOrder = (record) => {
    Modal.confirm({
      title: "Are you sure to cancel this order?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        // deleteOrder(record); need delete backend
        setOrders((pre) => {
          return pre.filter((order) => order.entity_id !== record.entity_id);
        });
      },
    });
    const id = record.entity_id;
    return axios
      .post(`${BACKEND_URL}/api/orders/${id}/delete`, data)
      .then((response) => {
        setOrders(response.data);
      });
  };
  // delete an backend order
  const deleteOrder = async (order) => {
    const id = order.entity_id;
    const response = await axios.post(
      `${BACKEND_URL}/api/orders/${id}/delete`
    );
    setOrders(response.data);
  };

  // console.log('orders', orders);
  //delete an order-item
  const handleDeleteOrderItem = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this item?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteOrderItem(record.id);
      },
    });
  };

  // delete backend order-product
  const deleteOrderItem = (id) => {
    return axios
      .delete(`${BACKEND_URL}/${id}/delete`)
      .then((response) => {
        setOrders(response.data);
      });
  };

  //handle save button sub row button
  const handleSaveSub = (key) => {
    form
      .validateFields()
      .then((values) => {
        onFinishSub(key, values);
        updateOrderItem(values);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onFinishSub = (key, values) => {
    const updatedOrders = [...orders]; //make a copy of the orders
    const parentItem = updatedOrders.find((order) => {
      //find that order
      return order.entity_id === key;
    });
    const index = parentItem.items.findIndex((obj) => {
      //find the particular item row
      return obj.id === editingRow;
    });

    updatedOrders.splice(index, 1, {
      //remove the item, replace with the new value
      ...values,
      key: index,
    });

    setOrders(updatedOrders); //update orders
    setEditingRow(null);
  };

  const createPurchaseOrder = async (subRowRecord) => {
    console.log("subRowRecord for PO creation", subRowRecord);
    let vendor_id = 0;
    if (subRowRecord.selected_supplier.toLowerCase() === "keystone") {
      vendor_id = 1;
    } else if (subRowRecord.selected_supplier.toLowerCase() === "meyer") {
      vendor_id = 2;
    } else if (subRowRecord.selected_supplier.toLowerCase() === "omix") {
      vendor_id = 3;
    } else if (subRowRecord.selected_supplier.toLowerCase() === "quadratec") {
      vendor_id = 4;
    }
    console.log(
      "subRowRecord.selected_supplier.toLowerCase()",
      subRowRecord.selected_supplier.toLowerCase()
    );
    console.log("vendor_id", vendor_id);
    try {
      // create the purchase order
      const newPurchaseOrder = await axios.post(
        `${BACKEND_URL}/api/purchase_orders`,
        {
          vendor_id: vendor_id,
          user_id: 2,
          order_id: subRowRecord.order_id,
        }
      );
      console.log("created PO", newPurchaseOrder.data);

      // create the purchase order line item
      const newPurchaseOrderLineItem = await axios.post(
        `${BACKEND_URL}/purchaseOrderLineItem`,
        {
          purchaseOrderId: newPurchaseOrder.data.id,
          vendorProductId: null,
          quantityPurchased: subRowRecord.qty_ordered,
          vendorCost: parseFloat(subRowRecord.selected_supplier_cost) || null,
          product_sku: subRowRecord.sku,
        }
      );
      console.log("created PO line item", newPurchaseOrderLineItem);
      const confirmedMessage = await Modal.info({
        title: "Add Item to Purchase Order",
        content: `The ${subRowRecord.sku} has been added to the purchase order for ${subRowRecord.selected_supplier}`,
        okText: "Ok",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderItem = (subRowRecord) => {
    const { id } = subRowRecord;
    console.log("subRowRecord", subRowRecord);

    return axios
      .post(`${BACKEND_URL}/order_products/${id}/edit`, subRowRecord)
      .then((data) => {
        let parentIndex;
        let parentItem;
        orders.forEach((order, index) => {
          if (order.entity_id === data.data.order_id) {
            parentItem = order;
            parentIndex = index; //give the index to the order
          }
        });
        //find index
        const index = parentItem.items.findIndex((order) => {
          return order.id === data.data.id;
        });
        //make copy
        const modifiedParentItems = [...parentItem.items];
        //replace with new value
        modifiedParentItems.splice(index, 1, subRowRecord);
        //modified the order items
        const modifiedParent = { ...parentItem, items: modifiedParentItems };
        //make copy of all orders
        const copyOrders = [...orders];
        //update the order
        copyOrders.splice(parentIndex, 1, modifiedParent);

        //set state
        setOrders(copyOrders);
      });
  };

  //handle save button main row button
  //need promise to make it work
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
        updateOrder(values);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //update orders frontend
  const onFinish = (values) => {
    const updatedOrders = [...orders];
    const index = updatedOrders.findIndex(
      (obj) => obj.entity_id === editingRow
    );
    console.log("updated orders::", updatedOrders[index]);
    const updatedOrdersStatus = updatedOrders[index].status;
    console.log("updatedOrdersStatus::", updatedOrdersStatus);
    const addStatusToValues = { ...values, status: updatedOrdersStatus };
    console.log("values::", addStatusToValues);
    updatedOrders.splice(index, 1, {
      ...addStatusToValues,
      key: index,
    });

    setOrders(updatedOrders);
    setEditingRow(null);
  };

  //update order backend
  const updateOrder = (formObj) => {
    const {
      customer_email,
      customer_firstname,
      customer_lastname,
      entity_id,
      grand_total,
      total_qty_ordered,
    } = formObj;

    return axios.post(
      `${BACKEND_URL}/api/orders/${entity_id}/edit`,
      formObj
    );
  };

  //sort
  const handleChange = (...sorter) => {
    const { order, field } = sorter[2];
    setSortedInfo({ columnKey: field, order });
  };

  //search function
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  //search
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //refresh page
  const refreshPage = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  //set up main column
  const columns = [
    {
    	title: 'Order ID',
    	dataIndex: 'increment_id',
    	key: 'increment_id',
    	align: 'center',
    	sorter: (a, b) => a.increment_id - b.increment_id,
    	sortOrder: sortedInfo.columnKey === 'increment_id' && sortedInfo.order,
    	...getColumnSearchProps('increment_id'),
    	render: (text, record) => {
    		if (editingRow === record.key) {
    			return (
    				<Form.Item
    					name='increment_id'
    					rules={[
    						{
    							required: true,
    							message: 'increment_id is required',
    						},
    					]}
    				>
    					<Input disabled={true} />
    				</Form.Item>
    			);
    		} else {
    			return <p>{text}</p>;
    		}
    	},
    },
    // {
    //   title: "OrderId",
    //   dataIndex: "entity_id",
    //   key: "entity_id",
    //   align: "center",
    //   sorter: (a, b) => a.entity_id - b.entity_id,
    //   sortOrder: sortedInfo.columnKey === "entity_id" && sortedInfo.order,
    //   ...getColumnSearchProps("entity_id"),
    //   render: (text, record) => {
    //     if (editingRow === record.key) {
    //       return (
    //         <Form.Item
    //           name="entity_id"
    //           rules={[
    //             {
    //               required: true,
    //               message: "entity_id is required",
    //             },
    //           ]}
    //         >
    //           <Input disabled={true} />
    //         </Form.Item>
    //       );
    //     } else {
    //       return <p>{text}</p>;
    //     }
    //   },
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      sorter: (a, b) => a.status?.localeCompare(b.status),
      sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
      ...getColumnSearchProps("status"),
      render: (status) => {
        let tagColor;
        switch (status) {
          case "processing":
            tagColor = "orange";
            break;
          case "pending":
            tagColor = "blue";
            break;
          case "canceled":
            tagColor = "volcano";
            break;
          case "complete":
            tagColor = "green";
            break;
          default:
            tagColor = "volcano";
        }
        return (
          <Tag color={tagColor} fontSize="20px">
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Created_Date",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
      sortOrder: sortedInfo.columnKey === "created_at" && sortedInfo.order,
      ...getColumnSearchProps("created_at"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="created_at"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "customer_email",
      key: "customer_email",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.customer_email?.localeCompare(b.customer_email),
      sortOrder: sortedInfo.columnKey === "customer_mail" && sortedInfo.order,
      ...getColumnSearchProps("customer_email"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="customer_email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "First Name ",
      dataIndex: "customer_firstname",
      key: "customer_firstname",
      align: "center",
      sorter: (a, b) =>
        a.customer_firstname?.localeCompare(b.customer_firstname),
      sortOrder:
        sortedInfo.columnKey === "customer_firstname" && sortedInfo.order,
      ...getColumnSearchProps("customer_firstname"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="customer_firstname"
              rules={[
                {
                  required: true,
                  message: "First name is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Last Name",
      dataIndex: "customer_lastname",
      key: "customer_lastname",
      align: "center",
      sorter: (a, b) => a.customer_lastname?.localeCompare(b.customer_lastname),
      sortOrder:
        sortedInfo.columnKey === "customer_lastname" && sortedInfo.order,
      ...getColumnSearchProps("customer_lastname"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="customer_lastname"
              rules={[
                {
                  required: true,
                  message: "Last name is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Total",
      dataIndex: "grand_total",
      key: "grand_total",
      align: "center",
      editTable: true,
      sorter: (a, b) => a.grand_total - b.grand_total,
      sortOrder: sortedInfo.columnKey === "grand_total" && sortedInfo.order,
      ...getColumnSearchProps("grand_total"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="grand_total"
              rules={[
                {
                  required: true,
                  message: "Grand total is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>${text?.toFixed(2)}</p>;
        }
      },
    },
    {
      title: "currency",
      dataIndex: "order_currency_code",
      key: "order_currency_code",
      align: "center",
      sorter: (a, b) =>
        a.order_currency_code?.localeCompare(b.order_currency_code),
      sortOrder:
        sortedInfo.columnKey === "order_currency_code" && sortedInfo.order,
    },

    {
      title: "Qty",
      dataIndex: "total_qty_ordered",
      key: "total_qty_ordered",
      editTable: true,
      align: "center",
      sorter: (a, b) => a.total_qty_ordered - b.total_qty_ordered,
      sortOrder:
        sortedInfo.columnKey === "total_qty_ordered" && sortedInfo.order,
      ...getColumnSearchProps("total_qty_ordered"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="total_qty_ordered"
              rules={[
                {
                  required: true,
                  message: "Total quantity is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Coupon Code",
      dataIndex: "coupon_code",
      key: "coupon_code",
      align: "center",
      sorter: (a, b) => a.coupon_code?.localeCompare(b.coupon_code),
      sortOrder: sortedInfo.columnKey === "coupon_code" && sortedInfo.order,
    },
    {
      title: "Actions",
      dataIndex: "operation",
      key: "operation",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Form.Item>
              <Space size="middle">
                <Tooltip title="Edit Order">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => {
                      setEditingRow(record.key);
                      form.setFieldsValue({
                        customer_email: record.customer_email,
                        customer_firstname: record.customer_firstname,
                        customer_lastname: record.customer_lastname,
                        grand_total: record.grand_total,
                        total_qty_ordered: record.total_qty_ordered,
                        entity_id: record.entity_id,
                        created_at: record.created_at,
                        increment_id: record.increment_id,
                        status: record.status,
                      });
                    }}
                  >
                    <Edit />
                  </button>
                </Tooltip>
                <Tooltip title="Delete Orderxxxx">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteOrder(record)}
                  >
                    <Trash />
                  </button>
                </Tooltip>
                <Tooltip title="Save changes">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={handleSave}
                  >
                    <Save />
                  </button>
                </Tooltip>
                <Tooltip title="Refresh">
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={refreshPage}
                  >
                    <Reload />
                  </button>
                </Tooltip>
              </Space>
            </Form.Item>
          </>
        );
      },
    },
  ];

  //loop main column data
  const data = orders.map((order) => ({
    key: order.entity_id,
    ...order,
  }));

  // console.log('currentSku', currentSku);
  // console.log('currentOrderProductID', currentOrderProductID);
  //drawer;
  const showDrawer = (sku, id, price) => {
    setCurrentSku(sku);
    setCurrentOrderProductID(id);
    setCurrentOrderProductPrice(price);
    console.log("all data", sku, id, price);
    setOpen(true);
  };
  const onClose = (record) => {
    console.log("record on close", record);
    setCurrentSku(null);
    setOpen(false);
    loadData();
  };

  const handleExpand = (expanded, record) => {
    if (expanded) {
      console.log("record", record);
      const selectedOrder = originalOrders.filter(
        (order) => order.entity_id === record.entity_id
      );
      setSelectedOrder(selectedOrder);
      setOrders(selectedOrder);
      console.log("selectedOrder", selectedOrder);
    } else {
      setOrders(originalOrders);
    }
  };

  const getTextValue = (text) => {
    setTextFromDrawer(text);
  };

  const expandedRowRender = (record) => {
    //render sub table here
    const nestedColumns = [
      // {
      //   title: "ID",
      //   dataIndex: "id",
      //   key: "id",
      //   align: "center",
      //   render: (text, record) => {
      //     if (editingRow === record.id) {
      //       return (
      //         <Form.Item
      //           name="id"
      //           rules={[
      //             {
      //               required: true,
      //               message: "id is required",
      //             },
      //           ]}
      //         >
      //           <Input disabled={true} />
      //         </Form.Item>
      //       );
      //     } else {
      //       return <p>{text}</p>;
      //     }
      //   },
      // },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        align: "center",
        render: (text, record) => {
          console.log("record from image", record.product?.image);
          //render image here
          return (
            <>
              {record.product?.image ? (
                <img
                  src={record.product.image}
                  alt="product"
                  style={{ width: "50px", height: "50px" }}
                />
              ) : (
                <img
                  src="https://www.justjeeps.com/pub/media/catalog/product//d/v/dv8-offroad-d-jl-190052-pil-picatinny-rail-a-pillar-light-mounts-jeep-wrangler-jl-gladiator-jt-main-updated.jpg"
                  alt="product"
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </>
          );
        },
      },
      {
        title: "Product",
        dataIndex: "name",
        key: "name",
        align: "center",
        width: "30%",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Product name is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
        align: "center",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="sku"
                rules={[
                  {
                    required: true,
                    message: "sku is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "center",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: "price is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>${text}</p>;
          }
        },
      },
      {
        title: "Quantity",
        dataIndex: "qty_ordered",
        key: "qty_ordered",
        align: "center",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="qty_ordered"
                rules={[
                  {
                    required: true,
                    message: "qty is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Supplier",
        dataIndex: "selected_supplier",
        key: "selected_supplier",
        align: "center",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="selected_supplier"
                rules={[
                  {
                    required: true,
                    message: "supplier is required",
                  },
                ]}
              >
                <Select placeholder="Select a supplier">
                  <Option value="Keystone">Keystone</Option>
                  <Option value="Meyer">Meyer</Option>
                  <Option value="Omix">Omix</Option>
                  <Option value="Quadratec">Quaddratec</Option>
                </Select>
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "SupplierCost",
        dataIndex: "selected_supplier_cost",
        key: "selected_supplier_cost",
        align: "center",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="selected_supplier_cost"
                rules={[
                  {
                    required: true,
                    message: "selected_supplier_cost is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>${text}</p>;
          }
        },
      },
      {
        title: "TotalCost",
        dataIndex: "total",
        key: "total",
        align: "center",
        render: (text, record) => {
          return <p>${record.qty_ordered * record.selected_supplier_cost}</p>;
        },
      },
      {
        title: "Margin%",
        key: "margin",
        align: "center",
        render: (text, record) => {
          const cost = record.selected_supplier_cost;
          const price = record.price;
          if (cost && price) {
            const margin = ((price - cost) / price) * 100;
            return <span>{margin.toFixed(2)}%</span>;
          } else {
            return <span></span>;
          }
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "status is required",
                  },
                ]}
              >
                <Select placeholder="Update Status">
                  <Option value="Completed">
                    <Badge status="success" text="Completed" />
                  </Option>
                  <Option value="No Stock">
                    <Badge status="warning" text="No Stock" />
                  </Option>
                  <Option value="PO Created">
                    <Badge status="processing" text="PO Created" />
                  </Option>
                  <Option value="Cancel">
                    <Badge status="error" text="Cancel" />
                  </Option>
                </Select>
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Actions",
        dataIndex: "operation",
        key: "operation",
        align: "center",
        render: (_, recordSub) => {
          return (
            <>
              <Form.Item>
                <Space size="small">
                  <Tooltip title="Edit">
                    <EditOutlined
                      style={{ color: "orange", fontSize: "25px" }}
                      onClick={() => {
                        //use recordSub instead of record to avoid override record because we need the order key
                        setEditingRow(recordSub.id); //also need to use id, not key
                        form.setFieldsValue({
                          id: recordSub.id,
                          name: recordSub.name,
                          sku: recordSub.sku,
                          price: recordSub.price,
                          product_id: recordSub.product_id,
                          qty_ordered: recordSub.qty_ordered,
                          selected_supplier: recordSub.selected_supplier,
                          selected_supplier_cost:
                            recordSub.selected_supplier_cost,
                        });
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Save">
                    <SaveOutlined
                      style={{ color: "green", fontSize: "25px" }}
                      onClick={() => handleSaveSub(record.key)}
                    />
                  </Tooltip>
                  <Tooltip title="See Vendor Costs">
                    <GlobalOutlined
                      style={{ color: "blue", fontSize: "25px" }}
                      onClick={() => {
                        showDrawer(
                          recordSub.sku,
                          recordSub.id,
                          recordSub.price
                        );
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Add to PO">
                    <ShoppingCartOutlined
                      style={{ color: "purple", fontSize: "25px" }}
                      onClick={() => createPurchaseOrder(recordSub)}
                    />
                  </Tooltip>
                </Space>
              </Form.Item>
            </>
          );
        },
      },
    ];
    const total_cost = record.items?.reduce(
      (acc, record) => acc + record.qty_ordered * record.selected_supplier_cost,
      0
    );
    const total_price = record.items?.reduce(
      (acc, record) => acc + record.price * record.qty_ordered,
      0
    );
    return (
      <Table
        columns={nestedColumns}
        dataSource={record.items}
        pagination={false}
        size="large"
        footer={() => (
          <span
            style={{
              fontWeight: "bold",
              display: "inline-block",
              textAlign: "right",
              width: "100%",
              fontSize: "1.2rem",
            }}
          >
            Total Sales : ${total_price?.toFixed(2)} <br />
            Total Cost : ${total_cost?.toFixed(2)} <br />
            Total Margin :{" "}
            {(((total_price - total_cost) / total_price) * 100).toFixed(2)}%
          </span>
        )}
      />
    );
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container-xl">
          <div className="container mb-3">
            <Button 
            type="primary" 
            onClick={handleSeedOrders}
            size="large"
            style={{ 
              backgroundColor: "#dc3545",
              borderColor: "white",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "600",
              borderRadius: "5px",
              height: "50px",
              width: "200px", 
              marginBottom: "20px",
          }}
            // fontFamily: "Montserrat", sans-serif;
            //font size: 1.5rem;
            //font weight: 600;
            >
              Update Orders
            </Button>

            <TableTop orderCount={orders.length} />
          </div>

          <Form form={form}>
            <Table
              columns={columns}
              expandable={{ expandedRowRender }} //, onExpand: handleExpand remove expandable
              dataSource={data}
              // scroll={{ y: 1500 }}
              bordered
              rowKey={(record) => record.id}
              onChange={handleChange}
              size="large"
              loading={loading}
              pagination={{
                // pageSize: 20,
                itemRender: (page, type, originalElement) => {
                  if (type === "page") {
                    return (
                      <a style={{ color: "black", backgroundColor: "white" }}>
                        {page}
                      </a>
                    );
                  } else if (type === "prev") {
                    return (
                      <a style={{ color: "white", backgroundColor: "" }}>
                        Previous
                      </a>
                    );
                  } else if (type === "next") {
                    return (
                      <a style={{ color: "white", backgroundColor: "" }}>
                        Next
                      </a>
                    );
                  }
                  return originalElement;
                },
                position: ["topRight"],
              }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setCurrentOrderProductID(record.id);
                    setCurrentSku(record.sku);
                    setCurrentOrderProductPrice(record.price);
                  },
                };
              }}
            />
          </Form>
        </div>
        <div id="footer">© 2023, Helper.com, Inc. All Rights Reserved</div>
      </div>
      {open && (
        <Popup
          placement={placement}
          onClose={onClose}
          sku={currentSku}
          orderProductId={currentOrderProductID}
          orderProductPrice={currentOrderProductPrice}
        />
      )}
    </>
  );
};

export default OrderTable;
