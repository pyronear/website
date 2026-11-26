"""Refresh data/github.json, the About page's activity grid: commits per day over the last 52 weeks on the default
branch of Pyronear's public repositories, bots left out. Needs the GitHub CLI (gh), signed in. Run: python3 scripts/github-activity.py"""

import datetime as dt
import json
import pathlib
import subprocess


def gh(path):
    out = subprocess.run(["gh", "api", "--paginate", path, "--jq", ".[]"], capture_output=True, text=True, check=True)
    return [json.loads(line) for line in out.stdout.splitlines() if line]


today = dt.date.today()
# 52 full weeks plus this one, starting on a Monday, like a calendar
start = today - dt.timedelta(days=today.weekday() + 52 * 7)
days = {start + dt.timedelta(d): 0 for d in range((today - start).days + 1)}
people, repos = set(), set()

for repo in gh("orgs/pyronear/repos?type=public&per_page=100"):
    if repo["fork"] or repo["archived"]:
        continue
    for c in gh(f"repos/pyronear/{repo['name']}/commits?since={start}T00:00:00Z&per_page=100"):
        login = (c.get("author") or {}).get("login") or c["commit"]["author"]["name"]
        if login.endswith("[bot]") or "bot" in login.lower().split("-"):
            continue
        day = dt.date.fromisoformat(c["commit"]["author"]["date"][:10])
        if day in days:
            days[day] += 1
            people.add(login)
            repos.add(repo["name"])

counts = list(days.values())
data = {
    "updated": today.isoformat(),
    "start": start.isoformat(),
    "commits": sum(counts),
    "contributors": len(people),
    "repos": len(repos),
    "days": counts,
}
pathlib.Path(__file__).parent.parent.joinpath("data/github.json").write_text(json.dumps(data) + "\n")
print({k: v for k, v in data.items() if k != "days"})
