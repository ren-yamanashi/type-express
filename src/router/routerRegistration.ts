import { IoCContainer } from "../iocContainer";
import { Router } from "./route";


IoCContainer.register<Router>("Router", new Router());
