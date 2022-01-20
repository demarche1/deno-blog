import { Validity, Rule, invalid } from "../deps.ts";
import { User } from "../Models/index.ts";

export function unique(column: string, queryValue: string): Rule {
  return async function uniqueRule(value: any): Promise<Validity> {
    if (typeof value !== "string" && typeof value !== "number") {
      return invalid("unique", { value, column, queryValue });
    }

    const data = await User.where(column, queryValue).first();
    if (data) {
      return invalid("unique", { value, column, queryValue });
    }
  };
}
