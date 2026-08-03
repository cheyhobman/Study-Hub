#!/usr/bin/env python3
"""
serve.py — tiny static server for the Study Hub, with caching disabled.

Why not just `python3 -m http.server`? Browsers aggressively cache ES modules,
so after you edit a content file you can be left staring at the old version.
This server sends no-cache headers so a normal refresh always shows your edits.

Run:   python3 serve.py          (defaults to port 8000)
       python3 serve.py 8080     (custom port)
Then open http://localhost:8000
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):  # quieter console
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Study Hub running → http://localhost:{port}  (Ctrl-C to stop)")
    ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler).serve_forever()
