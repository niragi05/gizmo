import { Inngest } from "inngest";
import { sentryMiddleware } from "@inngest/middleware-sentry";

// Create a new Inngest client to send and receive events
export const inngest = new Inngest({ 
    id: 'gizmo',
    middleware: [sentryMiddleware()],
});