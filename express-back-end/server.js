const Express = require("express");
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
app.post("/api/orders/:id", async (req, res) => {
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

//* Routes for Vendor Products *\\

// Route for getting all vendor products
app.get("/api/vendor-products", async (req, res) => {
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
app.get("/api/vendor-products/:sku", async (req, res) => {
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

//* Routes for Purchase Orders *\\

// Route for getting all Purchase Orders
app.get("/api/purchase-orders", async (req, res) => {
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
app.get("/api/purchase-orders/:id", async (req, res) => {
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
app.post("/api/purchase-orders", async (req, res) => {
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
app.post("/api/purchase-orders/:id/update", async (req, res) => {
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


//* Routes for Vendors Info *\\
app.get("/api/vendors", async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
