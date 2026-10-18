/**
 * Static mock data for the AutoMate screens. Everything is typed so screens can
 * be wired to a real API later without touching the components.
 */

export type Tint = "violet" | "pink" | "mint" | "amber" | "sky" | "danger";

export type Automation = {
  id: string;
  title: string;
  description: string;
  category: "Lead Generation" | "Sales" | "Support";
  tint: Tint;
};

export type Conversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
  lead?: boolean;
  tint: Tint;
};

export type ChatMessage = {
  id: string;
  from: "them" | "me";
  text: string;
  time: string;
  link?: { title: string; url: string; caption: string; tint: Tint };
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  note: string;
  time: string;
  status: "New" | "Qualified" | "Replied";
  tint: Tint;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "activity" | "system";
  tint: Tint;
};

export type FlowStep = {
  id: string;
  kind: "Trigger" | "Action" | "Condition";
  title: string;
  detail: string;
  tint: Tint;
};

export type Post = {
  id: string;
  title: string;
  tint: Tint;
  tag: string;
};

export const me = {
  name: "Piyush Kashyap",
  email: "piyush@betterwebstack.com",
  handle: "@piyush",
};

export const stats = [
  { label: "Conversations", value: "234", delta: "+18%", trend: "up" as const, tint: "pink" as Tint },
  { label: "New Leads", value: "56", delta: "+12%", trend: "up" as const, tint: "mint" as Tint },
  { label: "Active Automations", value: "4", delta: "Live", trend: "flat" as const, tint: "amber" as Tint },
  { label: "Response Rate", value: "98%", delta: "Auto", trend: "up" as const, tint: "sky" as Tint },
];

export const analyticsStats = [
  { label: "Conversations", value: "1,248", delta: "+12%", trend: "up" as const, tint: "pink" as Tint },
  { label: "New Leads", value: "320", delta: "+18%", trend: "up" as const, tint: "mint" as Tint },
  { label: "Response Rate", value: "98%", delta: "+5%", trend: "up" as const, tint: "sky" as Tint },
  { label: "Avg. Response Time", value: "2.4s", delta: "-32%", trend: "down" as const, tint: "amber" as Tint },
];

/** Conversations per day, in the shape the Analytics chart plots. */
export const conversationsOverTime = [
  { day: "Jan 1", value: 30 },
  { day: "Jan 2", value: 62 },
  { day: "Jan 3", value: 88 },
  { day: "Jan 4", value: 76 },
  { day: "Jan 5", value: 104 },
  { day: "Jan 6", value: 124 },
  { day: "Jan 7", value: 83 },
];

export const activity = [
  { id: "a1", title: "New lead from Instagram", body: '"GUIDE" comment', time: "2m ago", tint: "pink" as Tint },
  { id: "a2", title: "Auto DM sent to @_riya.s", body: "Guide delivered", time: "5m ago", tint: "violet" as Tint },
  { id: "a3", title: "Facebook message received", body: "New conversation", time: "12m ago", tint: "sky" as Tint },
];

export const automations: Automation[] = [
  {
    id: "send-guide",
    title: "Send Guide on Comment",
    description: "Send a DM when someone comments a keyword",
    category: "Lead Generation",
    tint: "violet",
  },
  {
    id: "welcome",
    title: "Welcome New Followers",
    description: "Send a welcome message to new followers",
    category: "Lead Generation",
    tint: "amber",
  },
  {
    id: "capture-leads",
    title: "Capture Leads",
    description: "Ask questions and collect details",
    category: "Sales",
    tint: "sky",
  },
  {
    id: "product-inquiry",
    title: "Product Inquiry",
    description: "Answer common questions",
    category: "Support",
    tint: "mint",
  },
];

export const conversations: Conversation[] = [
  { id: "priya", name: "Priya Sharma", preview: "Can you send me the guide?", time: "2m", unread: true, tint: "pink" },
  { id: "raj", name: "Raj Mehta", preview: "Thank! Got it.", time: "5m", unread: true, tint: "sky" },
  { id: "ananya", name: "Ananya Verma", preview: "Do you have a course?", time: "12m", lead: true, tint: "mint" },
  { id: "karan", name: "Karan Patel", preview: "Where can I buy this?", time: "18m", tint: "amber" },
  { id: "neha", name: "Neha Gupta", preview: "Is this still available?", time: "25m", unread: true, tint: "violet" },
  { id: "arjun", name: "Arjun Singh", preview: "Amazing content!", time: "1h", tint: "danger" },
  { id: "simran", name: "Simran Kaur", preview: "Can you share more details?", time: "1h", tint: "pink" },
];

export const chatWithPriya: ChatMessage[] = [
  { id: "m1", from: "them", text: "Hi! Can you send me the guide?", time: "9:40 AM" },
  {
    id: "m2",
    from: "me",
    text: "Hi Priya 👋\nThanks for commenting!\nHere's your free guide: https://yourlink.com/guide",
    time: "9:41 AM",
    link: {
      title: "The Complete Instagram Growth Guide",
      caption: "A step-by-step guide to grow your Instagram",
      url: "#",
      tint: "pink",
    },
  },
  { id: "m3", from: "them", text: "Thank you! 🙌", time: "9:42 AM" },
];

export const flowSteps: FlowStep[] = [
  {
    id: "f1",
    kind: "Trigger",
    title: "Comment on post",
    detail: "Keyword: GUIDE",
    tint: "pink",
  },
  { id: "f2", kind: "Action", title: "Send a DM", detail: "With guide link", tint: "sky" },
  { id: "f3", kind: "Condition", title: 'If user replies "YES"', detail: "Continue the flow", tint: "amber" },
  { id: "f4", kind: "Action", title: "Add to Leads", detail: "In your CRM", tint: "violet" },
];

export const posts: Post[] = [
  { id: "p1", title: "Instagram Growth Guide", tag: "Guide", tint: "violet" },
  { id: "p2", title: "Tips you need to know", tag: "Tips", tint: "pink" },
  { id: "p3", title: "3 Website Mistakes", tag: "Carousel", tint: "mint" },
  { id: "p4", title: "AI Tools for Creators", tag: "Reel", tint: "amber" },
];

export const leads: Lead[] = [
  { id: "l1", name: "Neha Gupta", email: "neha@gmail.com", note: 'Commented "GUIDE"', time: "2m ago", status: "New", tint: "pink" },
  { id: "l2", name: "Arjun Singh", email: "arjun@gmail.com", note: 'Replied "YES"', time: "12m ago", status: "Replied", tint: "sky" },
  { id: "l3", name: "Simran Kaur", email: "simran@gmail.com", note: "Requested a call", time: "25m ago", status: "Qualified", tint: "mint" },
  { id: "l4", name: "Karan Patel", email: "karan@gmail.com", note: "Asked about course", time: "1h ago", status: "New", tint: "amber" },
  { id: "l5", name: "Raj Mehta", email: "raj@gmail.com", note: "Downloaded guide", time: "2h ago", status: "Qualified", tint: "violet" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "New lead captured", body: "from Instagram comment", time: "2m ago", kind: "activity", tint: "pink" },
  { id: "n2", title: "Automation completed", body: '"Send Guide on Comment"', time: "10m ago", kind: "activity", tint: "mint" },
  { id: "n3", title: "Facebook message received", body: "New conversation", time: "25m ago", kind: "activity", tint: "sky" },
  { id: "n4", title: "Weekly report is ready", body: "View your automation stats", time: "1h ago", kind: "system", tint: "violet" },
  { id: "n5", title: "New follower", body: "@rahul.mehta started following", time: "2h ago", kind: "activity", tint: "amber" },
  { id: "n6", title: "Action failed", body: "Could not send message", time: "3h ago", kind: "system", tint: "danger" },
];

/** Tailwind classes per tint — keeps colour mapping in one place. */
export const tintClasses: Record<Tint, { soft: string; ink: string; dot: string }> = {
  violet: { soft: "bg-brand-soft", ink: "text-brand", dot: "bg-brand" },
  pink: { soft: "bg-pink-soft", ink: "text-pink", dot: "bg-pink" },
  mint: { soft: "bg-mint-soft", ink: "text-mint", dot: "bg-mint" },
  amber: { soft: "bg-amber-soft", ink: "text-amber-ink", dot: "bg-amber-ink" },
  sky: { soft: "bg-sky-soft", ink: "text-sky", dot: "bg-sky" },
  danger: { soft: "bg-danger-soft", ink: "text-danger", dot: "bg-danger" },
};
