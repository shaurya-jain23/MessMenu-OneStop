import AdminJS, {ComponentLoader} from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import mongoose from 'mongoose'
// import messMenuResource from './messMenu.resource.js'
import messMenuModel from './messMenuModel.js'
import * as AdminJSMongoose from '@adminjs/mongoose'
// import { Menu } from 'react-feather'
import multer from 'multer';  // For file uploads
import path from 'path'
import { createReadStream, unlinkSync } from 'fs';
import csvParser from 'csv-parser';


const upload = multer({ dest: 'uploads/' });

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const componentLoader = new ComponentLoader()

let absolute = path.resolve('./upload-csv.jsx')

const Components = {
  UploadCSV: componentLoader.add('UploadCSV', absolute)
}


const messMenuResource = {
  resource: messMenuModel,
  options: {
    actions: {
      uploadCSV: {
          actionType: 'resource',
          component: Components.UploadCSV,
          // isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles),
          handler: async (request, response, context) => {
            console.log(request);
            console.log(context);
            
              // if (request.method === 'post') {
              //     const file = request.payload.file;
              //     const results = [];

              //     createReadStream(file.path)
              //         .pipe(csvParser())
              //         .on('data', (data) => results.push(data))
              //         .on('end', async () => {
              //             try {
              //                 const hostelData = {};

              //                 results.forEach((row) => {
              //                     const { hostel, day, meal, mealDescription, startTiming, endTiming } = row;
              //                     if (!hostelData[hostel]) {
              //                         hostelData[hostel] = {};
              //                     }

              //                     if (!hostelData[hostel][day]) {
              //                         hostelData[hostel][day] = { breakfast: null, lunch: null, dinner: null };
              //                     }

              //                     const mealData = {
              //                         mealDescription,
              //                         startTiming: new Date(startTiming),
              //                         endTiming: new Date(endTiming),
              //                     };

              //                     hostelData[hostel][day][meal] = mealData;
              //                 });

              //                 for (const hostel in hostelData) {
              //                     const menu = hostelData[hostel];

              //                     // await findOneAndUpdate(
              //                     //     { hostel },
              //                     //     {
              //                     //         hostel,
              //                     //         monday: menu.monday,
              //                     //         tuesday: menu.tuesday,
              //                     //         wednesday: menu.wednesday,
              //                     //         thursday: menu.thursday,
              //                     //         friday: menu.friday,
              //                     //         saturday: menu.saturday,
              //                     //         sunday: menu.sunday,
              //                     //     },
              //                     //     { upsert: true, new: true }
              //                     // );
              //                 }

              //                 unlinkSync(file.path);

              //                 return {
              //                     notice: {
              //                         message: 'CSV uploaded and menu updated successfully!',
              //                         type: 'success',
              //                     },
              //                 };
              //             } catch (error) {
              //                 console.error(error);
              //                 return {
              //                     notice: {
              //                         message: 'Error processing CSV file!',
              //                         type: 'error',
              //                     },
              //                 };
              //             }
              //         });
              // }
              // return {
              //     notice: {
              //         message: 'Upload CSV file to update mess menu.',
              //         type: 'info',
              //     },
              // };
          },
      }
  }
  }
}


const PORT = 3003

const adminOptions = {
    resources:[
      messMenuResource
    ]
}

const start = async () => {
await mongoose.connect("mongodb+srv://icragee:icragee@check.hpvfwhb.mongodb.net/");
const app = express()

const admin = new AdminJS(adminOptions)

const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)

app.listen(PORT, () => {
console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
})
}

start()

