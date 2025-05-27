import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://paskyugoh:pasky1304@nodeexpressprojects.b9rcbql.mongodb.net/Tasky"
  );
  console.log("DB Connected");
};
