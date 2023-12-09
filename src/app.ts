import express, {json, urlencoded} from "express";
import { UserRoutes, NoteRoutes } from "../build/routes";;

const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());

UserRoutes(app);
NoteRoutes(app);

export default app
