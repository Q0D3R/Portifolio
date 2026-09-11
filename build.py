#!/usr/bin/env python3
"""
Python Build Script for Portfolio HTML Partials Generator.
Assembles template files from `templates/` using partials from `partials/`.
"""

import os
import re
import sys
import time
import argparse
from pathlib import Path

# Force UTF-8 stdout encoding for Windows console compatibility
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Base directory (workspace root)
BASE_DIR = Path(__file__).parent.resolve()
TEMPLATES_DIR = BASE_DIR / "templates"
PARTIALS_DIR = BASE_DIR / "partials"

# Regular expression to match <!-- include: partials/filepath.html key1="val1" key2="val2" -->
INCLUDE_RE = re.compile(
    r'<!--\s*include:\s*([^\s>]+)(?:\s+([^>]+))?\s*-->'
)

# Regular expression to parse key="value" parameters inside include directives
KV_RE = re.compile(r'(\w+)=(?:"([^"]*)"|\'([^\']*)\'|([^\s]+))')


def parse_params(params_str: str) -> dict:
    """Extract key-value pairs from parameter string."""
    if not params_str:
        return {}
    params = {}
    for match in KV_RE.finditer(params_str):
        key = match.group(1)
        val = match.group(2) or match.group(3) or match.group(4) or ""
        params[key] = val
    return params


def render_file(file_path: Path, context: dict = None, depth: int = 0) -> str:
    """
    Recursively renders an HTML template/partial file, replacing include directives
    and template variables {{ key }}.
    """
    if depth > 10:
        raise RuntimeError(f"Maximum include recursion depth exceeded at {file_path}")

    if not file_path.exists():
        raise FileNotFoundError(f"Included file not found: {file_path}")

    content = file_path.read_text(encoding="utf-8")

    # Replace local variables {{ key }} from context
    if context:
        for key, val in context.items():
            content = content.replace(f"{{{{{key}}}}}", str(val))
            content = content.replace(f"{{{{ {key} }}}}", str(val))

    def replace_include(match: re.Match) -> str:
        rel_include_path = match.group(1)
        params_str = match.group(2) or ""

        # Resolve include path relative to workspace base
        target_path = (BASE_DIR / rel_include_path).resolve()

        # Parse inline parameters (e.g. title="...")
        child_context = (context or {}).copy()
        child_context.update(parse_params(params_str))

        # Recursively render target included partial
        return render_file(target_path, child_context, depth + 1)

    # Process all include directives
    rendered = INCLUDE_RE.sub(replace_include, content)
    return rendered


def build_all():
    """Build all .template.html files in templates directory."""
    print("🔨 Building portfolio HTML files from partials...")
    if not TEMPLATES_DIR.exists():
        print(f"Error: Templates directory '{TEMPLATES_DIR}' does not exist.")
        sys.exit(1)

    templates = list(TEMPLATES_DIR.glob("*.template.html"))
    if not templates:
        print(f"No .template.html files found in {TEMPLATES_DIR}")
        return

    count = 0
    for tmpl in templates:
        # e.g., index.template.html -> index.html
        output_filename = tmpl.name.replace(".template.html", ".html")
        output_path = BASE_DIR / output_filename

        try:
            rendered_html = render_file(tmpl)
            output_path.write_text(rendered_html, encoding="utf-8")
            print(f"  ✓ Rendered {tmpl.relative_to(BASE_DIR)} -> {output_filename}")
            count += 1
        except Exception as e:
            print(f"  ❌ Error rendering {tmpl.name}: {e}")

    print(f"✨ Successfully compiled {count} file(s).\n")


def watch_mode():
    """Watch template and partial files for changes and re-build."""
    print("👀 Watching for changes in templates/ and partials/... (Press Ctrl+C to stop)")
    last_mtimes = {}

    def get_mtimes():
        mtimes = {}
        for folder in [TEMPLATES_DIR, PARTIALS_DIR]:
            if folder.exists():
                for root, _, files in os.walk(folder):
                    for f in files:
                        p = Path(root) / f
                        try:
                            mtimes[str(p)] = p.stat().st_mtime
                        except OSError:
                            pass
        return mtimes

    last_mtimes = get_mtimes()
    build_all()

    try:
        while True:
            time.sleep(1)
            current_mtimes = get_mtimes()
            if current_mtimes != last_mtimes:
                print("🔄 Change detected! Rebuilding...")
                last_mtimes = current_mtimes
                build_all()
    except KeyboardInterrupt:
        print("\nStopped watch mode.")


def main():
    parser = argparse.ArgumentParser(description="Portfolio Partial Template Compiler")
    parser.add_argument("--watch", "-w", action="store_true", help="Watch files and auto-rebuild")
    args = parser.parse_args()

    if args.watch:
        watch_mode()
    else:
        build_all()


if __name__ == "__main__":
    main()
