#!/usr/bin/env node
/**
 * Validates .github/flaky-tests-quarantine.json:
 * - Required fields per entry: id, scope, pattern, owner, reason, expires_on, mitigation
 * - expires_on must be YYYY-MM-DD and not in the past (UTC)
 *
 * Exit 1 on validation failure.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REGISTRY = path.join(ROOT, ".github", "flaky-tests-quarantine.json");

const REQUIRED = ["id", "scope", "pattern", "owner", "reason", "expires_on", "mitigation"];

function fail(msg) {
  console.error(`validate-flaky-quarantine: ${msg}`);
  process.exit(1);
}

function parseUtcDate(isoDate) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const t = Date.UTC(y, mo - 1, d);
  return Number.isNaN(t) ? null : t;
}

function main() {
  let raw;
  try {
    raw = fs.readFileSync(REGISTRY, "utf8");
  } catch (e) {
    fail(`cannot read ${REGISTRY}: ${e.message}`);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail(`invalid JSON: ${e.message}`);
  }

  if (data.version !== 1 && data.version !== undefined) {
    fail(`unsupported version: ${data.version}`);
  }

  const entries = data.entries;
  if (!Array.isArray(entries)) {
    fail('missing or invalid "entries" array');
  }

  const todayUtc = Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate(),
  );

  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const prefix = `entries[${i}]`;
    if (!e || typeof e !== "object") {
      fail(`${prefix}: must be an object`);
    }
    for (const key of REQUIRED) {
      if (e[key] == null || String(e[key]).trim() === "") {
        fail(`${prefix}: missing or empty "${key}"`);
      }
    }
    const exp = parseUtcDate(String(e.expires_on).trim());
    if (exp === null) {
      fail(`${prefix}: expires_on must be YYYY-MM-DD`);
    }
    if (exp < todayUtc) {
      fail(
        `${prefix}: expires_on ${e.expires_on} is in the past — fix or extend the quarantine`,
      );
    }
    const scopeOk = ["frontend", "backend", "contracts", "e2e", "other"].includes(e.scope);
    if (!scopeOk) {
      fail(
        `${prefix}: scope must be one of: frontend, backend, contracts, e2e, other`,
      );
    }
  }

  console.log(
    `validate-flaky-quarantine: OK (${entries.length} quarantine entr${entries.length === 1 ? "y" : "ies"})`,
  );
}

main();
