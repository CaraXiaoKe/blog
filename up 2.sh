#! /bin/env bash

ROOT_DIR=$(pwd)

SITE_DIR="$ROOT_DIR/site/"
DASH_DIR="$ROOT_DIR/dashboard/"


function site_update {
	echo "Updating official site..."
	cd $SITE_DIR && git pull origin master && npm run build
	echo "Done"
}

function dashboard_update {
	echo "Updating dashboard..."
	cd $DASH_DIR && git pull origin master && cd "$DASH_DIR/server/" && npm run startOrRestart && cd "$DASH_DIR/youwebms/" && npm run build
	echo "Done"
}

function permission_update {
	cd $ROOT_DIR && chown -R www:www .
}

case "$1" in
site)
	site_update
	permission_update
	;;
dashboard)
	dashboard_update
	permission_update
	;;
*)
	site_update
	dashboard_update
	permission_update
esac

