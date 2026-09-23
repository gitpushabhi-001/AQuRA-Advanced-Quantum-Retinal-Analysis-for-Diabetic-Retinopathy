"""
AuraScan Medical Image Analysis - Hybrid Quantum XAI System
Backend Application Package
"""

import sys
from pathlib import Path

_CURRENT_FILE = Path(__file__).resolve()
_APP_DIR = _CURRENT_FILE.parent           # .../backend/app
_BACKEND_DIR = _APP_DIR.parent           # .../backend
_PARENT_DIR = _BACKEND_DIR.parent         # .../CLINICAL_CONSOLE

for _path in [str(_PARENT_DIR), str(_BACKEND_DIR), str(_APP_DIR)]:
    if _path not in sys.path:
        sys.path.insert(0, _path)

__version__ = "1.0.0"
