#!/bin/bash
set -e
unset ENV

prod="production"
stg="staging"

allowedEnv=("${stg}" "${prod}")
allowedYn=("y" "n")

# Variables for console color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

while getopts e:p:y flags; do
  case "${flags}" in
    e) ENV=${OPTARG,,};;
    y) NOPROMPT=1;;
    p) CRYPTPASS=${OPTARG};;
    *) echo -e "${RED}[ERROR]${NC} Unknown flag"
      exit 1;;
  esac
done

# Check if -e flag exists
if [ -z "$ENV" ]; then
  echo -e "${RED}[ERROR]${NC} -e flag required" >&2
  exit 1
fi

# check -e flag value
# shellcheck disable=SC2076
if [[ ! " ${allowedEnv[*],,} " =~ " ${ENV} " ]]; then
  echo -e "${RED}[ERROR]${NC} Invalid value for -e flag" >&2
  exit 1
fi

if [ "${ENV}" = "${stg}" ]; then
  # Check if -p flag exists
  if [ -z "$CRYPTPASS" ]; then
    read -srp $'Enter encryption key\n' CRYPTPASS
  fi

  domain='staging.raymonds.dev'
  repo='git@github.com:RaymondSalim/PersonalWebsite_Staging.git'
elif [ "${ENV}" = "${prod}" ]; then
  domain='raymonds.dev'
  repo='git@github.com:RaymondSalim/PersonalWebsite.git'
fi

echo -e "${YELLOW}Installing dependencies${NC}"
npm install --quiet > /dev/null

echo -e "${YELLOW}Print current dir${NC}"
pwd
ls -lah

echo -e "${YELLOW}Building files${NC}"
npm run build > /dev/null

echo -e "${YELLOW}Generating CNAME${NC}"
echo "${domain}" > ./build/CNAME

# Encrypt file if staging env
if [ "${ENV}" = "${stg}" ]; then
  echo -e "${YELLOW}Encrypting HTML page{NC}"
  npx staticrypt './build/index.html' "$CRYPTPASS" -o './build/index.html'
fi

echo -e "${GREEN}\nFile generated successfully${NC}"

if [[ "$NOPROMPT" -ne 1 ]]; then
  # Ensure input is only (y/n)
  # shellcheck disable=SC2076
  while [[ ! " ${allowedYn[*],,} " =~ " ${deployConf,,} " ]]; do
    read -r -p $'Proceed to deployment? (Y/n)\n' deployConf
  done
fi

if [ "n" = "${deployConf,,}" ]; then
  echo -e "${RED}Deployment aborted${NC}"
  exit 1
fi

echo -e "${YELLOW}Start deployment to env:${ENV}${NC}"
gh-pages -d build --repo="${repo}"
echo -e "${GREEN}Deployment successful${NC}"
exit 0