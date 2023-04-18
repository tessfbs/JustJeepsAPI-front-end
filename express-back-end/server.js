const Express = require("express");
const { format, parseISO } = require('date-fns');
const app = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Use cors middleware
app.use(cors());

// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(Express.static("public"));

// Sample GET route
app.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!",
  })
);

//* Routes for Orders *\\

// Route for getting all orders
app.get("/api/orders", async (req, res) => {
  try {
    //order including order products
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

//Route for getting a single order
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        entity_id: Number(req.params.id),
      },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Route for updating an order status
app.post("/api/orders/:id/update", async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: {
        entity_id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });
    console.log(order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

//Route for deleting an order
// app.delete("/api/orders/:id/delete", async (req, res) => {
//   try {
//     const order = await prisma.order.delete({
//       where: {
//         entity_id: Number(req.params.id),
//       },
//     });
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete order" });
//   }
// });

//* Routes for Product Orders *\\

//Route for getting all product orders
app.get("/api/order_products", async (req, res) => {
  try {
    const productOrders = await prisma.orderProduct.findMany({
      include: {
        order: true,
        product: true,
      },
    });
    res.json(productOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product orders" });
  }
});

// Route for creating an order product
app.post('/order_products', async (req, res) => {
  try {
    const { order_id, name, sku, base_price, base_price_incl_tax, discount_amount, discount_invoiced, discount_percent, original_price, price, price_incl_tax, product_id, qty_ordered } = req.body;
    const createdOrderProduct = await prisma.orderProduct.create({
      data: {
        order_id: order_id,
        name: name,
        sku: sku,
        base_price: base_price,
        base_price_incl_tax: base_price_incl_tax,
        discount_amount: discount_amount,
        discount_invoiced: discount_invoiced,
        discount_percent: discount_percent,
        original_price: original_price,
        price: price,
        price_incl_tax: price_incl_tax,
        product_id: product_id,
        qty_ordered: qty_ordered,
      },
    });
    res.json(createdOrderProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order product' });
  }
});

// Route for editing an order product
app.post('/order_products/:id/edit', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, sku, base_price, base_price_incl_tax, discount_amount, discount_invoiced, discount_percent, original_price, price, price_incl_tax, product_id, qty_ordered } = req.body;
    const updatedOrderProduct = await prisma.orderProduct.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        sku: sku,
        base_price: base_price,
        base_price_incl_tax: base_price_incl_tax,
        discount_amount: discount_amount,
        discount_invoiced: discount_invoiced,
        discount_percent: discount_percent,
        original_price: original_price,
        price: price,
        price_incl_tax: price_incl_tax,
        product_id: product_id,
        qty_ordered: qty_ordered,
      },
    });
    res.json(updatedOrderProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order product' });
  }
});

// Route for deleting an order product
app.post('/order_products/:id/delete', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Delete the order product from the database using Prisma
    await prisma.orderProduct.delete({
      where: { id }
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete order product' });
  }
});


//* Routes for Vendor Products *\\

// Route for getting all vendor products
app.get("/api/vendor_products", async (req, res) => {
  try {
    //vendor products including order products and vendor
    const vendorProducts = await prisma.vendorProduct.findMany({
      include: {
        vendor: true,
        product: true,
      },
    });
    res.json(vendorProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Route for getting vendor products by sku
app.get("/api/vendor_products/:sku", async (req, res) => {
  console.log(req.params.sku);
  try {
    const vendorProduct = await prisma.vendorProduct.findMany({
      where: {
        product_sku: req.params.sku,
      },
      include: {
        vendor: true,
        product: true,
      },
    });
    res.json(vendorProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vendor product" });
  }
});

// Route for getting Vendors info
app.get("/api/vendors", async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

//* Routes for Purchase Orders *\\

// Route for getting all Purchase Orders
app.get("/api/purchase_orders", async (req, res) => {
  try {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      include: {
        vendor: true,
        user: true,
        order: true,
        purchaseOrderLineItems: {
          include: {
            vendorProduct: true,
            purchaseOrder: true,
          },
        },
      },
    });
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchase orders" });
  }
});

// Route for getting a single Purchase Order
app.get("/api/purchase_orders/:id", async (req, res) => {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      vendor: true,
      user: true,
      order: true,
      purchaseOrderLineItems: {
        include: {
          vendorProduct: true,
          purchaseOrder: true,
        },
      },
    },
  });
  res.json(purchaseOrder);
});

// Route for creating a Purchase Order
app.post("/api/purchase_orders", async (req, res) => {
  try {
    const purchaseOrder = await prisma.purchaseOrder.create({
      data: {
        vendor_id: req.body.vendor_id,
        user_id: req.body.user_id,
        order_id: req.body.order_id,
      },
      include: {
        vendor: true,
        user: true,
        order: true,
        purchaseOrderLineItems: {
          include: {
            vendorProduct: true,
            purchaseOrder: true,
          },
        },
      },
    });
    res.json(purchaseOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create purchase order" });
  }
});

// Route for updating a Purchase Order
app.post("/api/purchase_orders/:id/update", async (req, res) => {
  try {
    const purchaseOrder = await prisma.purchaseOrder.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        vendor_id: req.body.vendor_id,
        user_id: req.body.user_id,
        order_id: req.body.order_id,
      },
      include: {
        vendor: true,
        user: true,
        order: true,
        purchaseOrderLineItems: {
          include: {
            vendorProduct: true,
            purchaseOrder: true,
          },
        },
      },
    });
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to update purchase order" });
  }
});

// Route for deleting a Purchase Order
app.post("/api/purchase_orders/:id/delete", async (req, res) => {
  try {
    const purchaseOrder = await prisma.purchaseOrder.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete purchase order" });
  }
});

// Route for getting the grand total of all orders
app.get('/totalGrandTotal', async (req, res) => {
  try {
    const result = await prisma.order.aggregate({
      _sum: {
        grand_total: true
      },
      _count: {
        _all: true
      }
    });

    const totalSum = result._sum.grand_total;
    res.json({ total_sum: totalSum });
  } catch (error) {
    console.error(`Error getting total sum of grand_total: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

//Route for getting the total of all orders by month
app.get('/totalGrandTotalByMonth', async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    const totalByMonth = orders.reduce((acc, order) => {
      const month = format(parseISO(order.created_at), 'yyyy-MM');
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += order.grand_total;
      return acc;
    }, {});
    res.json({ total_by_month: totalByMonth });
  } catch (error) {
    console.error(`Error getting total by month: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
