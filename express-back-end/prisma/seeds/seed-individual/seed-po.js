const { PrismaClient } = require('@prisma/client')
// import purchaseOrder_data from '../hard-code_data/purchaseOrder_data'

const prisma = new PrismaClient()

const data =  [
  {
    user_id: 2,
    order_id: 81812,
    vendor_id: 1,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 8,
        vendor_product_id: 23086,
        quantity_purchased: 5,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 8,
        vendor_product_id: 22822,
        quantity_purchased: 3,
        vendor_cost: 0,
      },
    ],
  },
  {
    user_id: 3,
    order_id: 81848,
    vendor_id: 1,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 9,
        vendor_product_id: 18464,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
    ],
  },
  {
    user_id: 4,
    order_id: 81831,
    vendor_id: 1,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 10,
        vendor_product_id: 19841,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
    ],
  },
  {
    user_id: 2,
    order_id: 81845,
    vendor_id: 2,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 11,
        vendor_product_id: 14710,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
    ],
  },
  {
    user_id: 3,
    order_id: 81858,
    vendor_id: 2,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 12,
        vendor_product_id: 12790,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 12,
        vendor_product_id: 13109,
        quantity_purchased: 4,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 12,
        vendor_product_id: 7029,
        quantity_purchased: 5,
        vendor_cost: 0,
      },
    ],
  },
  {
    user_id: 4,
    order_id: 81850,
    vendor_id: 3,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 13,
        vendor_product_id: 4825,
        quantity_purchased: 6,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 13,
        vendor_product_id: 1190,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
    ],
  },
  {
    user_id: 3,
    order_id: 81946,
    vendor_id: 3,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 15,
        vendor_product_id: 3117,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 15,
        vendor_product_id: 5002,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 15,
        vendor_product_id: 1471,
        quantity_purchased: 3,
        vendor_cost: 0,
      },
      {
        purchase_order_id: 15,
        vendor_product_id: 1492,
        quantity_purchased: 1,
        vendor_cost: 0,
      },
    ],
  },
  {

    user_id: 2,
    order_id: 81943,
    vendor_id: 3,
    purchaseOrderLineItems: [
      {
        purchase_order_id: 14,
        vendor_product_id: 13222,
        quantity_purchased: 2,
        vendor_cost: 0,
      },
    ],
  },
];

async function main() {
  for (const purchaseOrderData of data) {
    const purchaseOrderLineItemsData = purchaseOrderData.purchaseOrderLineItems
    delete purchaseOrderData.purchaseOrderLineItems

    const purchaseOrder = await prisma.purchaseOrder.create({
      data: purchaseOrderData,
    })

    const purchaseOrderLineItems = purchaseOrderLineItemsData.map((lineItemData) => {
      return {
        ...lineItemData,
        purchase_order_id: purchaseOrder.id,
      }
    })

    await prisma.purchaseOrderLineItem.createMany({
      data: purchaseOrderLineItems,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



