#!/bin/bash

source envfile

if [ -z "$CFN_ENV" ]; then
  echo "環境変数CFN_ENVが設定されていません" >&2
  exit 1
fi

TEMPLATE_NAME=cf-oai-s3

CFN_TEMPLATE=${TEMPLATE_NAME}.yml
CFN_STACK_NAME=${CFN_ENV}-${TEMPLATE_NAME}

# テンプレートの実行
aws cloudformation deploy --stack-name "${CFN_STACK_NAME}" --template-file "${CFN_TEMPLATE}" \
  --parameter-overrides \
  NameTagPrefix="${CFN_NameTagPrefix}" \
  ENV="${CFN_ENV}" \
  --capabilities CAPABILITY_NAMED_IAM

exit 0
