import { adapter } from "./lucia";
import { Lucia, TimeSpan } from "lucia";

const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(2, 'w'),
});

export default lucia;