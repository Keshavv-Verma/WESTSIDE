import React from "react";
const columns = [
  {name: "NAME", uid: "userEmail"},
  {name: "ROLE", uid: "amount"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];
const k={
    "_id": {
      "$oid": "65de55e215840e0856a06041"
    },
    "userEmail": "a",
    "OrderId": "order_Ng3RYA7kDXZzj3",
    "products": [
      {
        "productId": "65b7f1ab995e10c4f1419024",
        "quantity": 1,
        "_id": {
          "$oid": "65de55e215840e0856a06042"
        }
      },
      {
        "productId": "65b7f1c9995e10c4f1419026",
        "quantity": 1,
        "_id": {
          "$oid": "65de55e215840e0856a06043"
        }
      }
    ],
    "address": "Front of Shubam Hospital,Nohar Road,Ellenabad",
    "amount": "233200",
    "status": "Cleared",
    "createdAt": {
      "$date": "2024-02-27T21:36:34.670Z"
    },
    "updatedAt": {
      "$date": "2024-02-27T21:36:34.670Z"
    },
    "__v": 0
  }
const users = [
  {
    id: 1,
    name: k.userEmail,
    role: "CEO",
    team: k.products[0].productId,
    status: k.status,
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: k.address,
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export {columns, users};
