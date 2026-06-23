export enum RuleType {
  BLOCK_TOOL = "BLOCK_TOOL",
  REQUIRE_APPROVAL = "REQUIRE_APPROVAL",
  PATH_RESTRICTION = "PATH_RESTRICTION",
  TOKEN_LIMIT = "TOKEN_LIMIT",
}

export interface Rule {
  id: string;
  type: RuleType;
  config: Record<string, unknown>;
  enabled: boolean;
}
