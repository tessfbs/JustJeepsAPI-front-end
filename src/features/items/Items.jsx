import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Table, Button, Tag, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import "./items.scss";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const Items = () => {
  const [data, setData] = useState([]);
  const [searchBy, setSearchBy] = useState("sku"); // default search by SKU
  const [searchTermSku, setSearchTermSku] = useState("");
  const [sku, setSku] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState("1");
  const BACKEND_URL = "https://jj-api-backend.herokuapp.com";
  // const BACKEND_URL = "http://localhost:8080";

  const onChange = (value) => {
    console.log("changed", value);
    setDiscount(value);
  };

  console.log("discount", discount);

  function getProductsByBrand(products, brandName) {
    return products.filter(
      (product) =>
        product.brand_name === brandName &&
        product.status === 1 &&
        product.price !== 0
    );
  }

  console.log("brandData", brandData);

  // function transformData(input) {
  //   let output = [];
  
  //   input.forEach((item) => {
  //     let transformedItem = {
  //       sku: item.sku,
  //       name: item.name,
  //       url_path: item.url_path,
  //       status: item.status,
  //       price: item.price,
  //       searchable_sku: item.searchable_sku,
  //       jj_prefix: item.jj_prefix,
  //       image: item.image,
  //       brand_name: item.brand_name,
  //       vendors: item.vendors
  //     };
  
  //     item.vendorProducts.forEach((vendorProduct) => {
  //       if (vendorProduct.vendor.name === 'Meyer') {
  //         transformedItem.meyer_cost = vendorProduct.vendor_cost;
  //         transformedItem.meyer_inventory = vendorProduct.vendor_inventory;
  //       } else if (vendorProduct.vendor.name === 'Keystone') {
  //         transformedItem.keystone_cost = vendorProduct.vendor_cost;
  //         transformedItem.keystone_inventory = vendorProduct.vendor_inventory;
  //       }
  //     });
  
  //     if (item.competitorProducts.length > 0) {
  //       transformedItem.northridge_price = item.competitorProducts[0].competitor_price;
  //     }
  
  //     output.push(transformedItem);
  //   });
  
  //   return output;
  // }

  function transformData(products) {
  const transformedProducts = products.map(product => {
    const transformedProduct = {
      sku: product.sku,
      name: product.name,
      url_path: product.url_path,
      status: product.status,
      price: product.price,
      searchable_sku: product.searchable_sku,
      jj_prefix: product.jj_prefix,
      image: product.image,
      brand_name: product.brand_name,
      vendors: product.vendors,
    };

    product.vendorProducts.forEach(vendorProduct => {
      transformedProduct[`${vendorProduct.vendor.name.toLowerCase()}_cost`] = vendorProduct.vendor_cost;
      transformedProduct[`${vendorProduct.vendor.name.toLowerCase()}_inventory`] = vendorProduct.vendor_inventory;
    });

    product.competitorProducts.forEach(competitorProduct => {
      transformedProduct[`${competitorProduct.competitor.name.toLowerCase()}_price`] = competitorProduct.competitor_price;
    });

    return transformedProduct;
  });

  return transformedProducts;
}  

const dataForExcel = transformData(brandData);

  //export to excel
  // const exportToExcel = () => {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet("Table Data");
  //   const columns = Object.keys(brandData[0]);
  //   const vendorProductColumns = [
  //     "product_sku",
  //     "vendor_sku",
  //     "vendor_cost",
  //     "vendor_inventory",
  //     "vendor_name",
  //     "vendor.name" // added vendor name
  //   ];
  //   const competitorProductColumns = [
  //     "competitor_price",
  //     "product_url",
  //     "competitor_name",
  //     "competitor.name" // added competitor name
  //   ];
    
  //   const allColumns = columns.concat(vendorProductColumns, competitorProductColumns);
  
  //   // Set column headers
  //   worksheet.addRow(allColumns);
  
  //   // Add table data
  //   brandData.forEach((row) => {
  //     const vendorProducts = row.vendorProducts || [];
  //     const competitorProducts = row.competitorProducts || [];
  //     const maxRows = Math.max(vendorProducts.length, competitorProducts.length);
      
  //     if (maxRows > 0) {
  //       for (let i = 0; i < maxRows; i++) {
  //         const newRow = Object.assign({}, row);
  //         const vendorProduct = vendorProducts[i] || {};
  //         const competitorProduct = competitorProducts[i] || {};
          
  //         // Add the vendor product details as separate columns
  //         newRow.product_sku = vendorProduct.product_sku || "";
  //         newRow.vendor_sku = vendorProduct.vendor_sku || "";
  //         newRow.vendor_cost = vendorProduct.vendor_cost || "";
  //         newRow.vendor_inventory = vendorProduct.vendor_inventory || "";
  //         newRow.vendor_name = (vendorProduct.vendor || {}).name || "";
  
  //         // Add the competitor product details as separate columns
  //         newRow.competitor_price = competitorProduct.competitor_price || "";
  //         newRow.product_url = competitorProduct.product_url || "";
  //         newRow.competitor_name = (competitorProduct.competitor || {}).name || "";
  
  //         // Create an array of row values
  //         const values = allColumns.map((col) => newRow[col]);
  
  //         // Add the row to the worksheet
  //         worksheet.addRow(values);
  //       }
  //     } else {
  //       const values = columns.map((col) => row[col]);
  
  //       // Add empty cells for the vendor product and competitor product columns
  //       vendorProductColumns.concat(competitorProductColumns).forEach(() => values.push(""));
  
  //       // Add the row to the worksheet
  //       worksheet.addRow(values);
  //     }
  //   });
  
  //   // Save the workbook and download the file
  //   workbook.xlsx.writeBuffer().then((buffer) => {
  //     const blob = new Blob([buffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     saveAs(blob, "table.xlsx");
  //   });
  // };

  function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Product Data");
  
    // Define column headers
    sheet.columns = [
      { header: "SKU", key: "sku" },
      { header: "Name", key: "name" },
      { header: "URL", key: "url_path" },
      { header: "Status", key: "status" },
      { header: "Price", key: "price" },
      { header: "Searchable SKU", key: "searchable_sku" },
      { header: "JJ Prefix", key: "jj_prefix" },
      { header: "Image URL", key: "image" },
      { header: "Brand Name", key: "brand_name" },
      { header: "Vendors", key: "vendors" },
      { header: "Meyer Cost", key: "meyer_cost" },
      { header: "Meyer Inventory", key: "meyer_inventory" },
      { header: "Keystone Cost", key: "keystone_cost" },
      { header: "Keystone Inventory", key: "keystone_inventory" },
      { header: "Northridge Price", key: "northridge_price" },
    ];
  
    // Add rows to the sheet
    brandData.forEach((product) => {
      const row = {
        sku: product.sku,
        name: product.name,
        url_path: product.url_path,
        status: product.status,
        price: product.price,
        searchable_sku: product.searchable_sku,
        jj_prefix: product.jj_prefix,
        image: product.image,
        brand_name: product.brand_name,
        vendors: product.vendors,
        meyer_cost: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Meyer"
        )?.vendor_cost,
        meyer_inventory: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Meyer"
        )?.vendor_inventory,
        keystone_cost: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Keystone"
        )?.vendor_cost,
        keystone_inventory: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Keystone"
        )?.vendor_inventory,
        northridge_price: product.competitorProducts.find(
          (cp) => cp.competitor.name === "Northridge 4x4"
        )?.competitor_price,
      };
      sheet.addRow(row);
    });
  
    // Generate and save the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "ProductData.xlsx");
    });
  }

  function exportToExcelAllProducts() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Product Data");
  
    // Define column headers
    sheet.columns = [
      { header: "SKU", key: "sku" },
      { header: "Name", key: "name" },
      { header: "URL", key: "url_path" },
      { header: "Status", key: "status" },
      { header: "Price", key: "price" },
      { header: "Searchable SKU", key: "searchable_sku" },
      { header: "JJ Prefix", key: "jj_prefix" },
      { header: "Image URL", key: "image" },
      { header: "Brand Name", key: "brand_name" },
      { header: "Vendors", key: "vendors" },
      { header: "Meyer Cost", key: "meyer_cost" },
      { header: "Meyer Inventory", key: "meyer_inventory" },
      { header: "Keystone Cost", key: "keystone_cost" },
      { header: "Keystone Inventory", key: "keystone_inventory" },
      { header: "Northridge Price", key: "northridge_price" },
      { header: "Omix Cost", key: "omix_cost" },
    ];
  
    // Add rows to the sheet
    allProducts.forEach((product) => {
      const row = {
        sku: product.sku,
        name: product.name,
        url_path: product.url_path,
        status: product.status,
        price: product.price,
        searchable_sku: product.searchable_sku,
        jj_prefix: product.jj_prefix,
        image: product.image,
        brand_name: product.brand_name,
        vendors: product.vendors,
        meyer_cost: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Meyer"
        )?.vendor_cost,
        meyer_inventory: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Meyer"
        )?.vendor_inventory,
        keystone_cost: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Keystone"
        )?.vendor_cost,
        keystone_inventory: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Keystone"
        )?.vendor_inventory,
        northridge_price: product.competitorProducts.find(
          (cp) => cp.competitor.name === "Northridge 4x4"
        )?.competitor_price,
        omix_cost: product.vendorProducts.find(
          (vp) => vp.vendor.name === "Omix"
        )?.vendor_cost,


      };
      sheet.addRow(row);
    });
  
    // Generate and save the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "ProductData.xlsx");
    });
  }

  console.log("all products", allProducts);

  const prices = brandData.reduce((acc, product) => {
    acc.push(product.price);
    return acc;
  }, []);

  const totalPrice = productsByBrand.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const averagePrice = totalPrice / productsByBrand.length;

  //search by sku
  useEffect(() => {
    const getProductBySku = async () => {
      try {
        if (searchTermSku && searchTermSku.sku) {
          // Add null check
          console.log("value", searchTermSku);
          await axios
            .get(`${BACKEND_URL}/api/products/${searchTermSku.sku}`)
            .then((res) => {
              const responseData = res.data;
              console.log("Data from backend by sku:", responseData);
              // Process the response data from backend if needed
              setData([responseData]);
            });
        }
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      }
    };
    getProductBySku();
  }, [searchTermSku]);

  //search by brand
  useEffect(() => {
    const getProductByBrand = async () => {
      try {
        // Add null check
        console.log("searchTermBrand", searchTermSku);
        if (searchTermSku && searchTermSku.brand_name) {
          setLoading(true);
          await axios.get(`${BACKEND_URL}/api/products`).then((res) => {
            const responseData = res.data;
            setAllProducts(responseData);
            const productsByBrand = getProductsByBrand(
              responseData,
              searchTermSku.brand_name
            );
            console.log("productsByBrand", productsByBrand);
            // Process the response data from backend if needed
            setBrandData(productsByBrand);
            setLoading(false);
          });
        }
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      }
    };
    getProductByBrand();
  }, [searchTermSku]);

  // console.log("brandData", brandData);

  //get all skus
  useEffect(() => {
    const getAllSkus = async () => {
      try {
        await axios
          .get(`${BACKEND_URL}/api/products_sku`)
          .then((res) => {
            const responseData = res.data;
            // Process the response data from backend if needed
            setSku([...responseData]);
          });
      } catch (error) {
        console.error("Failed to fetch data from backend:", error);
      }
    };
    getAllSkus();
  }, []);

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTermSku(event.target.value);
  };

  const skus_for_autocomplete = {
    options: sku, // sample SKU data
    getOptionLabel: (option) => option.sku,
  };

  const brands_for_autocomplete = {
    options: brands, // sample brand data
    getOptionLabel: (option) => option.brand_name,
  };

  const columns_by_sku = [
    {
      title: "Manufacturer",
      dataIndex: "brand_name",
      key: "brand_name",
      align: "center",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      filter: true,
      //render if status is 1 is enableed, if status is 2 is disabled
      render: (status) => (
        <div>
          {status === 1 ? (
            //tag green
            <Tag color="green">Enabled</Tag>
          ) : (
            //tag red
            <Tag color="red">Disabled</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => <img src={image} alt="Product" width="80" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "15%",
      render: (name, vendorProducts) => (
        <a
          href={vendorProducts.url_path}
          target="_blank"
          onClick={() => console.log(vendorProducts)}
        >
          {name}
        </a>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      //render price with $ sign and 2 decimals
      render: (price) => <div>{`$${price.toFixed(2)}`}</div>,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorProducts",
      key: "vendor_id",
      align: "center",
      render: (vendorProducts) =>
        vendorProducts.map((vendorProduct) => (
          <div
            key={vendorProduct.id}
            style={{
              padding: "5px",
              marginBottom: "7px",
            }}
          >
            {vendorProduct.vendor.name}
          </div>
        )),
    },
    {
      title: "Vendor Cost",
      dataIndex: "vendorProducts",
      key: "vendor_cost",
      align: "center",
      render: (vendorProducts) =>
        vendorProducts.map((vendorProduct) => (
          <div
            key={vendorProduct.id}
            style={{
              padding: "5px",
              marginBottom: "7px",
            }}
          >{`$${vendorProduct.vendor_cost.toFixed(2)}`}</div>
        )),
    },
    {
      title: "Margin %",
      key: "margin",
      align: "center",
      render: (record) => {
        const { price, vendorProducts } = record;
        let discountedPrice = 0;
        if (discount > 0) {
          discountedPrice = price * (1 - discount / 100);
        } else {
          discountedPrice = price;
        }
        return vendorProducts.map((vendorProduct) => {
          const { vendor_cost } = vendorProduct;
          const margin =
            ((discountedPrice - vendor_cost) / discountedPrice) * 100;
          const className = margin < 20 ? "red-margin" : "";
          return (
            <div key={vendorProduct.vendor_id}>
              {margin > 20 ? (
                <Tag
                  color="#1f8e24"
                  style={{
                    fontSize: "18px",
                    padding: "5px",
                    marginBottom: "12px",
                  }}
                >
                  {margin.toFixed(2)}%
                </Tag>
              ) : (
                <Tag color="#f63535"
                style={{
                  fontSize: "18px",
                  padding: "5px",
                  marginBottom: "12px",
                }}
              >
                {margin.toFixed(2)}%</Tag>
              )}
            </div>
          );
        });
      },
    },
    {
      title: "Vendor Inventory",
      dataIndex: "vendorProducts",
      key: "vendor_inventory",
      align: "center",
      render: (vendorProducts) =>
        vendorProducts.map((vendorProduct) => (
          <div
            key={vendorProduct.id}
          >
            {vendorProduct.vendor_inventory > 0 ? (
                <Tag
                  color="#1f8e24"
                  style={{
                    fontSize: "18px",
                    padding: "5px",
                    marginBottom: "7px",
                    width: "30px",
                  }}
                >
                  {vendorProduct.vendor_inventory}
                </Tag>
              ) : (
                <Tag color="#f63535"
                style={{
                  fontSize: "18px",
                  padding: "5px",
                  marginBottom: "7px",
                  width: "30px",
                }}>{vendorProduct.vendor_inventory}</Tag>
              )}
          </div>
          
        )),
    },
    // {
    //   title: "Vendor SKU   ",
    //   dataIndex: "vendorProducts",
    //   key: "vendor_sku",
    //   align: "center",
    //   render: (vendorProducts) =>
    //     vendorProducts.map((vendorProduct) => (
    //       <div
    //         key={vendorProduct.id}
    //         style={{
    //           padding: "5px",
    //           marginBottom: "7px",
    //         }}
    //       >
    //         {vendorProduct.vendor_sku}
    //       </div>
    //     )),
    // },
    {
      title: "Suggested Vendor",
      dataIndex: "vendorProducts",
      key: "lowest_cost",
      align: "center",
      render: (vendorProducts, record) => {
        let discountedPrice = 0;
        if (discount > 0) {
          discountedPrice = record.price * (1 - discount / 100);
        } else {
          discountedPrice = record.price;
        }
        const vendorsWithInventory = vendorProducts.filter(
          (vp) => vp.vendor_inventory > 0
        );
        if (vendorsWithInventory.length === 0) {
          return "-";
        }
        const minVendorProduct = vendorsWithInventory.reduce((min, curr) => {
          if (curr.vendor_cost < min.vendor_cost) {
            return curr;
          }
          return min;
        }, vendorsWithInventory[0]);

        const margin =
          ((discountedPrice - minVendorProduct.vendor_cost) / discountedPrice) *
          100;

        const className = margin < 20 ? "red-margin" : "";

        return (
          <div
          style={
            //setup green border if margin is greater than 20%
            margin > 20 ? { border: "2px solid green" } : { border: "2px solid red" }

          }
          >
            <div>{minVendorProduct.vendor.name}</div>
            <div>{`$${minVendorProduct.vendor_cost}`}</div>
            <div className={className}> {`${margin.toFixed(0)}%`} </div>
          </div>
        );
      },
    },
    {
			title: 'Competitor Price',
			dataIndex: 'competitorProducts',
			key: 'competitor_price',
			render: competitorProducts =>
				competitorProducts.length > 0 ? (
					<div
						key={competitorProducts[0].id}
					>{`$${competitorProducts[0].competitor_price}`}</div>
				) : (
					'-'
				),
		},
  ];

  const columns_brands = [
    {
      title: "PRODUCT",
      align: "center",
      children: [
        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku",
          align: "center",
          sorter: (a, b) => a.sku.localeCompare(b.sku),
          filter: true,
        },
        {
          title: "Image",
          dataIndex: "image",
          key: "image",
          align: "center",
          render: (image) => <img src={image} alt="Product" width="80" />,
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          align: "left",
          width: "30%",

          render: (name, vendorProducts) => (
            <a
              style={{ color: "navy" }}
              href={vendorProducts.url_path}
              target="_blank"
              onClick={() => console.log(vendorProducts)}
            >
              {name}
            </a>
          ),
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          align: "center",
          sorter: (a, b) => a.price - b.price,
          //add $ sign to price
          render: (price) => {
            if (discount > 0) {
              const discountedPrice = price * (1 - discount / 100);
              return `$${discountedPrice.toFixed(2)}`;
            } else {
              return `$${price}`;
            }
          },
        },
      ],
    },

    {
      title: "Vendors",
      children: [
        {
          title: "Name",
          dataIndex: "vendorProducts",
          key: "vendor_id",
          align: "center",
          onHeaderCell: (column) => {
            return {
              style: { backgroundColor: "red" },
            };
          },
          render: (vendorProducts) =>
            vendorProducts.map((vendorProduct) => (
              <div
                key={vendorProduct.id}
                style={{
                  padding: "5px",
                  marginBottom: "7px",
                }}
              >
                {vendorProduct.vendor.name}
              </div>
            )),
        },
        {
          title: "Cost",
          dataIndex: "vendorProducts",
          key: "vendor_cost",
          align: "center",
          render: (vendorProducts) =>
            vendorProducts.map((vendorProduct) => (
              <div
                key={vendorProduct.id}
                style={{
                  padding: "5px",
                  marginBottom: "7px",
                }}
              >{`$${vendorProduct.vendor_cost}`}</div>
            )),
        },
        {
          title: "Margin %",
          key: "margin",
          align: "center",
          render: (record) => {
            const { price, vendorProducts } = record;
            let discountedPrice = 0;
            if (discount > 0) {
              discountedPrice = price * (1 - discount / 100);
            } else {
              discountedPrice = price;
            }
            return vendorProducts.map((vendorProduct) => {
              const { vendor_cost } = vendorProduct;
              const margin =
                ((discountedPrice - vendor_cost) / discountedPrice) * 100;
              const className = margin < 20 ? "red-margin" : "";
              return (
                <div key={vendorProduct.vendor_id}>
                  {margin > 20 ? (
                    <Tag
                      color="#1f8e24"
                      style={{
                        fontSize: "18px",
                        padding: "5px",
                        marginBottom: "12px",
                      }}
                    >
                      {margin.toFixed(2)}%
                    </Tag>
                  ) : (
                    <Tag color="#f63535"
                    style={{
                      fontSize: "18px",
                      padding: "5px",
                      marginBottom: "12px",
                    }}
                  >
                    {margin.toFixed(2)}%</Tag>
                  )}
                </div>
              );
            });
          },
        },
        {
          title: "Vendor Inventory",
          dataIndex: "vendorProducts",
          key: "vendor_inventory",
          align: "center",
          render: (vendorProducts) =>
            vendorProducts.map((vendorProduct) => (
              <div
                key={vendorProduct.id}
              >
                {vendorProduct.vendor_inventory > 0 ? (
                    <Tag
                      color="#1f8e24"
                      style={{
                        fontSize: "18px",
                        padding: "5px",
                        marginBottom: "7px",
                        width: "34px",
                      }}
                    >
                      {vendorProduct.vendor_inventory}
                    </Tag>
                  ) : (
                    <Tag color="#f63535"
                    style={{
                      fontSize: "18px",
                      padding: "5px",
                      marginBottom: "7px",
                      width: "34px",
                    }}>{vendorProduct.vendor_inventory}</Tag>
                  )}
              </div>
              
            )),
        },
      ],
    },
    {
      title: "Suggested Vendor",
      dataIndex: "vendorProducts",
      key: "lowest_cost",
      align: "center",
      render: (vendorProducts, record) => {
        let discountedPrice = 0;
        if (discount > 0) {
          discountedPrice = record.price * (1 - discount / 100);
        } else {
          discountedPrice = record.price;
        }
        const vendorsWithInventory = vendorProducts.filter(
          (vp) => vp.vendor_inventory > 0
        );
        if (vendorsWithInventory.length === 0) {
          return "-";
        }
        const minVendorProduct = vendorsWithInventory.reduce((min, curr) => {
          if (curr.vendor_cost < min.vendor_cost) {
            return curr;
          }
          return min;
        }, vendorsWithInventory[0]);

        const margin =
          ((discountedPrice - minVendorProduct.vendor_cost) / discountedPrice) *
          100;

        const className = margin < 20 ? "red-margin" : "";

        return (
          <div
          style={
            //setup green border if margin is greater than 20%
            margin > 20 ? { border: "2px solid green" } : { border: "2px solid red" }

          }
          >
            <div>{minVendorProduct.vendor.name}</div>
            <div>{`$${minVendorProduct.vendor_cost}`}</div>
            <div className={className}> {`${margin.toFixed(0)}%`} </div>
          </div>
        );
      },
    },
    {
			title: 'Competitor Price',
			dataIndex: 'competitorProducts',
			key: 'competitor_price',
			render: competitorProducts =>
				competitorProducts.length > 0 ? (
					<div
						key={competitorProducts[0].id}
					>{`$${competitorProducts[0].competitor_price}`}</div>
				) : (
					'-'
				),
		},
  ];

  const tableProps = {
    loading,
  };

  // console.log("data brand legnth", brandData.length);

  return (
    <div className="items">
      <div className="sidebar">
        <div className="explore-dropdown">
          <FormControl sx={{ mt: 10, width: 300 }}>
            SEARCH BY:
            <Select
              value={searchBy}
              onChange={handleSearchByChange}
              style={{
                width: 300,
                margin: 0,
                marginRight: 10,
                padding: 0,
                borderRadius: 10,
                height: 55,
                backgroundColor: "white",
              }}
            >
              <MenuItem value="sku">SKU</MenuItem>
              <MenuItem value="brand">Brand</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="explore-data-entry">
          {searchBy === "sku" ? (
            <div className="sidebar-sku">
              <Autocomplete
                {...skus_for_autocomplete}
                sx={{
                  width: 300,
                  backgroundColor: "white",
                  height: 55,
                }}
                id="clear-on-escape"
                clearOnEscape
                value={null}
                onChange={(event, newValue) => {
                  setSearchTermSku(newValue);
                }}
                style={{
                  borderRadius: 5,
                }}
                renderInput={(params) => (
                  <TextField
                    className="textfield"
                    {...params}
                    label="Search SKU"
                    variant="standard"
                    onChange={handleSearchTermChange}
                  />
                )}
              />
            </div>
          ) : (
            <div className="sidebar-brand">
              <Autocomplete
                {...brands_for_autocomplete}
                sx={{
                  width: 300,
                  backgroundColor: "white",
                  height: 55,
                }}
                id="clear-on-escape"
                clearOnEscape
                value={null}
                onChange={(event, newValue) => {
                  setSearchTermSku(newValue);
                }}
                style={{
                  borderRadius: 5,
                }}
                renderInput={(params) => (
                  <TextField
                    className="textfield"
                    {...params}
                    label="Search brand"
                    variant="standard"
                    onChange={handleSearchTermChange}
                    // InputLabelProps={{
                    //   style: {
                    //     fontSize: 16,
                    //     // fontWeight: 'bold',
                    //   },
                    // }}
                    // //input size
                    // InputProps={{
                    //   style: {
                    // 		fontSize: 20
                    // 	},
                    // }}
                  />
                )}
              />
              <Button className="excel-export" onClick={exportToExcel}>
                <UploadOutlined /> Export to Excel
              </Button>
              <Button className="excel-export" onClick={exportToExcelAllProducts}>
                <UploadOutlined /> Export ALL to Excel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="explore-content">
        {searchBy === "sku" ? (
          <Table
            dataSource={data}
            columns={columns_by_sku}
            rowKey="sku"
            pagination={false} // Change pageSize as needed
            title={() => (
              <div>
                {data.length > 0 && (
                  <h5>Vendors for this Brand: {data[0].vendors}</h5>
                )}
              </div>
            )}
          />
        ) : (


          
          <div>

            {brandData.length > 0 && (
            <div className="brand-statistic">

           

              <div className="widget">
                <div className="left">
                  <span className="title">
                    <strong> PROMOTION SIMULATION:</strong>
                  </span>
                  <InputNumber
                    min={0}
                    max={50}
                    defaultValue={0}
                    onChange={onChange}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    size="large"
                    style={{ width: 100, height: 45, marginLeft: 10, fontSize: 20, backgroundColor: "#e6e088" }}
                  />
                </div>
                <div className="right">
                  <MonetizationOnOutlinedIcon
                    className="icon"
                    style={{
                      backgroundColor: "rgba(218, 165, 32, 0.2)",
                      color: "goldenrod",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </div>

              <div className="widget">
                <div className="left">
                  <span className="title">
                    <strong>{searchTermSku.brand_name} </strong>TOTAL PRODUCTS:
                  </span>
                  <span className="counter">{brandData.length}</span>
                </div>
                <div className="right">
                  <PrecisionManufacturingOutlinedIcon
                    className="icon"
                    style={{
                      color: "purple",
                      backgroundColor: "rgba(255, 0, 0, 0.2)",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </div>

              <div className="widget">
                <div className="left">
                  <span className="title">
                    <strong>{searchTermSku.brand_name} </strong>Vendors:
                  </span>
                  {brandData.length > 0 && (
                    <span className="counter" style={{ fontSize: 18 }}>
                      {brandData[0].vendors}
                    </span>
                  )}
                </div>
                <div className="right">
                  <MonetizationOnOutlinedIcon
                    className="icon"
                    style={{
                      backgroundColor: "rgba(218, 165, 32, 0.2)",
                      color: "goldenrod",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </div>


              <div className="widget">
                <div className="left">
                  <span className="title">
                    <strong>{searchTermSku.brand_name} </strong>Price Range:
                  </span>
                  <span className="counter">
                    ${minPrice} -${maxPrice}{" "}
                  </span>
                </div>
                <div className="right">
                  <MonetizationOnOutlinedIcon
                    className="icon"
                    style={{
                      backgroundColor: "rgba(218, 165, 32, 0.2)",
                      color: "goldenrod",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </div>

              <div className="widget">
                <div className="left">
                  <span className="title">
                    <strong>{searchTermSku.brand_name} </strong>Price Average:
                  </span>
                  <span className="counter">${averagePrice.toFixed(2)}</span>
                </div>
                <div className="right">
                  <MonetizationOnOutlinedIcon
                    className="icon"
                    style={{
                      backgroundColor: "rgba(0, 128, 0, 0.2)",
                      color: "green",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </div>

              {/* <h5>Vendors for this Brand: {brandData[0].vendors}</h5> */}
            </div>
    
                   )}

            <Table
              {...tableProps}
              dataSource={brandData}
              columns={columns_brands}
              rowKey="sku"
              size="large"
              pagination={{
                // pageSize: 20,
                //move to top
                position: ["topRight"],
                //change font color
      
              }}
              loading={loading}
              scroll={{ y: 1000 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const productsByBrand = [
  {
    sku: "BST-56820-15",
    name: "BESTOP Trektop NX With Tinted Windows In Black Denim For 1997-06 Jeep Wrangler TJ Models 56820-15",
    price: 1444.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//5/6/56820-15.jpg",
    brand_name: "BESTOP",
    vendorProducts: [
      {
        product_sku: "BST-56820-15",
        vendor_sku: "BES56820-15",
        vendor_cost: 1003.57,
        vendor_inventory: 7,
        vendor: {
          name: "Meyer",
        },
      },
      {
        product_sku: "BST-56820-15",
        vendor_sku: "D345682015",
        vendor_cost: 956.27,
        vendor_inventory: 1,
        vendor: {
          name: "Keystone",
        },
      },
    ],
    competitorProducts: [],
  },
  {
    sku: "BST-56820-35",
    name: "BESTOP Trektop NX With Tinted Windows In Black Diamond For 1997-06 Jeep Wrangler TJ Models 56820-35",
    price: 1417.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//5/6/56820-35.jpg",
    brand_name: "BESTOP",
    vendorProducts: [
      {
        product_sku: "BST-56820-35",
        vendor_sku: "BES56820-35",
        vendor_cost: 1003.57,
        vendor_inventory: 97,
        vendor: {
          name: "Meyer",
        },
      },
      {
        product_sku: "BST-56820-35",
        vendor_sku: "D345682035",
        vendor_cost: 956.27,
        vendor_inventory: 58,
        vendor: {
          name: "Keystone",
        },
      },
    ],
    competitorProducts: [
      {
        competitor_price: 1205.99,
        product_url:
          "https://www.northridge4x4.ca/part/soft-tops/56820-35-bestop-black-diamond-trektop-soft-top",
        competitor: {
          name: "Northridge 4x4",
        },
      },
    ],
  },
  {
    sku: "BST-56822-35",
    name: "Discontinued: Bestop (Black Diamond) Trektop NX With Tinted Windows For 2007-18 Jeep Wrangler JK 2 Door Models 56822-35",
    price: 792.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//5/6/56822-2.jpg",
    brand_name: "BESTOP",
    vendorProducts: [
      {
        product_sku: "BST-56822-35",
        vendor_sku: "BES56822-35",
        vendor_cost: 725.39,
        vendor_inventory: 0,
        vendor: {
          name: "Meyer",
        },
      },
      {
        product_sku: "BST-56822-35",
        vendor_sku: "D345682235",
        vendor_cost: 671.27,
        vendor_inventory: 16,
        vendor: {
          name: "Keystone",
        },
      },
    ],
    competitorProducts: [],
  },
  {
    sku: "BST-56823-35",
    name: "DIS: Bestop (Black Diamond) Trektop NX With Tinted Windows For 2007-18 Jeep Wrangler JK Unlimited 4 Door Models 56823-35",
    price: 823.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//5/6/56823-35a.jpg",
    brand_name: "BESTOP",
    vendorProducts: [
      {
        product_sku: "BST-56823-35",
        vendor_sku: "BES56823-35",
        vendor_cost: 836.88,
        vendor_inventory: 0,
        vendor: {
          name: "Meyer",
        },
      },
      {
        product_sku: "BST-56823-35",
        vendor_sku: "D345682335",
        vendor_cost: 774.45,
        vendor_inventory: 56,
        vendor: {
          name: "Keystone",
        },
      },
    ],
    competitorProducts: [],
  },
  {
    sku: "BUB-176610EXT",
    name: "Bubba Rope 10' Extension Rope 7/8\" x 10' With A 28,600 lbs. Breaking Strength",
    price: 251.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//1/7/176610ext.jpg",
    brand_name: "Bubba Rope",
    vendorProducts: [
      {
        product_sku: "BUB-176610EXT",
        vendor_sku: "BUB176610EXT",
        vendor_cost: 172.31,
        vendor_inventory: 0,
        vendor: {
          name: "Meyer",
        },
      },
    ],
    competitorProducts: [],
  },
  {
    sku: "BUB-176000OR",
    name: "Bubba Rope (10FT Length) Tree Hugger With A 47,000 lbs. Breaking Strength",
    price: 132.95,
    image: null,
    brand_name: "Bubba Rope",
    vendorProducts: [
      {
        product_sku: "BUB-176000OR",
        vendor_sku: "BUB176000OR",
        vendor_cost: 97.65,
        vendor_inventory: 9,
        vendor: {
          name: "Meyer",
        },
      },
    ],
    competitorProducts: [
      {
        competitor_price: 113.9,
        product_url:
          "https://www.northridge4x4.ca/part/straps/176000or-bubba-rope-tree-hugger",
        competitor: {
          name: "Northridge 4x4",
        },
      },
    ],
  },
  {
    sku: "BUB-176756X100",
    name: "Bubba Rope 100' Winch Line Replacement 3/8\" x 100' For 9,000 lbs - 10,000 lbs Winches",
    price: 844.95,
    image: null,
    brand_name: "Bubba Rope",
    vendorProducts: [
      {
        product_sku: "BUB-176756X100",
        vendor_sku: "BUB176756X100",
        vendor_cost: 620.33,
        vendor_inventory: 0,
        vendor: {
          name: "Meyer",
        },
      },
    ],
    competitorProducts: [
      {
        competitor_price: 723.6,
        product_url:
          "https://www.northridge4x4.ca/part/winch-lines/176756x100-bubba-rope-100ft-winch-replacement-line",
        competitor: {
          name: "Northridge 4x4",
        },
      },
    ],
  },
  {
    sku: "BUB-176016OR",
    name: "Bubba Rope (16FT Length) Tree Hugger With A 47,000 lbs. Breaking Strength",
    price: 148.95,
    image: null,
    brand_name: "Bubba Rope",
    vendorProducts: [
      {
        product_sku: "BUB-176016OR",
        vendor_sku: "BUB176016OR",
        vendor_cost: 109.13,
        vendor_inventory: 8,
        vendor: {
          name: "Meyer",
        },
      },
    ],
    competitorProducts: [
      {
        competitor_price: 127.3,
        product_url:
          "https://www.northridge4x4.ca/part/straps/176016or-bubba-rope-tree-hugger-16ft",
        competitor: {
          name: "Northridge 4x4",
        },
      },
    ],
  },
  {
    sku: "BUB-176757",
    name: "Bubba Rope 25' Winch Line Extension 3/8\" x 25' With A 17,200 lbs. Breaking Strength",
    price: 333.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//1/7/176757.jpeg",
    brand_name: "Bubba Rope",
    vendorProducts: [
      {
        product_sku: "BUB-176757",
        vendor_sku: "BUB176757",
        vendor_cost: 228.61,
        vendor_inventory: 1,
        vendor: {
          name: "Meyer",
        },
      },
    ],
    competitorProducts: [],
  },
  {
    sku: "BUB-176756",
    name: "Bubba Rope 50' Winch Line Extension 3/8\" x 50' With A 17,200 lbs. Breaking Strength",
    price: 526.95,
    image:
      "https://www.justjeeps.com/pub/media/catalog/product//1/7/176756.jpeg",
    brand_name: "Bubba Rope",
    vendorProducts: [
      {
        product_sku: "BUB-176756",
        vendor_sku: "BUB176756",
        vendor_cost: 359.56,
        vendor_inventory: 0,
        vendor: {
          name: "Meyer",
        },
      },
    ],
    competitorProducts: [],
  },
];

const skus = [
  {
    sku: "",
  },
  {
    sku: "ACC-15064-97-897",
  },
  {
    sku: "ACC-15064-97-901",
  },
  {
    sku: "ACC-15064-97-907",
  },
  {
    sku: "ACC-15064-97-912",
  },
  {
    sku: "ACC-15064-97-9777",
  },
  {
    sku: "ACU-AA-4397",
  },
  {
    sku: "ACU-AP-532002",
  },
  {
    sku: "ACU-AP-542002",
  },
  {
    sku: "ADD-AC95152003NA",
  },
  {
    sku: "ADD-AC96157001NA",
  },
  {
    sku: "ADD-ACNA143101NA",
  },
  {
    sku: "ADD-ARDJL-01-HDJL-01",
  },
];

const brands = [
  {
    brand_name: "BESTOP",
  },
  {
    brand_name: "Bubba Rope",
  },
  {
    brand_name: "MOPAR",
  },
  {
    brand_name: "Just Jeeps",
  },
  {
    brand_name: "",
  },
  {
    brand_name: "Addictive Desert Designs",
  },
  {
    brand_name: "Alloy USA",
  },
  {
    brand_name: "American Expedition Vehicles (MAP)",
  },
  {
    brand_name: "Air Design",
  },
  {
    brand_name: "OMIX-ADA",
  },
  {
    brand_name: "AMP Research",
  },
  {
    brand_name: "ARB",
  },
  {
    brand_name: "Aries Automotive",
  },
  {
    brand_name: "KeyParts",
  },
  {
    brand_name: "Trail Master",
  },
  {
    brand_name: "Auto Ventshade",
  },
  {
    brand_name: "Banks Power",
  },
  {
    brand_name: "BedRug",
  },
  {
    brand_name: "BF Goodrich Tires",
  },
  {
    brand_name: "Bilstein",
  },
  {
    brand_name: "Black Rock Wheels",
  },
  {
    brand_name: "Body Armor 4x4",
  },
  {
    brand_name: "BUSHWACKER",
  },
  {
    brand_name: "Borgeson",
  },
  {
    brand_name: "CARR",
  },
  {
    brand_name: "Smittybilt",
  },
  {
    brand_name: "Cobra Electronics",
  },
  {
    brand_name: "Corsa Performance",
  },
  {
    brand_name: "Crown Automotive",
  },
  {
    brand_name: "RT Off-Road",
  },
  {
    brand_name: "Daystar",
  },
  {
    brand_name: "D&C Designs",
  },
  {
    brand_name: "EATON",
  },
  {
    brand_name: "Dana Spicer",
  },
  {
    brand_name: "Dirty Dog 4X4",
  },
  {
    brand_name: "Rampage Products",
  },
  {
    brand_name: "DV8 OffRoad",
  },
  {
    brand_name: "GOODYEAR",
  },
  {
    brand_name: "Draw-Tite",
  },
  {
    brand_name: "Dunlop",
  },
  {
    brand_name: "DynoMax Exhaust",
  },
  {
    brand_name: "EBC Brakes",
  },
  {
    brand_name: "Energy Suspension",
  },
  {
    brand_name: "Fab Fours",
  },
  {
    brand_name: "Factor 55",
  },
  {
    brand_name: "Faulkner",
  },
  {
    brand_name: "FlowMaster",
  },
  {
    brand_name: "Fuel Off-Road",
  },
  {
    brand_name: "Gibson Performance",
  },
  {
    brand_name: "Go Rhino",
  },
  {
    brand_name: "Gorilla Automotive",
  },
  {
    brand_name: "Harken Hoister",
  },
  {
    brand_name: "HELLA",
  },
  {
    brand_name: "Hi-Lift Jack",
  },
  {
    brand_name: "Husky Liners",
  },
  {
    brand_name: "Hopkins",
  },
  {
    brand_name: "Hypertech",
  },
  {
    brand_name: "In Pro Carwear",
  },
  {
    brand_name: "JBA Performance Exhaust",
  },
  {
    brand_name: "PSC Steering",
  },
  {
    brand_name: "J.W. Speaker",
  },
  {
    brand_name: "K&N",
  },
  {
    brand_name: "KC HILITES",
  },
  {
    brand_name: "Kentrol",
  },
  {
    brand_name: "KMC Wheels",
  },
  {
    brand_name: "Automotive Gold",
  },
  {
    brand_name: "Plasticolor",
  },
  {
    brand_name: "Lange Originals",
  },
  {
    brand_name: "LUK Clutches",
  },
  {
    brand_name: "Mountain Offroad",
  },
  {
    brand_name: "MagnaFlow",
  },
  {
    brand_name: "MBRP Inc",
  },
  {
    brand_name: "MICKEY THOMPSON Tires/Wheels",
  },
  {
    brand_name: "McGard Wheel Locks",
  },
  {
    brand_name: "Nitto Tire",
  },
  {
    brand_name: "MOOG",
  },
  {
    brand_name: "Toyo Tires",
  },
  {
    brand_name: "Rugged Ridge",
  },
  {
    brand_name: "Optima Batteries",
  },
  {
    brand_name: "Pavement Ends",
  },
  {
    brand_name: "PIAA",
  },
  {
    brand_name: "Poison Spyder Customs",
  },
  {
    brand_name: "Power Trax",
  },
  {
    brand_name: "PRO COMP Alloy Wheels",
  },
  {
    brand_name: "Pro Series",
  },
  {
    brand_name: "Putco",
  },
  {
    brand_name: "Rigid Industries",
  },
  {
    brand_name: "Rancho",
  },
  {
    brand_name: "Rhino-Rack",
  },
  {
    brand_name: "Rock Krawler Suspension",
  },
  {
    brand_name: "Rough Country",
  },
  {
    brand_name: "Rubicon Express",
  },
  {
    brand_name: "Auto Rust Technicians",
  },
  {
    brand_name: "Skyjacker Suspension",
  },
  {
    brand_name: "SpiderTrax",
  },
  {
    brand_name: "Sprint Booster",
  },
  {
    brand_name: "Thule Racks",
  },
  {
    brand_name: "Synergy MFG",
  },
  {
    brand_name: "TeraFlex",
  },
  {
    brand_name: "Tuffy Products",
  },
  {
    brand_name: "Vertically Driven Products",
  },
  {
    brand_name: "WARN",
  },
  {
    brand_name: "Warrior Products",
  },
  {
    brand_name: "WeatherTech",
  },
  {
    brand_name: "XENON",
  },
  {
    brand_name: "ReadyLIFT",
  },
  {
    brand_name: "G2 Axle & Gear",
  },
  {
    brand_name: "Viair",
  },
  {
    brand_name: "UWS Storage",
  },
  {
    brand_name: "Old Man Emu",
  },
  {
    brand_name: "Jet Performance",
  },
  {
    brand_name: "Borla Performance",
  },
  {
    brand_name: "Dorman",
  },
  {
    brand_name: "TrailFX",
  },
  {
    brand_name: "Ripp Supercharger",
  },
  {
    brand_name: "T-Rex",
  },
  {
    brand_name: "Grote",
  },
  {
    brand_name: "Bolt Lock",
  },
  {
    brand_name: "Rock Hard 4X4",
  },
  {
    brand_name: "Sailun Tires",
  },
  {
    brand_name: "ANZO USA",
  },
  {
    brand_name: "Jammock",
  },
  {
    brand_name: "Jeep Tweaks",
  },
  {
    brand_name: "Lube Locker",
  },
  {
    brand_name: "RotoPax",
  },
  {
    brand_name: "JKS Manufacturing",
  },
  {
    brand_name: "aFe Power",
  },
  {
    brand_name: "POR-15",
  },
  {
    brand_name: "Fox Racing",
  },
  {
    brand_name: "Switch-Pros",
  },
  {
    brand_name: "Novak Conversions",
  },
  {
    brand_name: "ODYSSEY Battery",
  },
  {
    brand_name: "Brand Motion",
  },
  {
    brand_name: "MORryde",
  },
  {
    brand_name: "Westin Automotive",
  },
  {
    brand_name: "Recon",
  },
  {
    brand_name: "Max-Bilt",
  },
  {
    brand_name: "American Racing",
  },
  {
    brand_name: "Cooper Tires",
  },
  {
    brand_name: "Centerforce",
  },
  {
    brand_name: "Oracle Lighting",
  },
  {
    brand_name: "Spyder Automotive",
  },
  {
    brand_name: "ZROADZ",
  },
  {
    brand_name: "Alpine",
  },
  {
    brand_name: "Excalibur",
  },
  {
    brand_name: "N-Fab",
  },
  {
    brand_name: "Superchips",
  },
  {
    brand_name: "Rock Slide Engineering",
  },
  {
    brand_name: "MONROE Shocks & Struts",
  },
  {
    brand_name: "Rightline Gear",
  },
  {
    brand_name: "Bridgestone",
  },
  {
    brand_name: "AirBedz",
  },
  {
    brand_name: "Artec Industries",
  },
  {
    brand_name: "Currie Enterprises",
  },
  {
    brand_name: "AEM",
  },
  {
    brand_name: "Pro Eagle",
  },
  {
    brand_name: "Baja Designs",
  },
  {
    brand_name: "Advance Adapters",
  },
  {
    brand_name: "TuxMat",
  },
  {
    brand_name: "S&B Filters",
  },
  {
    brand_name: "INSYNC",
  },
  {
    brand_name: "MACPEK",
  },
  {
    brand_name: "Pedal Commander",
  },
  {
    brand_name: "Kleinn",
  },
  {
    brand_name: "Dynatrac",
  },
  {
    brand_name: "RockJock",
  },
  {
    brand_name: "Eibach Springs",
  },
  {
    brand_name: "Fishbone Offroad",
  },
  {
    brand_name: "Power Stop",
  },
  {
    brand_name: "Trail Head Customs",
  },
  {
    brand_name: "Dirty Life",
  },
  {
    brand_name: "Falken WildPeak",
  },
  {
    brand_name: "AMI Styling",
  },
  {
    brand_name: "RSI",
  },
  {
    brand_name: "Garvin Wilderness",
  },
  {
    brand_name: "Superlift",
  },
  {
    brand_name: "Curt Manufacturing",
  },
  {
    brand_name: "Rust Buster",
  },
  {
    brand_name: "Overland Vehicle Systems",
  },
  {
    brand_name: "Decked",
  },
  {
    brand_name: "Z Automotive",
  },
  {
    brand_name: "AO Coolers",
  },
  {
    brand_name: "MCE",
  },
  {
    brand_name: "Surco",
  },
  {
    brand_name: "DeeZee",
  },
  {
    brand_name: "Fabtech",
  },
  {
    brand_name: "Napier Sportz",
  },
  {
    brand_name: "Road Armor",
  },
  {
    brand_name: "Maxxis",
  },
  {
    brand_name: "Method Race Wheels",
  },
  {
    brand_name: "Paramount Automotive",
  },
  {
    brand_name: "Black Rhino",
  },
  {
    brand_name: "Pilot Automotive",
  },
  {
    brand_name: "Diver Down",
  },
  {
    brand_name: "Quadratec",
  },
  {
    brand_name: "Genright Off Road",
  },
  {
    brand_name: "Tekonsha",
  },
  {
    brand_name: "Yukon",
  },
  {
    brand_name: "Vision X",
  },
  {
    brand_name: "ProMaxx Automotive",
  },
  {
    brand_name: "Zone Offroad",
  },
  {
    brand_name: "Blue Ox",
  },
  {
    brand_name: "RainX",
  },
  {
    brand_name: "ANCO",
  },
  {
    brand_name: "Krystal Kleer",
  },
  {
    brand_name: "Scosche",
  },
  {
    brand_name: "ClearlidZ",
  },
  {
    brand_name: "Misch 4x4",
  },
  {
    brand_name: "XG Cargo",
  },
  {
    brand_name: "Iron Cross",
  },
  {
    brand_name: "EVO Manufacturing",
  },
  {
    brand_name: "Boomerang Enterprises",
  },
  {
    brand_name: "Magnum by Raptor Series",
  },
  {
    brand_name: "Husky Towing Products",
  },
  {
    brand_name: "MasterTop",
  },
  {
    brand_name: "Mishimoto",
  },
  {
    brand_name: "DU-HA",
  },
  {
    brand_name: "Rockagator",
  },
  {
    brand_name: "A.R.E.",
  },
  {
    brand_name: "OFFGRID",
  },
  {
    brand_name: "Tuff Stuff 4x4",
  },
  {
    brand_name: "Stromberg Carlson Products",
  },
  {
    brand_name: "NGK",
  },
  {
    brand_name: "TecStyle",
  },
  {
    brand_name: "Exposed Racks",
  },
  {
    brand_name: "TACTIK",
  },
  {
    brand_name: "Super Swamper",
  },
  {
    brand_name: "Hellwig Suspension",
  },
  {
    brand_name: "Heininger Automotive",
  },
  {
    brand_name: "Garage Smart",
  },
  {
    brand_name: "Fifteen52",
  },
  {
    brand_name: "AIRAID",
  },
  {
    brand_name: "Auto Custom Carpets",
  },
  {
    brand_name: "Corbeau",
  },
  {
    brand_name: "Overtread",
  },
  {
    brand_name: "Stinger Off-Road",
  },
  {
    brand_name: "Black Horse Offroad",
  },
  {
    brand_name: "Vivid Lumen",
  },
  {
    brand_name: "Kicker Jeep Audio & Electronics",
  },
  {
    brand_name: "Mamba Offroad",
  },
  {
    brand_name: "Mirage Unlimited",
  },
  {
    brand_name: "Motor City Aftermarket",
  },
  {
    brand_name: "Overland Outfitters",
  },
  {
    brand_name: "Reaper Off-Road",
  },
  {
    brand_name: "American Trail Products",
  },
  {
    brand_name: "MD Juan",
  },
  {
    brand_name: "Rival 4x4",
  },
  {
    brand_name: "Rox Offroad",
  },
  {
    brand_name: "Romik",
  },
  {
    brand_name: "Fairchild Industries",
  },
  {
    brand_name: "LoD Offroad",
  },
  {
    brand_name: "AJT Design",
  },
  {
    brand_name: "VersaHitch",
  },
  {
    brand_name: "Cliffride",
  },
  {
    brand_name: "CargoGlide",
  },
  {
    brand_name: "Covercraft",
  },
  {
    brand_name: "Steer Smarts",
  },
  {
    brand_name: "Diode Dynamics",
  },
  {
    brand_name: "Kumho",
  },
  {
    brand_name: "Quake LED",
  },
  {
    brand_name: "Precision Replacement Parts",
  },
  {
    brand_name: "Meyer Products",
  },
  {
    brand_name: "Tom Woods",
  },
  {
    brand_name: "RockNob",
  },
  {
    brand_name: "SpiderWebShade",
  },
  {
    brand_name: "NOCO",
  },
  {
    brand_name: "Schumacher",
  },
  {
    brand_name: "YKW",
  },
  {
    brand_name: "THIBERT",
  },
  {
    brand_name: "Jeep",
  },
  {
    brand_name: "Camco",
  },
  {
    brand_name: "GT Styling",
  },
  {
    brand_name: "CAT",
  },
  {
    brand_name: "Cervini's Auto Design",
  },
  {
    brand_name: "Extang",
  },
  {
    brand_name: "Armorlite",
  },
  {
    brand_name: "Seatbelt Solutions",
  },
  {
    brand_name: "Savvy Off Road",
  },
  {
    brand_name: "Motive Gear",
  },
  {
    brand_name: "Wilco Offroad",
  },
  {
    brand_name: "Griffin Radiator",
  },
  {
    brand_name: "Outback Adventures",
  },
  {
    brand_name: "SpeedFX",
  },
  {
    brand_name: "Chemical Guys",
  },
  {
    brand_name: "Lumatron",
  },
  {
    brand_name: "Phoenix Graphix",
  },
  {
    brand_name: "Roam Adventure Co.",
  },
  {
    brand_name: "Dometic",
  },
  {
    brand_name: "Rolling Big Power",
  },
  {
    brand_name: "Carnivore",
  },
  {
    brand_name: "American Outlaw",
  },
  {
    brand_name: "Autowatch Canada",
  },
  {
    brand_name: "Briidea",
  },
  {
    brand_name: "Full Auto",
  },
  {
    brand_name: "Rugged Radios",
  },
  {
    brand_name: "Under The Sun",
  },
  {
    brand_name: "BDS Suspension",
  },
  {
    brand_name: "Pacer Performance Products",
  },
  {
    brand_name: "SeaSucker",
  },
  {
    brand_name: "Michelin",
  },
  {
    brand_name: "Firestone",
  },
  {
    brand_name: "AccuPart",
  },
  {
    brand_name: "RES-Q",
  },
  {
    brand_name: "Lynx",
  },
  {
    brand_name: "Timbren",
  },
  {
    brand_name: "Element - Fire Extinguishers",
  },
  {
    brand_name: "Mayhem Wheels",
  },
  {
    brand_name: "Havoc Offroad",
  },
  {
    brand_name: "Safety Seal",
  },
  {
    brand_name: "HyLine OffRoad",
  },
  {
    brand_name: "Accuair",
  },
];
