#!/bin/bash
if pgrep -x httpd >/dev/null; then
    service httpd stop
fi

