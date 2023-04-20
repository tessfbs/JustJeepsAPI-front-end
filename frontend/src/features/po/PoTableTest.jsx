import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const columns = [
  {
    title: 'Order ID',
    dataIndex: ['order', 'entity_id'],
    key: 'order_id',
  },
  {
    title: 'PO ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'User',
    dataIndex: ['user', 'firstname'],
    key: 'user',
  },
];

const PurchaseOrderTable = ({vendorId}) => {
  const [originalPurchaseOrderData, setOriginalPurchaseOrderData] = useState([]);
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  console.log('purchaseOrderData', purchaseOrderData);

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
        title: 'Vendor Product SKU',
        dataIndex: ['vendorProduct', 'product_sku'],
        key: 'vendorProduct.product_sku',
      },
      {
        title: 'Vendor Cost',
        dataIndex: ['vendorProduct', 'vendor_cost'],
        key: 'vendorProduct.vendor_cost',
      },
      {
        title: 'Quantity Ordered',
        dataIndex: 'qty_ordered',
        key: 'qty_ordered',
      },
    ];
    if (poLineItems && poLineItems.length) {
      return (
        <Table
          columns={columns}
          dataSource={poLineItems}
          pagination={false}
        />
      );
    } else {
      return <p>No Purchase Order Line Items found.</p>;
    }
  };

  useEffect(() => {
    const getPurchaseOrdersByVendor = async () => {
      console.log('vendorId', vendorId);
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
      "id": 4,
      "created_at": "2023-04-18T03:34:23.002Z",
      "user_id": 1,
      "order_id": 81801,
      "vendor_id": 2,
      "vendor": {
          "id": 2,
          "name": "Meyer",
          "website": "https://online.meyerdistributing.com",
          "address": "NA",
          "phone_number": "NA",
          "main_contact": "NA",
          "username": "NA",
          "password": "NA"
      },
      "user": {
          "id": 1,
          "firstname": "Admin",
          "lastname": "User",
          "username": "admin",
          "email": "admin@example.com",
          "password": "adminpassword"
      },
      "order": {
          "entity_id": 81801,
          "id": 600,
          "created_at": "2023-03-20 19:44:15",
          "status": "ddddd",
          "customer_email": "karlpac@hotmail.com",
          "coupon_code": null,
          "customer_firstname": "Karl",
          "customer_lastname": "Schweinberg",
          "grand_total": 43.76,
          "increment_id": "000000334",
          "order_currency_code": "USD",
          "total_qty_ordered": 1,
          "items": [
              {
                  "id": 1151,
                  "name": "Quadratec Hand Held Remote Control for Q Series Winches 92123-6000",
                  "sku": "QTC-92123-6000",
                  "order_id": 81801,
                  "base_price": 23.76,
                  "base_price_incl_tax": 23.76,
                  "discount_amount": 0,
                  "discount_invoiced": 0,
                  "discount_percent": 0,
                  "original_price": 27.95,
                  "price": 23.76,
                  "price_incl_tax": 23.76,
                  "product_id": 32135,
                  "qty_ordered": 1
              },
              {
                  "id": 1152,
                  "name": "name",
                  "sku": "ACC-14468-9196",
                  "order_id": 81801,
                  "base_price": 123,
                  "base_price_incl_tax": 123,
                  "discount_amount": 123,
                  "discount_invoiced": 123,
                  "discount_percent": 123,
                  "original_price": 123,
                  "price": 123,
                  "price_incl_tax": 123,
                  "product_id": 1234,
                  "qty_ordered": 2
              },
              {
                  "id": 1153,
                  "name": "name",
                  "sku": "ACC-14468-9196",
                  "order_id": 81801,
                  "base_price": 123,
                  "base_price_incl_tax": 123,
                  "discount_amount": 123,
                  "discount_invoiced": 123,
                  "discount_percent": 123,
                  "original_price": 123,
                  "price": 123,
                  "price_incl_tax": 123,
                  "product_id": 1234,
                  "qty_ordered": 2
              },
              {
                  "id": 1154,
                  "name": "name",
                  "sku": "ACC-14468-9196",
                  "order_id": 81801,
                  "base_price": 123,
                  "base_price_incl_tax": 123,
                  "discount_amount": 123,
                  "discount_invoiced": 123,
                  "discount_percent": 123,
                  "original_price": 123,
                  "price": 123,
                  "price_incl_tax": 123,
                  "product_id": 1234,
                  "qty_ordered": 2
              }
          ]
      },
      "purchaseOrderLineItems": []
  },
  {
      "id": 3,
      "created_at": "2023-04-18T03:34:21.667Z",
      "user_id": 1,
      "order_id": 81806,
      "vendor_id": 2,
      "vendor": {
          "id": 2,
          "name": "Meyer",
          "website": "https://online.meyerdistributing.com",
          "address": "NA",
          "phone_number": "NA",
          "main_contact": "NA",
          "username": "NA",
          "password": "NA"
      },
      "user": {
          "id": 1,
          "firstname": "Admin",
          "lastname": "User",
          "username": "admin",
          "email": "admin@example.com",
          "password": "adminpassword"
      },
      "order": {
          "entity_id": 81806,
          "id": 595,
          "created_at": "2023-03-20 23:14:54",
          "status": "processing",
          "customer_email": "rudy@greenviewltd.ca",
          "coupon_code": null,
          "customer_firstname": "Rodolfo",
          "customer_lastname": "Lopez",
          "grand_total": 75.83,
          "increment_id": "200038053",
          "order_currency_code": "CAD",
          "total_qty_ordered": 1,
          "items": [
              {
                  "id": 1142,
                  "name": "ORACLE LIGHTING PRE-RUNNER STYLE LED GRILLE LIGHT KIT (CAMERA) 5889-005-",
                  "sku": "ORL-5889-005-T",
                  "order_id": 81806,
                  "base_price": 67.11,
                  "base_price_incl_tax": 75.83,
                  "discount_amount": 0,
                  "discount_invoiced": 0,
                  "discount_percent": 0,
                  "original_price": 78.95,
                  "price": 67.11,
                  "price_incl_tax": 75.83,
                  "product_id": 41076,
                  "qty_ordered": 1
              },
              {
                  "id": 1143,
                  "name": "ORACLE Lighting Universal Pre-Runner Style LED Grill Light Kit 5889-005-T Amber w/Tinted Lens",
                  "sku": "ORL-5889-005-T",
                  "order_id": 81806,
                  "base_price": 0,
                  "base_price_incl_tax": null,
                  "discount_amount": 0,
                  "discount_invoiced": 0,
                  "discount_percent": 0,
                  "original_price": 0,
                  "price": 0,
                  "price_incl_tax": null,
                  "product_id": 41075,
                  "qty_ordered": 1
              }
          ]
      },
      "purchaseOrderLineItems": [
          {
              "id": 1,
              "purchase_order_id": 3,
              "vendor_product_id": 16385,
              "quantity_purchased": 2,
              "vendor_cost": 12,
              "vendorProduct": {
                  "id": 16385,
                  "product_sku": "ORL-5889-005-T",
                  "vendor_id": 2,
                  "vendor_sku": "ORL5889-005-T",
                  "vendor_cost": 51.31,
                  "vendor_inventory": 2
              },
              "purchaseOrder": {
                  "id": 3,
                  "created_at": "2023-04-18T03:34:21.667Z",
                  "user_id": 1,
                  "order_id": 81806,
                  "vendor_id": 2
              }
          }
      ]
  },
  {
    "id": 3,
    "created_at": "2023-04-18T03:34:21.667Z",
    "user_id": 1,
    "order_id": 81810,
    "vendor_id": 2,
    "vendor": {
        "id": 2,
        "name": "Meyer",
        "website": "https://online.meyerdistributing.com",
        "address": "NA",
        "phone_number": "NA",
        "main_contact": "NA",
        "username": "NA",
        "password": "NA"
    },
    "user": {
        "id": 1,
        "firstname": "Admin",
        "lastname": "User",
        "username": "admin",
        "email": "admin@example.com",
        "password": "adminpassword"
    },
    "order": {
        "entity_id": 9000,
        "id": 595,
        "created_at": "2023-03-20 23:14:54",
        "status": "processing",
        "customer_email": "rudy@greenviewltd.ca",
        "coupon_code": null,
        "customer_firstname": "Rodolfo",
        "customer_lastname": "Lopez",
        "grand_total": 75.83,
        "increment_id": "200038053",
        "order_currency_code": "CAD",
        "total_qty_ordered": 1,
        "items": [
            {
                "id": 1142,
                "name": "ORACLE LIGHTING PRE-RUNNER STYLE LED GRILLE LIGHT KIT (CAMERA) 5889-005-",
                "sku": "ORL-5889-005-T",
                "order_id": 9000,
                "base_price": 67.11,
                "base_price_incl_tax": 75.83,
                "discount_amount": 0,
                "discount_invoiced": 0,
                "discount_percent": 0,
                "original_price": 78.95,
                "price": 67.11,
                "price_incl_tax": 75.83,
                "product_id": 41076,
                "qty_ordered": 1
            },
            {
                "id": 1143,
                "name": "ORACLE Lighting Universal Pre-Runner Style LED Grill Light Kit 5889-005-T Amber w/Tinted Lens",
                "sku": "ORL-5889-005-T",
                "order_id": 9000,
                "base_price": 0,
                "base_price_incl_tax": null,
                "discount_amount": 0,
                "discount_invoiced": 0,
                "discount_percent": 0,
                "original_price": 0,
                "price": 0,
                "price_incl_tax": null,
                "product_id": 41075,
                "qty_ordered": 1
            }
        ]
    },
    "purchaseOrderLineItems": [
        {
            "id": 1,
            "purchase_order_id": 3,
            "vendor_product_id": 16385,
            "quantity_purchased": 2,
            "vendor_cost": 12,
            "vendorProduct": {
                "id": 16385,
                "product_sku": "ORL-5889-005-T",
                "vendor_id": 2,
                "vendor_sku": "ORL5889-005-T",
                "vendor_cost": 51.31,
                "vendor_inventory": 2
            },
            "purchaseOrder": {
                "id": 3,
                "created_at": "2023-04-18T03:34:21.667Z",
                "user_id": 1,
                "order_id": 9000,
                "vendor_id": 2
            }
        }
    ]
},
]