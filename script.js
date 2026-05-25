// MiMo V2.5 API Integration
// Supports direct API or 9Router proxy fallback

class MiMoClient {
    constructor(config = {}) {
        // Auto-detect: direct MiMo API or 9Router proxy
        if (config.apiKey) {
            this.baseUrl = 'https://api.xiaomimimo.com/v1';
            this.model = 'mimo-v2.5-pro';
            this.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            };
        } else if (config.routerKey) {
            this.baseUrl = 'http://localhost:1500/v1';
            this.model = 'xmtp/mimo-v2.5-pro';
            this.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.routerKey}`
            };
        } else {
            // Demo mode — no API calls
            this.demoMode = true;
        }
    }

    async analyze(logs, agentRole) {
        if (this.demoMode) {
            return { content: 'Demo mode — no API calls', agent: agentRole };
        }

        const systemPrompts = {
            parser: `You are a log parsing agent. Extract structured data from raw log lines. Output JSON: {timestamp, level, source, message, parsed_fields}. Be precise and handle multiple log formats.`,
            detector: `You are an anomaly detection agent. Analyze parsed log entries for security threats, performance issues, and system failures. Output JSON: {findings: [{severity, title, detail, remediation}]}. Score severity 0-100.`,
            correlator: `You are a correlation agent. Chain related log events into attack paths and incident timelines. Output JSON: {chains: [{name, events[], root_cause, impact}]}.\n\nFocus on: brute force → credential compromise, DB lag → service degradation → OOM cascade.`,
            reporter: `You are a report generator. Create executive summaries from analysis results. Output JSON: {summary, critical_count, warning_count, recommendations[], token_usage}. Be concise and actionable.`
        };

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompts[agentRole] || systemPrompts.parser },
                    { role: 'user', content: logs }
                ],
                temperature: 0.1,
                max_tokens: 2048
            })
        });

        const data = await response.json();
        return {
            content: data.choices?.[0]?.message?.content || '',
            agent: agentRole,
            tokens: data.usage?.total_tokens || 0
        };
    }
}

// Export for use in index.html
if (typeof module !== 'undefined') module.exports = { MiMoClient };
