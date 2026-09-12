export interface SecurityIssue {
  severity: "critical" | "warning";
  category: "shell_exfiltration" | "prompt_injection" | "destructive_command";
  reason: string;
  matchedPattern: string;
}

export interface SecurityScanResult {
  passed: boolean;
  issues: SecurityIssue[];
}

interface SecurityRule {
  severity: "critical" | "warning";
  category: "shell_exfiltration" | "prompt_injection" | "destructive_command";
  pattern: RegExp;
  reason: string;
}

const SECURITY_RULES: SecurityRule[] = [
  {
    severity: "critical",
    category: "shell_exfiltration",
    pattern: /(?:curl|wget)\s+[^|;&\n]+\|\s*(?:sh|bash|zsh)/i,
    reason: "Unsafe remote script piped directly into shell execution (curl | bash)",
  },
  {
    severity: "critical",
    category: "shell_exfiltration",
    pattern: /cat\s+~?\/?(?:\.ssh\/id_|\.aws\/credentials|\.env)/i,
    reason: "Sensitive credential harvesting attempt targeting ssh keys, aws credentials, or .env secrets",
  },
  {
    severity: "critical",
    category: "destructive_command",
    pattern: /rm\s+-(?:rf|fr)\s+(?:\/|~|\$HOME|\.\.)(?:\s|$)/i,
    reason: "Destructive root/home directory deletion command",
  },
  {
    severity: "critical",
    category: "shell_exfiltration",
    pattern: /eval\s*\(\s*(?:await\s+)?fetch\(/i,
    reason: "Remote dynamic code evaluation via fetch",
  },
  {
    severity: "warning",
    category: "prompt_injection",
    pattern: /(?:ignore|disregard)\s+(?:all\s+)?(?:prior|previous)\s+instructions/i,
    reason: "Potential prompt injection jailbreak attempting to override system constraints",
  },
  {
    severity: "warning",
    category: "prompt_injection",
    pattern: /you\s+are\s+now\s+(?:dan|unrestricted|jailbroken)/i,
    reason: "Adversarial persona hijack attempting to bypass safety guardrails",
  },
];

/**
 * Deterministic static prompt security scanner that inspects prompt content
 * for credential harvesting, destructive commands, and adversarial jailbreak patterns.
 */
export function scanPromptSecurity(content: string): SecurityScanResult {
  if (!content) {
    return { passed: true, issues: [] };
  }

  const issues: SecurityIssue[] = [];

  for (const rule of SECURITY_RULES) {
    const match = content.match(rule.pattern);
    if (match) {
      issues.push({
        severity: rule.severity,
        category: rule.category,
        reason: rule.reason,
        matchedPattern: match[0],
      });
    }
  }

  const hasCritical = issues.some((i) => i.severity === "critical");

  return {
    passed: !hasCritical,
    issues,
  };
}
