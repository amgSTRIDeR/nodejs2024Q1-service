export function isUuid(id: string): boolean {
  const uuidV4 = new RegExp(
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$',
  );
  return uuidV4.test(id);
}
