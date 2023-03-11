"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const products = [
  {
    name: "Oval roll labels",
    price: 0.09,
    image:
      "https://content.goldimageprinting.com/gallery/63/3a26190f-6c9d-4228-adcd-a2b4bd77829b.jpg",
    description:
      "Custom oval roll labels are a fast and easy way to brand your product. Apply to bottles, jars, boxes, packaging and more. Made from a durable material with a laminate that resists scratching, heat, water and sunlight.",
  },
  {
    name: "Clear roll labels",
    image:
      "https://d3ccuprjuqkp1j.cloudfront.net/ProductLandingPages/FeaturedImages/ClearPolyRollLabels_2_720x720_20200508153355_0.jpg",
    price: 0.05,
    description:
      "Custom clear labels are perfect for bottles, jars and product packaging. Our clear labels are made from a crystal clear, premium material that's resistant to food, oil, water & refrigeration.",
  },
  {
    name: "Circle labels",
    image:
      "https://storage.googleapis.com/sm-content/core/products/products/CRL/cover2x",
    price: 0.5,
    description:
      "Get multiple circle labels on a sheet to easily brand your products and packaging. Perfect for applying by hand, your sheet labels will be printed on a durable 8.5” x 11” material that stands up to food, oil, water and refrigeration.",
  },
  {
    name: "Rounded corner labels",
    image:
      "https://www.imprintitems.com/userfiles/files/asi-media/45634128.jpg",
    price: 0.07,
    description:
      "Custom rounded corner roll labels are a fast and easy way to brand your product. Apply to bottles, jars, boxes, packaging and more. Made from a durable material with a laminate that resists scratching, heat, water and sunlight.",
  },
  {
    name: "Die cut sheet labels",
    image:
      "https://staticecp.uprinting.com/5866/530x530/UP_Die_Cut_Label_Promotional_Material_Product_Image.jpg",
    price: 0.1,
    description:
      "Get multiple die cut labels on a sheet to easily brand your products and packaging. Perfect for applying by hand, your sheet labels will be printed on a durable 8.5” x 11” material that stands up to food, oil, water and refrigeration.",
  },
  {
    name: "Square label sheet",
    image:
      "https://b8a0cbeb1272df9990a4-6992e6a951f94c4e2e48d3930f87f0fd.ssl.cf1.rackcdn.com/square-labels-sheet-compressor.jpg",
    price: 0.07,
    description:
      "Get multiple square labels on a sheet to easily brand your products and packaging. Perfect for applying by hand, your sheet labels will be printed on a durable 8.5” x 11” material that stands up to food, oil, water and refrigeration.",
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody@gm.com",
      password: "123",
      firstName: "Cody",
      lastName: "DoGood",
    }),
    User.create({
      username: "murphy",
      email: "murphy@gm.com",
      password: "123",
      firstName: "Murphy",
      lastName: "Rascal",
    }),
    User.create({
      username: "Jerrol",
      email: "jerrol@gm.com",
      password: "123",
      firstName: "Jerrol",
      lastName: "DaCool",
      isAdmin: true,
    }),

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    ),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
