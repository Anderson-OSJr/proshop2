// DATA SEEDER Script
import dotenv from "dotenv";
import colors from "colors"; //mesmo não usando no código, tem que importar para funcionar no console.log
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //first delete all before introduce new data to the collection
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Planta os usuários
    const createdUsers = await User.insertMany(users);

    //prepara para que todos os products recebam um usuário admin (gambiarra inteligente)
    const adminUser = createdUsers[0]._id; // só deu certo porque já conhecemos o status admin do primeiro usuário
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Planta os produtos
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Faz sentido o código abaixo, quando se analisa os scripts (package.json) de criação e destruição de dados
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
