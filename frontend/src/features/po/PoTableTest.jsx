import { Table } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  {
    title: "Order ID",
    dataIndex: ["order", "entity_id"],
    key: "order_id",
  },
  {
    title: "PO ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "User",
    dataIndex: ["user", "firstname"],
    key: "user",
  },
];

const PurchaseOrderTable = ({ vendorId }) => {
  const [originalPurchaseOrderData, setOriginalPurchaseOrderData] = useState(
    []
  );
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);

  const handleExpand = (expanded, record) => {
    if (expanded) {
      const filteredData = originalPurchaseOrderData.filter(
        (po) => po.order.entity_id === record.order.entity_id
      );
      setPurchaseOrderData(filteredData);
    } else {
      setPurchaseOrderData(originalPurchaseOrderData);
    }
  };

  const expandedRowRender = (record) => {
    const poLineItems = record.purchaseOrderLineItems;
    const columns = [
      {
        title: "Product SKU",
        dataIndex: ["vendorProduct", "product_sku"],
        key: "vendorProduct.product_sku",
      },
      {
        title: "Vendor SKU",
        dataIndex: ["vendorProduct", "vendor_sku"],
        key: "vendorProduct.vendor_sku",
      },
      {
        title: "Vendor Cost",
        dataIndex: ["vendorProduct", "vendor_cost"],
        key: "vendorProduct.vendor_cost",
      },
      {
        title: "Quantity Purchased",
        dataIndex: "quantity_purchased",
        key: "quantity_purchased",
      },
      {
        title: "Total Cost",
        dataIndex: "total_cost",
        key: "total_cost",
      },
    ];
    if (poLineItems && poLineItems.length) {
      const lineItemData = poLineItems.map((item) => ({
        ...item,
        total_cost: item.vendorProduct.vendor_cost * item.quantity_purchased,
      }));
      return (
        <Table columns={columns} dataSource={lineItemData} pagination={false} />
      );
    } else {
      return <p>No Purchase Order Line Items found.</p>;
    }
  };

  useEffect(() => {
    const getPurchaseOrdersByVendor = async () => {
      console.log("vendorId", vendorId);
      try {
        await axios
          .get(`http://localhost:8080/api/purchase_orders/vendor/${vendorId}`)
          .then((res) => {
            const responseData = res.data;
            console.log("Data from backend by sku:", responseData);
            // Process the response data from backend if needed
            setOriginalPurchaseOrderData(responseData);
            setPurchaseOrderData(responseData);
          });
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      }
    };
    getPurchaseOrdersByVendor();
  }, [vendorId]);

  return (
    <Table
      columns={columns}
      dataSource={purchaseOrderData}
      expandable={{ expandedRowRender, onExpand: handleExpand }}
    />
  );
};

export default PurchaseOrderTable;

const purchaseOrders = [
  {
    id: 3,
    created_at: "2023-04-18T03:34:21.667Z",
    user_id: 1,
    order_id: 81806,
    vendor_id: 2,
    vendor: {
      id: 2,
      name: "Meyer",
      website: "https://online.meyerdistributing.com",
      address: "NA",
      phone_number: "NA",
      main_contact: "NA",
      username: "NA",
      password: "NA",
    },
    user: {
      id: 1,
      firstname: "Admin",
      lastname: "User",
      username: "admin",
      email: "admin@example.com",
      password: "adminpassword",
    },
    order: {
      entity_id: 81806,
      id: 595,
      created_at: "2023-03-20 23:14:54",
      status: "processing",
      customer_email: "rudy@greenviewltd.ca",
      coupon_code: null,
      customer_firstname: "Rodolfo",
      customer_lastname: "Lopez",
      grand_total: 75.83,
      increment_id: "200038053",
      order_currency_code: "CAD",
      total_qty_ordered: 1,
      items: [
        {
          id: 1142,
          name: "ORACLE LIGHTING PRE-RUNNER STYLE LED GRILLE LIGHT KIT (CAMERA) 5889-005-",
          sku: "ORL-5889-005-T",
          order_id: 81806,
          base_price: 67.11,
          base_price_incl_tax: 75.83,
          discount_amount: 0,
          discount_invoiced: 0,
          discount_percent: 0,
          original_price: 78.95,
          price: 67.11,
          price_incl_tax: 75.83,
          product_id: 41076,
          qty_ordered: 1,
        },
        {
          id: 1143,
          name: "ORACLE Lighting Universal Pre-Runner Style LED Grill Light Kit 5889-005-T Amber w/Tinted Lens",
          sku: "ORL-5889-005-T",
          order_id: 81806,
          base_price: 0,
          base_price_incl_tax: null,
          discount_amount: 0,
          discount_invoiced: 0,
          discount_percent: 0,
          original_price: 0,
          price: 0,
          price_incl_tax: null,
          product_id: 41075,
          qty_ordered: 1,
        },
      ],
    },
    purchaseOrderLineItems: [
      {
        id: 1,
        purchase_order_id: 3,
        vendor_product_id: 16385,
        quantity_purchased: 2,
        vendor_cost: 12,
        vendorProduct: {
          id: 16385,
          product_sku: "ORL-5889-005-T",
          vendor_id: 2,
          vendor_sku: "ORL5889-005-T",
          vendor_cost: 51.31,
          vendor_inventory: 2,
        },
        purchaseOrder: {
          id: 3,
          created_at: "2023-04-18T03:34:21.667Z",
          user_id: 1,
          order_id: 81806,
          vendor_id: 2,
        },
      },
    ],
  },
  {
    id: 3,
    created_at: "2023-04-18T03:34:21.667Z",
    user_id: 1,
    order_id: 81810,
    vendor_id: 2,
    vendor: {
      id: 2,
      name: "Meyer",
      website: "https://online.meyerdistributing.com",
      address: "NA",
      phone_number: "NA",
      main_contact: "NA",
      username: "NA",
      password: "NA",
    },
    user: {
      id: 1,
      firstname: "Admin",
      lastname: "User",
      username: "admin",
      email: "admin@example.com",
      password: "adminpassword",
    },
    order: {
      entity_id: 9000,
      id: 595,
      created_at: "2023-03-20 23:14:54",
      status: "processing",
      customer_email: "rudy@greenviewltd.ca",
      coupon_code: null,
      customer_firstname: "Rodolfo",
      customer_lastname: "Lopez",
      grand_total: 75.83,
      increment_id: "200038053",
      order_currency_code: "CAD",
      total_qty_ordered: 1,
      items: [
        {
          id: 1142,
          name: "ORACLE LIGHTING PRE-RUNNER STYLE LED GRILLE LIGHT KIT (CAMERA) 5889-005-",
          sku: "ORL-5889-005-T",
          order_id: 9000,
          base_price: 67.11,
          base_price_incl_tax: 75.83,
          discount_amount: 0,
          discount_invoiced: 0,
          discount_percent: 0,
          original_price: 78.95,
          price: 67.11,
          price_incl_tax: 75.83,
          product_id: 41076,
          qty_ordered: 1,
        },
        {
          id: 1143,
          name: "ORACLE Lighting Universal Pre-Runner Style LED Grill Light Kit 5889-005-T Amber w/Tinted Lens",
          sku: "ORL-5889-005-T",
          order_id: 9000,
          base_price: 0,
          base_price_incl_tax: null,
          discount_amount: 0,
          discount_invoiced: 0,
          discount_percent: 0,
          original_price: 0,
          price: 0,
          price_incl_tax: null,
          product_id: 41075,
          qty_ordered: 1,
        },
      ],
    },
    purchaseOrderLineItems: [
      {
        id: 1,
        purchase_order_id: 3,
        vendor_product_id: 16385,
        quantity_purchased: 2,
        vendor_cost: 12,
        vendorProduct: {
          id: 16385,
          product_sku: "ORL-5889-005-T",
          vendor_id: 2,
          vendor_sku: "ORL5889-005-T",
          vendor_cost: 51.31,
          vendor_inventory: 2,
        },
        purchaseOrder: {
          id: 3,
          created_at: "2023-04-18T03:34:21.667Z",
          user_id: 1,
          order_id: 9000,
          vendor_id: 2,
        },
      },
    ],
  },
];
