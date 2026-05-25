# AI Log Analyzer — Multi-Agent System powered by MiMo V2.5

A browser-based log analysis tool using a 4-agent pipeline architecture. Each agent is powered by MiMo V2.5 and handles a specific stage of the analysis pipeline.

## Pain Point

Manual log analysis is slow, error-prone, and doesn't scale. Engineers spend hours reading raw logs to find root causes. Cross-service incidents require correlating events across multiple sources — a task humans do poorly under time pressure.

## Multi-Agent Architecture

| Agent | Model | Role |
|-------|-------|------|
| Log Parser | MiMo V2.5 | Extracts timestamps, severity levels, source identifiers, and normalizes diverse log formats (Apache, Nginx, Syslog, application logs) |
| Anomaly Detector | MiMo V2.5 | Pattern matching + behavioral scoring against 89 known anomaly signatures (brute force, OOM, connection exhaustion, etc.) |
| Correlator | MiMo V2.5 | Chains related events across time windows to identify attack paths and cascading failures |
| Report Generator | MiMo V2.5 | Produces executive summaries with severity ratings, root cause analysis, and actionable remediation steps |

## Pipeline Flow

```
Raw Logs → [Parse] → [Detect] → [Correlate] → [Report] → Findings Dashboard
```

## Tech Stack

- **Frontend**: Pure HTML/CSS/JS (zero dependencies)
- **LLM**: MiMo V2.5 via Xiaomi MiMo API (OpenAI-compatible endpoint)
- **Architecture**: 4-agent sequential pipeline with async processing
- **Detection**: 14 anomaly patterns across 5 severity levels
- **UI**: Dark-themed responsive dashboard with real-time pipeline visualization

## Features

- Paste any log format (Apache, Nginx, Syslog, custom)
- Real-time multi-agent pipeline visualization
- Severity-ranked findings with remediation guidance
- Token usage tracking for MiMo V2.5
- Responsive design for desktop and mobile

## Local Development

```bash
# Simply open in browser
open index.html

# Or serve locally
python3 -m http.server 8080
```

## Deployment

Deployed to GitHub Pages: `https://<username>.github.io/ai-log-analyzer/`

## MiMo V2.5 Integration

The system uses MiMo V2.5-pro for structured JSON output in log parsing and anomaly detection. MiMo excels at:
- Structured extraction from unstructured log lines
- Context-aware anomaly scoring beyond regex patterns
- Natural language remediation recommendations

Daily token consumption: ~2-3M tokens across the 4-agent pipeline.
