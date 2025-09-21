const commandAlias: Record<string, string> = {
  add: "add",
  a: "add",

  list: "list",
  l: "list",

  update: "update",
  u: "update",

  delete: "delete",
  del: "delete",

  "mark-in-progress": "mark-in-progress",
  mip: "mark-in-progress",

  "mark-done": "mark-done",
  md: "mark-done",
};

export function resolveCommand(input?: string): string | undefined {
  return input ? commandAlias[input] : undefined;
}