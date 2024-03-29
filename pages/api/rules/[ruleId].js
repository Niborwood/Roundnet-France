import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import {
  getDocuments,
  patchDocument,
  deleteDocument,
  getDocument,
} from "../../../helpers/db";
import getSchema from "../../../helpers/schemas";
import { validateAPI } from "../../../helpers/form";
import storage from "../../../lib/init-firebase";
import { ref, deleteObject } from "firebase/storage";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const ruleId = req.query.ruleId;

    // If rule is authorized
    if (session) {
      // GET method to read specific app rule
      if (req.method === "GET") {
        try {
          const rule = await getDocuments("rules", ObjectId(ruleId));
          return res.status(200).json(rule);
        } catch (error) {
          console.error(error);
          return res.status(500).json(error);
        }
      }

      // PATCH method to update specific app rule
      if (req.method === "PATCH") {
        // * Validate partial data
        // try {
        //   // Get the rule schema and specificaly validate the partial data
        //   const keyToValidate = Object.keys(req.body)[0];
        //   const schema = getSchema('rule', keyToValidate);

        //   // Actual validation
        //   validateAPI({ data: req.body, schema });

        // } catch (error) {
        //   console.error('ERROR 400 - rules', error.message);
        //   return res.status(400).json({ message: error.message });
        // }

        try {
          const response = await patchDocument(
            "rules",
            { _id: ObjectId(ruleId) },
            req.body
          );
          return res.status(200).json(response);
        } catch (error) {
          console.error(error);
          return res.status(500).json(error);
        }
      }

      // DEL method to delete specific app rule
      if (req.method === "DELETE") {
        // Delete from storage
        let fileRef;
        try {
          const document = await getDocument(
            "rules",
            ObjectId(ruleId),
            { url: 1 },
            { _id: -1 }
          );
          fileRef = ref(storage, document.url);
          await deleteObject(fileRef);
        } catch (error) {
          console.error(error);
        }

        // Delete from mongoDB
        let rule;
        try {
          rule = await deleteDocument("rules", { _id: ObjectId(ruleId) });
          return res.status(200).json(rule);
        } catch (error) {
          console.error(error);
          return res.status(500).json(error);
        }
      }

      // If method is not supported
      return res.status(405).json({ error: "Method not allowed" });
    }

    // If rule is not authorized
    res.status(403).json({
      error: "You must be sign in to view the protected content on this page.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
